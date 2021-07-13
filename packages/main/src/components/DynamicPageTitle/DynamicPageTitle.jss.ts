import { ThemingParameters } from '@ui5/webcomponents-react-base/dist/ThemingParameters';

export const DynamicPageTitleStyles = {
  container: {
    backgroundColor: ThemingParameters.sapObjectHeader_Background,
    minHeight: '3rem',
    wordWrap: 'break-word',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 2,
    cursor: 'pointer',
    '&[data-not-clickable="true"]': {
      pointerEvents: 'none',
      cursor: 'unset',
      '&:hover': {
        backgroundColor: ThemingParameters.sapObjectHeader_Background
      }
    },
    '&:hover': {
      // TODO background color should be sapObjectHeader_Hover_Background (same color as sapTile_Active_Background)
      backgroundColor: ThemingParameters.sapTile_Active_Background
    }
  },
  iEClass: {
    position: 'fixed',
    // page width - padding - scrollbar
    width: 'calc(100% - 18px - 4rem)'
  },
  breadcrumbs: {
    padding: '0.5rem 0 0.25rem 0'
  },
  titleMainSection: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'baseline'
  },
  title: {
    color: ThemingParameters.sapGroup_TitleTextColor,
    fontSize: ThemingParameters.sapFontHeader3Size,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    flexShrink: 1,
    paddingTop: '0.3125rem'
  },
  subTitleRight: {
    color: ThemingParameters.sapContent_LabelColor,
    fontSize: ThemingParameters.sapFontSize,
    whiteSpace: 'nowrap'
  },
  subTitleBottom: {
    color: ThemingParameters.sapContent_LabelColor,
    fontSize: ThemingParameters.sapFontSize,
    marginTop: '0.25rem'
  },
  content: {
    display: 'flex',
    flexShrink: 1.6
  }
};
