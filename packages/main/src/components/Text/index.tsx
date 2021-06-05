import { createUseStyles } from 'react-jss';
import { StyleClassHelper } from '@ui5/webcomponents-react-base/dist/StyleClassHelper';
import { usePassThroughHtmlProps } from '@ui5/webcomponents-react-base/dist/usePassThroughHtmlProps';
import React, { FC, forwardRef, ReactNode, Ref } from 'react';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { TextStyles } from './Text.jss';

export interface TextPropTypes extends CommonProps {
  /**
   * Pass the text as direct child of Text
   */
  children: string | JSX.Element | ReactNode;
  /**
   * Defines how white-space inside <code>Text</code> is handled. If set to true, sequences of white space are preserved.
   */
  renderWhitespace?: boolean;
  /**
   * Defines whether the text wraps when there is not enough space.
   */
  wrapping?: boolean;
}

const useStyles = createUseStyles(TextStyles, { name: 'Text' });
/**
 * The `Text` component can be used for embedding text into your app. You can hyphenate the text with the use of the `wrapping` prop.
 * <br />__Note:__ Line breaks will always be visualized except when the wrapping property is set to false. In addition, tabs and whitespace can be preserved by setting the renderWhitespace property to true.
 */
const Text: FC<TextPropTypes> = forwardRef((props: TextPropTypes, ref: Ref<HTMLSpanElement>) => {
  const { children, renderWhitespace, wrapping, className, style, tooltip, slot } = props;
  const classes = useStyles();
  const classNameString = StyleClassHelper.of(classes.text);
  if (wrapping === false) {
    classNameString.put(classes.noWrap);
  }
  if (renderWhitespace) {
    classNameString.put(classes.renderWhitespace);
  }
  if (className) {
    classNameString.put(className);
  }

  const passThroughProps = usePassThroughHtmlProps(props);

  return (
    <span
      ref={ref}
      style={style}
      className={classNameString.toString()}
      title={tooltip}
      slot={slot}
      {...passThroughProps}
    >
      {children}
    </span>
  );
});

Text.defaultProps = {
  renderWhitespace: false,
  wrapping: true
};

Text.displayName = 'Text';

export { Text };
