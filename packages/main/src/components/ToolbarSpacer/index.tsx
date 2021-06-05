import { usePassThroughHtmlProps } from '@ui5/webcomponents-react-base/dist/hooks';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import React from 'react';

export type ToolbarSpacerPropTypes = CommonProps;

const ToolbarSpacer = (props: ToolbarSpacerPropTypes) => {
  const passThroughProps = usePassThroughHtmlProps(props);
  return <span style={{ flexGrow: 1 }} className="spacer" {...passThroughProps} />;
};

ToolbarSpacer.displayName = 'ToolbarSpacer';
export { ToolbarSpacer };
