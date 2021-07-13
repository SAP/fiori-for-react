import { enrichEventWithDetails } from '@ui5/webcomponents-react-base/dist/Utils';
import { isIE } from '@ui5/webcomponents-react-base/dist/Device';
import { useConsolidatedRef, usePassThroughHtmlProps } from '@ui5/webcomponents-react-base/dist/hooks';
import { StyleClassHelper } from '@ui5/webcomponents-react-base/dist/StyleClassHelper';
import { ThemingParameters } from '@ui5/webcomponents-react-base/dist/ThemingParameters';
import { FlexBox } from '@ui5/webcomponents-react/dist/FlexBox';
import { GlobalStyleClasses } from '@ui5/webcomponents-react/dist/GlobalStyleClasses';
import { PageBackgroundDesign } from '@ui5/webcomponents-react/dist/PageBackgroundDesign';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import React, {
  cloneElement,
  FC,
  forwardRef,
  ReactElement,
  ReactNode,
  ReactNodeArray,
  Ref,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { createUseStyles } from 'react-jss';
import { useResponsiveContentPadding } from '../../internal/useResponsiveContentPadding';
import { DynamicPageAnchorBar } from '../DynamicPageAnchorBar';
import { useObserveHeights } from '../../internal/useObserveHeights';
import { styles } from './DynamicPage.jss';

export interface DynamicPageProps extends Omit<CommonProps, 'title'> {
  /**
   * Determines the background color of DynamicPage.
   */
  backgroundDesign?: PageBackgroundDesign;
  /**
   * Determines whether the `headerContent` is shown.
   */
  alwaysShowContentHeader?: boolean;
  /**
   * Determines whether the expand/collapse `headerContent` button is shown.
   */
  showHideHeaderButton?: boolean;
  /**
   * Determines whether the pin button is shown.
   */
  headerContentPinnable?: boolean;
  /**
   * Defines the the upper, always static, title section of the `DynamicPage`.
   *
   * __Note:__ Although this prop accepts all HTML Elements, it is strongly recommended that you only use `DynamicPageTitle` in order to preserve the intended design.
   */
  headerTitle?: ReactElement;
  /**
   * Defines the dynamic header section of the `DynamicPage`.
   *
   * __Note:__ Although this prop accepts all HTML Elements, it is strongly recommended that you only use `DynamicPageHeader` in order to preserve the intended design.
   */
  headerContent?: ReactElement;
  /**
   * React element which defines the footer content.
   *
   * __Note:__ Although this prop accepts all HTML Elements, it is strongly recommended that you only use `Bar` with `design={BarDesign.FloatingFooter}` in order to preserve the intended design.
   */
  footer?: ReactElement;
  /**
   * React element or node array which defines the content.
   */
  children?: ReactNode | ReactNodeArray;
}

/**
 * Defines the current state of the component.
 */
enum HEADER_STATES {
  AUTO = 'AUTO',
  VISIBLE_PINNED = 'VISIBLE_PINNED',
  HIDDEN_PINNED = 'HIDDEN_PINNED',
  VISIBLE = 'VISIBLE',
  HIDDEN = 'HIDDEN'
}

const useStyles = createUseStyles(styles, { name: 'DynamicPage' });
/**
 * The dynamic page is a generic layout control designed to support various floorplans and use cases.
 * The content of both the header and the page can differ from floorplan to floorplan.
 *
 * The header of the dynamic page is collapsible, which helps users to focus on the actual page content, but still ensures that important header information
 * and actions are readily available.
 */
const DynamicPage: FC<DynamicPageProps> = forwardRef((props: DynamicPageProps, ref: Ref<HTMLDivElement>) => {
  const {
    headerTitle,
    headerContent,
    tooltip,
    style,
    backgroundDesign,
    showHideHeaderButton,
    headerContentPinnable,
    alwaysShowContentHeader,
    children,
    className,
    footer
  } = props;
  const passThroughProps = usePassThroughHtmlProps(props, ['onScroll']);

  const classes = useStyles();
  const dynamicPageClasses = StyleClassHelper.of(classes.dynamicPage, GlobalStyleClasses.sapScrollBar);
  dynamicPageClasses.put(classes[`background${backgroundDesign}`]);
  dynamicPageClasses.putIfPresent(className);

  const anchorBarRef: RefObject<HTMLDivElement> = useRef();
  const dynamicPageRef: RefObject<HTMLDivElement> = useConsolidatedRef(ref);
  //@ts-ignore
  const topHeaderRef: RefObject<HTMLDivElement> = useConsolidatedRef(headerTitle?.ref);
  //@ts-ignore
  const headerContentRef: RefObject<HTMLDivElement> = useConsolidatedRef(headerContent?.ref);

  const [headerState, setHeaderState] = useState<HEADER_STATES>(
    alwaysShowContentHeader ? HEADER_STATES.VISIBLE_PINNED : isIE() ? HEADER_STATES.VISIBLE : HEADER_STATES.AUTO
  );

  // observe heights of header parts
  const { topHeaderHeight, headerContentHeight } = useObserveHeights(
    dynamicPageRef,
    topHeaderRef,
    headerContentRef,
    anchorBarRef,
    { noHeader: false }
  );

  if (headerState === HEADER_STATES.HIDDEN || headerState === HEADER_STATES.HIDDEN_PINNED) {
    dynamicPageClasses.put(classes.headerCollapsed);
  }

  useEffect(() => {
    const oneTimeScrollHandler = () => {
      if (!isIE()) {
        setHeaderState(HEADER_STATES.AUTO);
      }
    };
    if (headerState === HEADER_STATES.VISIBLE || headerState === HEADER_STATES.HIDDEN) {
      dynamicPageRef.current?.addEventListener('scroll', oneTimeScrollHandler, { once: true });
    }
    return () => {
      dynamicPageRef.current?.removeEventListener('scroll', oneTimeScrollHandler);
    };
  }, [dynamicPageRef, headerState]);

  const onToggleHeaderContentVisibility = useCallback(
    (e) => {
      const shouldHideHeader = !e.detail.visible;
      setHeaderState((oldState) => {
        if (oldState === HEADER_STATES.VISIBLE_PINNED || oldState === HEADER_STATES.HIDDEN_PINNED) {
          return shouldHideHeader ? HEADER_STATES.HIDDEN_PINNED : HEADER_STATES.VISIBLE_PINNED;
        }
        return shouldHideHeader ? HEADER_STATES.HIDDEN : HEADER_STATES.VISIBLE;
      });
    },
    [setHeaderState]
  );

  const onHoverToggleButton = useCallback(
    (e) => {
      // TODO background color should be sapObjectHeader_Hover_Background (same color as sapTile_Active_Background)
      topHeaderRef.current.style.backgroundColor =
        e?.type === 'mouseover' ? ThemingParameters.sapTile_Active_Background : null;
    },
    [topHeaderRef]
  );

  const onToggleHeaderContent = useCallback(
    (e) => {
      onToggleHeaderContentVisibility(enrichEventWithDetails(e, { visible: !headerContentHeight }));
    },
    [headerContentHeight]
  );

  const handleHeaderPinnedChange = useCallback(
    (headerWillPin) => {
      if (headerWillPin) {
        setHeaderState(HEADER_STATES.VISIBLE_PINNED);
      } else {
        setHeaderState(HEADER_STATES.VISIBLE);
      }
    },
    [setHeaderState]
  );

  useEffect(() => {
    if (alwaysShowContentHeader) {
      setHeaderState(HEADER_STATES.VISIBLE_PINNED);
    } else if (!isIE()) {
      setHeaderState(HEADER_STATES.AUTO);
    }
  }, [alwaysShowContentHeader, setHeaderState]);

  const anchorBarClasses = StyleClassHelper.of(classes.anchorBar);
  if (isIE()) {
    anchorBarClasses.put(classes.iEClass);
  }
  const responsivePaddingClass = useResponsiveContentPadding(dynamicPageRef.current);

  const onDynamicPageScroll = useCallback(
    (e) => {
      if (typeof props?.onScroll === 'function') {
        props.onScroll(e);
      }
      if (headerState === HEADER_STATES.HIDDEN_PINNED && e.target.scrollTop === 0) {
        setHeaderState(HEADER_STATES.VISIBLE_PINNED);
      }
    },
    [props?.onScroll, headerState]
  );

  return (
    <div
      ref={dynamicPageRef}
      title={tooltip}
      className={dynamicPageClasses.toString()}
      style={style}
      onScroll={onDynamicPageScroll}
      {...passThroughProps}
    >
      {headerTitle &&
        cloneElement(headerTitle, {
          'data-not-clickable':
            alwaysShowContentHeader || !headerContent || (!showHideHeaderButton && !headerContentPinnable),
          ref: topHeaderRef,
          className: headerTitle?.props?.className
            ? `${responsivePaddingClass} ${headerTitle.props.className}`
            : responsivePaddingClass,
          onToggleHeaderContentVisibility: onToggleHeaderContent
        })}
      {headerContent &&
        cloneElement(headerContent, {
          ref: headerContentRef,
          className: headerContent.props.className
            ? `${responsivePaddingClass} ${headerContent.props.className}`
            : responsivePaddingClass,
          headerPinned: headerState === HEADER_STATES.VISIBLE_PINNED || headerState === HEADER_STATES.VISIBLE,
          topHeaderHeight
        })}
      <FlexBox
        data-component-name="DynamicPageAnchorBar"
        className={anchorBarClasses.className}
        ref={anchorBarRef}
        style={{
          top:
            headerState === HEADER_STATES.VISIBLE_PINNED || headerState === HEADER_STATES.VISIBLE
              ? (headerContentRef?.current?.offsetHeight ?? 0) + topHeaderHeight
              : topHeaderHeight
        }}
      >
        <DynamicPageAnchorBar
          headerContentPinnable={headerContentPinnable}
          showHideHeaderButton={showHideHeaderButton}
          headerContentVisible={!!headerContentHeight}
          onToggleHeaderContentVisibility={onToggleHeaderContentVisibility}
          setHeaderPinned={handleHeaderPinnedChange}
          headerPinned={headerState === HEADER_STATES.VISIBLE_PINNED || headerState === HEADER_STATES.HIDDEN_PINNED}
          onHoverToggleButton={onHoverToggleButton}
        />
      </FlexBox>
      {isIE() && (
        <div
          className={classes.iEBackgroundElement}
          style={{
            height: `${headerContentHeight + topHeaderHeight}px`,
            width: `calc(100% - ${
              dynamicPageRef?.current?.clientHeight < dynamicPageRef?.current?.scrollHeight ? '18px' : '0px'
            })`
          }}
        />
      )}
      <div
        data-component-name="DynamicPageContent"
        className={`${classes.contentContainer} ${responsivePaddingClass}`}
        style={{
          marginTop: isIE() ? `${headerContentHeight + topHeaderHeight + 34}px` : 0,
          paddingBottom: footer ? '1rem' : 0
        }}
      >
        {children}
      </div>
      {footer && (
        <footer className={classes.footer} data-component-name="DynamicPageFooter">
          {footer}
        </footer>
      )}
    </div>
  );
});

DynamicPage.displayName = 'DynamicPage';

DynamicPage.defaultProps = {
  backgroundDesign: PageBackgroundDesign.Standard,
  showHideHeaderButton: true,
  headerContentPinnable: true,
  alwaysShowContentHeader: false
};

export { DynamicPage };
