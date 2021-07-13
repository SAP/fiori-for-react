import { ThemingParameters } from '@ui5/webcomponents-react-base/dist/ThemingParameters';
import { DynamicPageCssVariables } from '../DynamicPage/DynamicPage.jss';
import { isIE } from '@ui5/webcomponents-react-base/dist/Device';

export const DynamicPageHeaderStyles = {
  header: {
    backgroundColor: ThemingParameters.sapObjectHeader_Background,
    position: 'sticky',
    zIndex: 1,
    paddingTop: '1rem',
    paddingBottom: '1rem',
    display: `var(${DynamicPageCssVariables.headerDisplay})`,
    overflow: isIE() ? 'visible' : 'hidden'
  },
  iEClass: {
    position: 'fixed',
    // page width - padding - scrollbar
    width: 'calc(100% - 18px - 4rem)'
  }
};
