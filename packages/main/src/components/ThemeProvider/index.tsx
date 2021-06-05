import { fetchI18nBundle } from '@ui5/webcomponents-base/dist/i18nBundle';
import { cssVariablesStyles } from '@ui5/webcomponents-react-base/dist/CssSizeVariables';
import { initRangeSet, RANGESETS } from '@ui5/webcomponents-react-base/dist/Device';
import { useIsomorphicLayoutEffect } from '@ui5/webcomponents-react-base/dist/hooks';
import { ThemingParameters } from '@ui5/webcomponents-react-base/dist/ThemingParameters';
import React, { FC, ReactNode, useEffect } from 'react';
import { createUseStyles, ThemeProvider as ReactJssThemeProvider } from 'react-jss';
import { GlobalStyleClassesStyles } from './GlobalStyleClasses.jss';

const useStyles = createUseStyles(GlobalStyleClassesStyles);

const cssVarsPonyfillNeeded = () => !!window.CSSVarsPonyfill;

export interface ThemeProviderPropTypes {
  children: ReactNode;
}

// inject the size variables first before the ThemeProvider Component is mounted, otherwise there will be some flickering
if (!document.querySelector('style[data-ui5-webcomponents-react-sizes]')) {
  const variables = document.createElement('style');
  variables.setAttribute('data-ui5-webcomponents-react-sizes', '');
  variables.innerHTML = cssVariablesStyles;
  document.head.appendChild(variables);
}

const ThemeProvider: FC<ThemeProviderPropTypes> = (props: ThemeProviderPropTypes) => {
  const { children } = props;
  useStyles();

  useEffect(() => {
    if (cssVarsPonyfillNeeded()) {
      window.CSSVarsPonyfill.cssVars({
        rootElement: document.head,
        include: 'style[data-ui5-webcomponents-react-sizes],style[data-jss]',
        watch: true,
        silent: true
      });
    }
  }, []);

  // init default media range sets
  useIsomorphicLayoutEffect(() => {
    initRangeSet();
    initRangeSet(RANGESETS.SAP_STANDARD_EXTENDED);
    fetchI18nBundle('@ui5/webcomponents-react');
  }, []);

  return <ReactJssThemeProvider theme={ThemingParameters}>{children}</ReactJssThemeProvider>;
};

ThemeProvider.displayName = 'ThemeProvider';

export { ThemeProvider };
