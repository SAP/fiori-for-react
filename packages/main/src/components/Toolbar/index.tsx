import { createUseStyles } from 'react-jss';
import { useConsolidatedRef, useI18nBundle } from '@ui5/webcomponents-react-base/dist/hooks';
import { StyleClassHelper } from '@ui5/webcomponents-react-base/dist/StyleClassHelper';
import { usePassThroughHtmlProps } from '@ui5/webcomponents-react-base/dist/usePassThroughHtmlProps';
import { enrichEventWithDetails } from '@ui5/webcomponents-react-base/dist/Utils';
import { SHOW_MORE } from '@ui5/webcomponents-react/dist/assets/i18n/i18n-defaults';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { ToolbarDesign } from '@ui5/webcomponents-react/dist/ToolbarDesign';
import { ToolbarStyle } from '@ui5/webcomponents-react/dist/ToolbarStyle';
import React, {
  cloneElement,
  createRef,
  FC,
  forwardRef,
  ReactElement,
  ReactFragment,
  ReactNode,
  ReactNodeArray,
  Ref,
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { OverflowPopover } from './OverflowPopover';
import { styles } from './Toolbar.jss';

const useStyles = createUseStyles(styles, { name: 'Toolbar' });

export interface ToolbarPropTypes extends Omit<CommonProps, 'onClick'> {
  /**
   * Defines the content of the `Toolbar`.
   */
  children?: ReactNode | ReactNodeArray | ReactFragment;
  /**
   * Defines the visual style of the `Toolbar`.<br />
   * <b>Note:</b> The visual styles are theme-dependent.
   */
  toolbarStyle?: ToolbarStyle;
  /**
   * Defines the `Toolbar` design.<br />
   * <b>Note:</b> Design settings are theme-dependent.
   */
  design?: ToolbarDesign;
  /**
   * Indicates that the whole `Toolbar` is clickable. The Press event is fired only if `active` is set to true.
   */
  active?: boolean;
  /**
   * Fired when the user clicks on the `Toolbar`, if the `active` prop is set to "true".
   */
  onClick?: (event: CustomEvent) => void;
}

/**
 * Horizontal container most commonly used to display buttons, labels, selects and various other input controls.
 *
 * The content of the `Toolbar` moves into the overflow area from right to left when the available space is not enough in the visible area of the container.
 * It can be accessed by the user through the overflow button that opens it in a popover.
 */
const Toolbar: FC<ToolbarPropTypes> = forwardRef((props: ToolbarPropTypes, ref: Ref<HTMLDivElement>) => {
  const { children, toolbarStyle, design, active, style, tooltip, className, onClick, slot } = props;
  const classes = useStyles();
  const outerContainer: RefObject<HTMLDivElement> = useConsolidatedRef(ref);
  const controlMetaData = useRef([]);
  const [lastVisibleIndex, setLastVisibleIndex] = useState<number>(null);

  const passThroughProps = usePassThroughHtmlProps(props, ['onClick']);

  const i18nBundle = useI18nBundle('@ui5/webcomponents-react');

  const toolbarClasses = StyleClassHelper.of(classes.outerContainer);
  if (toolbarStyle === ToolbarStyle.Clear) {
    toolbarClasses.put(classes.clear);
  }
  if (active) {
    toolbarClasses.put(classes.active);
  }
  switch (design) {
    case ToolbarDesign.Solid:
      toolbarClasses.put(classes.solid);
      break;
    case ToolbarDesign.Transparent:
      toolbarClasses.put(classes.transparent);
      break;
    case ToolbarDesign.Info:
      toolbarClasses.put(classes.info);
      break;
    default:
      break;
  }
  toolbarClasses.putIfPresent(className);

  const childrenWithRef = useMemo(() => {
    controlMetaData.current = [];

    const refactoredChildren = React.Children.toArray(children).map((child, index) => {
      if ((child as ReactElement).type === React.Fragment) {
        return (child as ReactElement).props.children.filter(Boolean).map((item, itemIndex: number) => {
          return cloneElement(item, { key: `.${index}:${itemIndex}` });
        });
      }
      return child;
    });

    return refactoredChildren.flat().map((item: ReactElement, index) => {
      const itemRef: RefObject<HTMLDivElement> = createRef();

      controlMetaData.current.push({
        ref: itemRef
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if ((item?.type as any)?.displayName === 'ToolbarSpacer') {
        return item;
      }
      return (
        <div ref={itemRef} key={index}>
          {item}
        </div>
      );
    });
  }, [children, controlMetaData]);

  const overflowNeeded =
    (lastVisibleIndex || lastVisibleIndex === 0) && React.Children.count(childrenWithRef) !== lastVisibleIndex + 1;

  toolbarClasses.putIfPresent(overflowNeeded && classes.hasOverflow);

  const calculateVisibleItems = useCallback(() => {
    const OVERFLOW_BUTTON_WIDTH = 32 + 8;
    requestAnimationFrame(() => {
      if (!outerContainer.current) return;
      const availableWidth = outerContainer.current.getBoundingClientRect().width;
      let consumedWidth = 0;
      let lastIndex = null;
      let lastFitWidth = 0;

      if (availableWidth - OVERFLOW_BUTTON_WIDTH <= 0) {
        lastIndex = -1;
        lastFitWidth = 0;
      } else {
        controlMetaData.current.forEach((item, index) => {
          const currentMeta = controlMetaData.current[index] as { ref: RefObject<HTMLElement> };
          if (currentMeta && currentMeta.ref && currentMeta.ref.current) {
            let nextWidth = currentMeta.ref.current.getBoundingClientRect().width;
            nextWidth += index === 0 || index === controlMetaData.current.length - 1 ? 4 : 8; // first & last element = padding: 4px
            if (index === controlMetaData.current.length - 1) {
              if (consumedWidth + nextWidth <= availableWidth - 8) {
                lastIndex = index;
                lastFitWidth = consumedWidth + nextWidth;
              }
            } else {
              if (consumedWidth + nextWidth <= availableWidth - OVERFLOW_BUTTON_WIDTH) {
                lastIndex = index;
                lastFitWidth = consumedWidth + nextWidth;
              }
              if (
                consumedWidth < availableWidth - OVERFLOW_BUTTON_WIDTH &&
                consumedWidth + nextWidth >= availableWidth - OVERFLOW_BUTTON_WIDTH
              ) {
                lastIndex = index - 1;
                lastFitWidth = 0;
              }
            }
            consumedWidth += nextWidth;
          }
        });
      }
      setLastVisibleIndex(lastIndex);
    });
  }, [outerContainer.current, controlMetaData.current, setLastVisibleIndex, childrenWithRef, overflowNeeded]);

  const observer = useRef(new ResizeObserver(calculateVisibleItems));

  useEffect(() => {
    if (outerContainer.current) {
      observer.current.observe(outerContainer.current);
    }
    return () => {
      observer.current.disconnect();
    };
  }, [outerContainer.current]);

  useLayoutEffect(() => {
    calculateVisibleItems();
  }, [calculateVisibleItems]);

  const handleToolbarClick = useCallback(
    (e) => {
      if (active && typeof onClick === 'function') {
        onClick(enrichEventWithDetails(e));
      }
    },
    [onClick, active]
  );

  return (
    <div
      title={tooltip}
      style={style}
      className={toolbarClasses.className}
      ref={outerContainer}
      slot={slot}
      onClick={handleToolbarClick}
      {...passThroughProps}
    >
      <div className={classes.toolbar}>
        {overflowNeeded &&
          React.Children.map(childrenWithRef, (item, index) => {
            if (index >= lastVisibleIndex + 1) {
              return React.cloneElement(item as ReactElement, { style: { visibility: 'hidden' } });
            }
            return item;
          })}
        {!overflowNeeded && childrenWithRef}
      </div>
      {overflowNeeded && (
        <div className={classes.overflowButtonContainer} title={i18nBundle.getText(SHOW_MORE)}>
          <OverflowPopover lastVisibleIndex={lastVisibleIndex} contentClass={classes.popoverContent}>
            {React.Children.toArray(children).map((child) => {
              if ((child as ReactElement).type === React.Fragment) {
                return (child as ReactElement).props.children;
              }
              return child;
            })}
          </OverflowPopover>
        </div>
      )}
    </div>
  );
});

Toolbar.defaultProps = {
  toolbarStyle: ToolbarStyle.Standard,
  design: ToolbarDesign.Auto,
  active: false
};

Toolbar.displayName = 'Toolbar';
export { Toolbar };
