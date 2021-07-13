import { ThemingParameters } from '@ui5/webcomponents-react-base/dist/ThemingParameters';

export const DynamicPageCssVariables = {
  headerDisplay: '--ui5wcr_DynamicPage_header_display'
};

export const styles = {
  dynamicPage: {
    width: '100%',
    height: '100%',
    maxHeight: '100%',
    position: 'relative',
    whiteSpace: 'normal',
    fontFamily: ThemingParameters.sapFontFamily,
    backgroundColor: ThemingParameters.sapBackgroundColor,
    overflowX: 'hidden',
    overflowY: 'auto',
    [DynamicPageCssVariables.headerDisplay]: 'block'
  },
  headerCollapsed: {
    [DynamicPageCssVariables.headerDisplay]: 'none',
    '& $anchorBar > section[role="navigation"]': {
      top: '-0.025rem'
    }
  },
  anchorBar: {
    position: 'sticky',
    boxShadow: ThemingParameters.sapContent_HeaderShadow,
    height: '1px',
    zIndex: 2,
    '& > section[role="navigation"]': {
      top: 0
    }
  },
  iEClass: {
    position: 'fixed',
    //page width - scrollbar
    width: 'calc(100% - 18px)'
  },
  iEBackgroundElement: {
    position: 'fixed',
    backgroundColor: ThemingParameters.sapObjectHeader_Background
  },
  contentContainer: {
    paddingTop: '1rem',
    boxSizing: 'border-box',
    width: '100%',
    height: 'auto',
    fontFamily: ThemingParameters.sapFontFamily,
    zIndex: 0
  },
  backgroundStandard: {
    background: ThemingParameters.sapBackgroundColor
  },
  backgroundSolid: {
    background: ThemingParameters.sapBackgroundColor
  },
  backgroundList: {
    background: ThemingParameters.sapGroup_ContentBackground
  },
  backgroundTransparent: {
    background: 'transparent'
  },
  footer: {
    position: 'sticky',
    bottom: '0.5rem',
    margin: '0 0.5rem'
  }
};
