import { createUseStyles } from 'react-jss';
import { StyleClassHelper } from '@ui5/webcomponents-react-base/dist/StyleClassHelper';
import { usePassThroughHtmlProps } from '@ui5/webcomponents-react-base/dist/usePassThroughHtmlProps';
import React, { FC, forwardRef, ReactNode, ReactNodeArray, Ref } from 'react';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';

import styles from './AnalyticalCard.jss';

export interface AnalyticalCardPropTypes extends CommonProps {
  /**
   * The Card header Component. Using the `AnalyticalCardHeader` is recommended.
   */
  header?: ReactNode;
  /**
   * The content of the `AnalyticalCard`.
   */
  children: ReactNode | ReactNodeArray;
}

const useStyles = createUseStyles(styles, { name: 'AnalyticalCard' });
/**
 * The `AnalyticalCard` is mainly used for data visualization. It consists of two areas – a header area and a chart area with a visual representation of the data.<br />
 */
const AnalyticalCard: FC<AnalyticalCardPropTypes> = forwardRef(
  (props: AnalyticalCardPropTypes, ref: Ref<HTMLDivElement>) => {
    const { children, style, className, tooltip, header } = props;
    const classes = useStyles();
    const classNameString = StyleClassHelper.of(classes.card);
    if (className) {
      classNameString.put(className);
    }

    const passThroughProps = usePassThroughHtmlProps(props);

    return (
      <div ref={ref} className={classNameString.toString()} style={style} title={tooltip} {...passThroughProps}>
        {header}
        <div className={classes.content}>{children}</div>
      </div>
    );
  }
);

AnalyticalCard.displayName = 'AnalyticalCard';

export { AnalyticalCard };
