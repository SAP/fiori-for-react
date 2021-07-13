import { addCustomCSS } from '@ui5/webcomponents-base/dist/Theming';
import '@ui5/webcomponents-icons/dist/slim-arrow-down.js';
import '@ui5/webcomponents-icons/dist/slim-arrow-up.js';
import { StyleClassHelper } from '@ui5/webcomponents-react-base/dist/StyleClassHelper';
import { enrichEventWithDetails } from '@ui5/webcomponents-react-base/dist/Utils';
import { useConsolidatedRef, useI18nBundle, useIsRTL } from '@ui5/webcomponents-react-base/dist/hooks';
import { ThemingParameters } from '@ui5/webcomponents-react-base/dist/ThemingParameters';
import {
  COLLAPSE_HEADER,
  EXPAND_HEADER,
  PIN_HEADER,
  UNPIN_HEADER
} from '@ui5/webcomponents-react/dist/assets/i18n/i18n-defaults';
import { Button } from '@ui5/webcomponents-react/dist/Button';
import { ToggleButton } from '@ui5/webcomponents-react/dist/ToggleButton';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import React, { forwardRef, RefObject, useCallback } from 'react';
import { createUseStyles } from 'react-jss';

addCustomCSS(
  'ui5-button',
  `
  :host([data-ui5wcr-dynamic-page-header-action]){
    width: 1.375rem;
    height: 1.375rem;
    min-width: 1.375rem;
  }
  :host([data-ui5wcr-dynamic-page-header-action]) .ui5-button-root {
    padding: 0;
  }`
);
addCustomCSS(
  'ui5-togglebutton',
  `
    :host([data-ui5wcr-dynamic-page-header-action]){
    width: 1.375rem;
    height: 1.375rem;
    min-width: 1.375rem;
  }
  :host([data-ui5wcr-dynamic-page-header-action]) .ui5-button-root {
    padding: 0;
  }`
);

const anchorBarStyles = {
  anchorBarActionButton: {
    position: 'absolute',
    top: `-0.6875rem`,
    marginLeft: `-0.6875rem`,
    left: '50%',
    zIndex: 3,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      width: '4rem',
      top: '50%',
      height: '0.0625rem'
    },
    '&:before': {
      right: '100%',
      backgroundImage: `linear-gradient(to left, ${ThemingParameters.sapHighlightColor}, rgba(8,84,160,0))`
    },
    '&:after': {
      backgroundImage: `linear-gradient(to right, ${ThemingParameters.sapHighlightColor}, rgba(8,84,160,0))`,
      left: '100%'
    }
  },
  anchorBarActionButtonRtl: {
    marginRight: `-0.6875rem`,
    marginLeft: 0
  },
  anchorBarActionButtonExpandable: {},
  anchorBarActionButtonPinnable: {},
  anchorBarActionPinnableAndExpandable: {
    '&$anchorBarActionButtonPinnable': {
      marginLeft: '0.25rem',
      '&:before': {
        backgroundColor: 'white'
      }
    },
    '&$anchorBarActionButtonExpandable': {
      marginLeft: '-1.75rem'
    }
  },
  anchorBarActionPinnableAndExpandableRtl: {
    '&$anchorBarActionButtonPinnable': {
      marginRight: '0.25rem',
      '&:before': {
        backgroundColor: 'white'
      }
    },
    '&$anchorBarActionButtonExpandable': {
      marginRight: '-1.75rem'
    }
  }
};

const useStyles = createUseStyles(anchorBarStyles, { name: 'DynamicPageAnchorBar' });

interface Props extends CommonProps {
  /**
   * Determines if the header content is visible.
   */
  headerContentVisible: boolean;
  /**
   * Determines if the header content is pinnable .
   */
  headerContentPinnable: boolean;
  /**
   * Determines if the hide header button is shown .
   */
  showHideHeaderButton: boolean;
  /**
   * Determines if the header is initially pinned .
   */
  headerPinned?: boolean;
  /**
   * Set the header to the state pinned.
   */
  setHeaderPinned?: (payload: any) => void;
  /**
   * Toggles the header content to be hidden or visible .
   */
  onToggleHeaderContentVisibility: (e: any) => void;
  /**
   * Highlight title when hovered.
   */
  onHoverToggleButton?: (e: any) => void;
}

/**
 * The dynamic page anchor bar contains the expand/collapse (expands or collapses the header content)
 * and pin button (pins the content header).
 */
const DynamicPageAnchorBar = forwardRef((props: Props, ref: RefObject<HTMLElement>) => {
  const {
    showHideHeaderButton,
    headerContentVisible,
    headerContentPinnable,
    headerPinned,
    setHeaderPinned,
    onToggleHeaderContentVisibility,
    onHoverToggleButton,
    style
  } = props;

  const classes = useStyles();
  const anchorBarRef = useConsolidatedRef<HTMLDivElement>(ref);
  const isRTL = useIsRTL(anchorBarRef);

  const shouldRenderHeaderPinnableButton = headerContentPinnable && headerContentVisible;
  const showBothActions = shouldRenderHeaderPinnableButton && showHideHeaderButton;

  const onPinHeader = useCallback(
    (e) => {
      setHeaderPinned(e.target.pressed);
    },
    [setHeaderPinned]
  );

  const anchorBarActionButtonClasses = StyleClassHelper.of(classes.anchorBarActionButton);
  if (isRTL) {
    anchorBarActionButtonClasses.put(classes.anchorBarActionButtonRtl);
  }

  const bothActionClasses = StyleClassHelper.of(classes.anchorBarActionPinnableAndExpandable);
  if (isRTL) {
    bothActionClasses.put(classes.anchorBarActionPinnableAndExpandableRtl);
  }

  const onToggleHeaderButtonClick = (e) => {
    onToggleHeaderContentVisibility(enrichEventWithDetails(e, { visible: !headerContentVisible }));
  };
  const i18nBundle = useI18nBundle('@ui5/webcomponents-react');
  return (
    <section
      style={style}
      role="navigation"
      className={showHideHeaderButton || headerContentPinnable ? classes.anchorBarActionButton : null}
      ref={anchorBarRef}
    >
      {showHideHeaderButton && (
        <Button
          icon={!headerContentVisible ? 'slim-arrow-down' : 'slim-arrow-up'}
          data-ui5wcr-dynamic-page-header-action=""
          className={`${anchorBarActionButtonClasses.className} ${classes.anchorBarActionButtonExpandable} ${
            showBothActions ? bothActionClasses.className : ''
          }`}
          onClick={onToggleHeaderButtonClick}
          onMouseOver={onHoverToggleButton}
          onMouseLeave={onHoverToggleButton}
          tooltip={i18nBundle.getText(!headerContentVisible ? EXPAND_HEADER : COLLAPSE_HEADER)}
          aria-label={i18nBundle.getText(!headerContentVisible ? EXPAND_HEADER : COLLAPSE_HEADER)}
        />
      )}
      {shouldRenderHeaderPinnableButton && (
        <ToggleButton
          icon="pushpin-off"
          data-ui5wcr-dynamic-page-header-action=""
          className={`${anchorBarActionButtonClasses.className} ${classes.anchorBarActionButtonPinnable} ${
            showBothActions ? bothActionClasses.className : ''
          }`}
          pressed={headerPinned}
          onClick={onPinHeader}
          tooltip={i18nBundle.getText(headerPinned ? UNPIN_HEADER : PIN_HEADER)}
          aria-label={i18nBundle.getText(headerPinned ? UNPIN_HEADER : PIN_HEADER)}
        />
      )}
    </section>
  );
});

DynamicPageAnchorBar.displayName = 'DynamicPageAnchorBar';

export { DynamicPageAnchorBar };
