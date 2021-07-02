import { createUseStyles } from 'react-jss';
import { useI18nBundle, usePassThroughHtmlProps } from '@ui5/webcomponents-react-base/dist/hooks';
import { StyleClassHelper } from '@ui5/webcomponents-react-base/dist/StyleClassHelper';
import { enrichEventWithDetails } from '@ui5/webcomponents-react-base/dist/Utils';
import { DEVIATION, TARGET } from '@ui5/webcomponents-react/dist/assets/i18n/i18n-defaults';
import { DeviationIndicator } from '@ui5/webcomponents-react/dist/DeviationIndicator';
import { FlexBox } from '@ui5/webcomponents-react/dist/FlexBox';
import { FlexBoxAlignItems } from '@ui5/webcomponents-react/dist/FlexBoxAlignItems';
import { FlexBoxDirection } from '@ui5/webcomponents-react/dist/FlexBoxDirection';
import { FlexBoxJustifyContent } from '@ui5/webcomponents-react/dist/FlexBoxJustifyContent';
import { FlexBoxWrap } from '@ui5/webcomponents-react/dist/FlexBoxWrap';
import { ObjectStatus } from '@ui5/webcomponents-react/dist/ObjectStatus';
import { ValueState } from '@ui5/webcomponents-react/dist/ValueState';
import React, { FC, forwardRef, Ref, useCallback, useMemo } from 'react';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import styles from './AnalyticalCardHeader.jss';

export interface AnalyticalCardHeaderPropTypes extends CommonProps {
  /**
   * Defines the heading of the `AnalyticalCardHeader`.
   */
  heading?: string;
  /**
   * Defines the subheading of the `AnalyticalCardHeader`.
   */
  subheading?: string;
  /**
   * Defines the orientation of the deviation indicator.
   */
  arrowIndicator?: DeviationIndicator;
  /**
   * Defines whether the deviation indicator should be displayed.
   */
  showIndicator?: boolean;
  /**
   * Defines the value state of the deviation indicator.
   * Available options are: <ul> <li><code>None</code></li> <li><code>Error</code></li> <li><code>Warning</code></li> <li><code>Success</code></li></ul>
   */
  indicatorState?: ValueState;
  /**
   * Defines the value of the `AnalyticalCardHeader`.
   */
  value?: string;
  /**
   * Defines the unit displayed next to the value of the `AnalyticalCardHeader`.
   */
  unit?: string;
  /**
   * Defines the value state of the value.
   * Available options are: <ul> <li><code>None</code></li> <li><code>Error</code></li> <li><code>Warning</code></li> <li><code>Success</code></li></ul>
   */
  valueState?: ValueState;
  /**
   * Defines the target value.
   */
  target?: string;
  /**
   * Defines the deviation value.
   */
  deviation?: string;
  /**
   * Defines the description below the value of the `AnalyticalCardHeader`.
   */
  description?: string;
  /**
   * Defines the counter in the upper right corner of the `AnalyticalCardHeader`.
   */
  counter?: string;
  /**
   * Defines the value state of the counter.
   * Available options are: <ul> <li><code>None</code></li> <li><code>Error</code></li> <li><code>Warning</code></li> <li><code>Success</code></li> <li><code>Information</code></li> </ul>
   */
  counterState?: ValueState;
  /**
   * Defines the currency.
   */
  currency?: string;
  /**
   * Fired when the `AnalyticalCardHeader` header is clicked.
   */
  onHeaderClick?: (event: CustomEvent<{}>) => void;
}

const useStyles = createUseStyles(styles, {
  name: 'AnalyticalCardHeader'
});

export const AnalyticalCardHeader: FC<AnalyticalCardHeaderPropTypes> = forwardRef(
  (props: AnalyticalCardHeaderPropTypes, ref: Ref<HTMLDivElement>) => {
    const {
      heading,
      subheading,
      value,
      unit,
      target,
      deviation,
      valueState,
      onHeaderClick,
      showIndicator,
      tooltip,
      className,
      description,
      counter,
      counterState,
      currency,
      indicatorState,
      arrowIndicator,
      style
    } = props;
    const classes = useStyles();
    const onClick = useCallback(
      (e) => {
        if (onHeaderClick) {
          onHeaderClick(enrichEventWithDetails(e));
        }
      },
      [onHeaderClick]
    );
    const indicatorIcon = useMemo(() => {
      const arrowClasses = StyleClassHelper.of(classes.arrowIndicatorShape);
      switch (arrowIndicator) {
        case DeviationIndicator.Up:
          arrowClasses.put(classes.arrowUp);
          break;
        case DeviationIndicator.Down:
          arrowClasses.put(classes.arrowDown);
          break;
        default:
          arrowClasses.put(classes.arrowRight);
          break;
      }

      switch (indicatorState) {
        case ValueState.Success:
          arrowClasses.put(classes.good);
          break;
        case ValueState.Error:
          arrowClasses.put(classes.error);
          break;
        case ValueState.Warning:
          arrowClasses.put(classes.critical);
          break;
        default:
          arrowClasses.put(classes.none);

          break;
      }
      return <div className={arrowClasses.valueOf()} />;
    }, [arrowIndicator, indicatorState, classes]);

    const headerClasses = StyleClassHelper.of(classes.cardHeader);
    if (onHeaderClick) {
      headerClasses.put(classes.cardHeaderClickable);
    }

    const valueAndUnitClasses = StyleClassHelper.of(classes.valueAndUnit);
    if (valueState === ValueState.Error) {
      valueAndUnitClasses.put(classes.error);
    }
    if (valueState === ValueState.Warning) {
      valueAndUnitClasses.put(classes.critical);
    }
    if (valueState === ValueState.Success) {
      valueAndUnitClasses.put(classes.good);
    }

    if (className) {
      headerClasses.put(className);
    }
    const shouldRenderContent = [value, unit, deviation, target].some((v) => !!v);

    const passThroughProps = usePassThroughHtmlProps(props, ['onHeaderClick']);

    const i18nBundle = useI18nBundle('@ui5/webcomponents-react');

    return (
      <div
        ref={ref}
        className={headerClasses.valueOf()}
        title={tooltip}
        style={style}
        {...passThroughProps}
        onClick={onClick}
      >
        <div className={classes.headerContent}>
          <div className={classes.headerTitles}>
            <FlexBox justifyContent={FlexBoxJustifyContent.SpaceBetween} wrap={FlexBoxWrap.NoWrap}>
              <div className={classes.headerText}>{heading}</div>
              {counter && (
                <ObjectStatus className={classes.counter} state={counterState}>
                  {counter}
                </ObjectStatus>
              )}
            </FlexBox>
            {(subheading || currency) && (
              <div className={classes.subHeaderText}>
                {subheading}
                {currency && ` | ${currency}`}
              </div>
            )}
          </div>
          {shouldRenderContent && (
            <FlexBox direction={FlexBoxDirection.Row} className={classes.kpiContent} alignItems={FlexBoxAlignItems.End}>
              <FlexBox direction={FlexBoxDirection.Row}>
                <div className={valueAndUnitClasses.valueOf()}>
                  <div className={classes.value}>{value}</div>
                  <div className={classes.indicatorAndUnit}>
                    {showIndicator && indicatorIcon}
                    <div className={classes.unit}>{unit}</div>
                  </div>
                </div>
              </FlexBox>
              <FlexBox
                direction={FlexBoxDirection.Row}
                wrap={FlexBoxWrap.NoWrap}
                className={classes.targetAndDeviation}
              >
                {target && (
                  <FlexBox
                    direction={FlexBoxDirection.Column}
                    className={classes.targetAndDeviationColumn}
                    wrap={FlexBoxWrap.NoWrap}
                  >
                    <span>{i18nBundle.getText(TARGET)}</span>
                    <span className={classes.targetAndDeviationValue}>{target}</span>
                  </FlexBox>
                )}
                {deviation && (
                  <FlexBox
                    direction={FlexBoxDirection.Column}
                    className={classes.targetAndDeviationColumn}
                    wrap={FlexBoxWrap.NoWrap}
                  >
                    <span>{i18nBundle.getText(DEVIATION)}</span>
                    <span className={classes.targetAndDeviationValue}>{deviation}</span>
                  </FlexBox>
                )}
              </FlexBox>
            </FlexBox>
          )}
          {description && <div className={classes.description}>{description}</div>}
        </div>
      </div>
    );
  }
);

AnalyticalCardHeader.displayName = 'AnalyticalCardHeader';

AnalyticalCardHeader.defaultProps = {
  arrowIndicator: DeviationIndicator.None,
  indicatorState: ValueState.None,
  valueState: ValueState.None,
  counterState: ValueState.None
};
