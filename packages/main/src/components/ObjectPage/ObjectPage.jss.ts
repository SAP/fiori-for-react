import { ThemingParameters } from '@ui5/webcomponents-react-base/dist/ThemingParameters';
import { DynamicPageCssVariables } from '../DynamicPage/DynamicPage.jss';

export const ObjectPageCssVariables = {
  anchorFloat: '--_ui5wcr_ObjectPage_actions_float',
  anchorLeft: '--_ui5wcr_ObjectPage_actions_left',
  anchorRight: '--_ui5wcr_ObjectPage_actions_right',
  lastSectionMargin: '--_ui5wcr_ObjectPage_last_section_margin_bottom'
};

export const styles = {
  objectPage: {
    [DynamicPageCssVariables.headerDisplay]: 'block',
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    maxHeight: '100vh',
    position: 'relative',
    whiteSpace: 'normal',
    fontFamily: ThemingParameters.sapFontFamily,
    backgroundColor: ThemingParameters.sapBackgroundColor,
    overflowX: 'hidden',
    overflowY: 'auto',
    [ObjectPageCssVariables.lastSectionMargin]: 0,
    '& section[id*="ObjectPageSection-"] > div[role="heading"]': {
      display: 'none'
    },
    // explanation why first-child selector is not sufficient here:
    // https://stackoverflow.com/questions/7128406/css-select-the-first-child-from-elements-with-particular-attribute
    '& section[id*="ObjectPageSection-"] ~ section[id*="ObjectPageSection-"] > div[role="heading"]': {
      display: 'block'
    },
    '& section[data-component-name="ObjectPageSection"]:last-of-type': {
      marginBottom: `var(${ObjectPageCssVariables.lastSectionMargin})`
    }
  },
  '@global html': {
    [ObjectPageCssVariables.anchorFloat]: 'right',
    [ObjectPageCssVariables.anchorRight]: '1.25rem',
    [ObjectPageCssVariables.anchorLeft]: 'unset'
  },
  '@global [dir="rtl"]': {
    [ObjectPageCssVariables.anchorFloat]: 'left',
    [ObjectPageCssVariables.anchorRight]: 'unset',
    [ObjectPageCssVariables.anchorLeft]: '1.25rem'
  },
  iconTabBarMode: {
    '& section[data-component-name="ObjectPageSection"] > div[role="heading"]': {
      display: 'none'
    }
  },
  headerCollapsed: {
    [DynamicPageCssVariables.headerDisplay]: 'none'
  },
  headerContainer: {
    marginBottom: '0.25rem',
    backgroundColor: ThemingParameters.sapObjectHeader_Background,
    display: 'grid',
    gridAutoColumns: 'auto 1fr',
    '& [data-component-name="ObjectPageHeaderContent"]': {
      gridColumn: 2,
      width: '100%',
      height: '100%'
    }
  },
  headerHoverStyles: {
    backgroundColor: `${ThemingParameters.sapTile_Active_Background} !important`,
    '& [data-component-name="DynamicPageTitle"]': {
      backgroundColor: ThemingParameters.sapTile_Active_Background
    }
  },
  header: {
    [DynamicPageCssVariables.headerDisplay]: 'block',
    boxSizing: 'border-box',
    backgroundColor: ThemingParameters.sapObjectHeader_Background,
    position: 'sticky',
    top: 0,
    zIndex: 2,
    gridAutoColumns: 'auto 1fr',
    '& [data-component-name="DynamicPageTitle"]': {
      gridColumn: 2,
      width: '100%',
      paddingLeft: 0,
      paddingRight: 0
    },
    '&:hover': {
      // TODO background color should be sapObjectHeader_Hover_Background (same color as sapTile_Active_Background)
      backgroundColor: ThemingParameters.sapTile_Active_Background
    },
    cursor: 'pointer',
    '&[data-not-clickable="true"]': {
      pointerEvents: 'none',
      cursor: 'unset',
      '&:hover': {
        backgroundColor: ThemingParameters.sapObjectHeader_Background
      }
    }
  },
  iEClass: {
    position: 'fixed',
    width: 'calc(100% - 18px)'
  },
  headerImage: {
    minWidth: '5rem',
    maxWidth: '5rem',
    maxHeight: '5rem',
    display: 'inline-block',
    marginRight: '2rem'
  },
  headerImageRtl: {
    marginRight: 0,
    marginLeft: '2rem'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  anchorBar: {
    position: 'sticky',
    zIndex: 2
  },
  footer: {
    position: 'sticky',
    bottom: '0.5rem',
    margin: '0 0.5rem'
  }
};
