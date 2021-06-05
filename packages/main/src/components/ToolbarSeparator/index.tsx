import { useI18nBundle, usePassThroughHtmlProps } from '@ui5/webcomponents-react-base/dist/hooks';
import { createUseStyles } from 'react-jss';
import { CssSizeVariables } from '@ui5/webcomponents-react-base/dist/CssSizeVariables';
import { StyleClassHelper } from '@ui5/webcomponents-react-base/dist/StyleClassHelper';
import { ThemingParameters } from '@ui5/webcomponents-react-base/dist/ThemingParameters';
import React from 'react';
import { SEPARATOR } from '@ui5/webcomponents-react/dist/assets/i18n/i18n-defaults';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';

const styles = {
  separator: {
    width: '0.0625rem',
    height: CssSizeVariables.sapWcrToolbarSeparatorHeight,
    background: ThemingParameters.sapToolbar_SeparatorColor
  }
};

const useStyles = createUseStyles(styles, { name: 'ToolbarSeparator' });

export type ToolbarSeparatorPropTypes = CommonProps;

const ToolbarSeparator = (props: ToolbarSeparatorPropTypes) => {
  const { style, className } = props;
  const classes = useStyles();
  const separatorClasses = StyleClassHelper.of(classes.separator);
  const i18nBundle = useI18nBundle('@ui5/webcomponents-react');
  if (className) {
    separatorClasses.put(className);
  }
  const passThroughProps = usePassThroughHtmlProps(props);

  return (
    <div
      style={style}
      className={separatorClasses.valueOf()}
      aria-label={i18nBundle.getText(SEPARATOR)}
      {...passThroughProps}
    />
  );
};
ToolbarSeparator.displayName = 'ToolbarSeparator';
export { ToolbarSeparator };
