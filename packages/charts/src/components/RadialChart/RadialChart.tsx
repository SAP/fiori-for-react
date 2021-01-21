import { ThemingParameters } from '@ui5/webcomponents-react-base/lib/ThemingParameters';
import { usePassThroughHtmlProps } from '@ui5/webcomponents-react-base/lib/usePassThroughHtmlProps';
import { enrichEventWithDetails } from '@ui5/webcomponents-react-base/lib/Utils';
import { ChartContainer } from '@ui5/webcomponents-react-charts/lib/components/ChartContainer';
import { PieChartPlaceholder } from '@ui5/webcomponents-react-charts/lib/PieChartPlaceholder';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import React, { CSSProperties, FC, forwardRef, Ref, useCallback, useMemo } from 'react';
import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts';

export interface RadialChartProps extends CommonProps {
  /**
   * Defines the value of the chart.
   */
  value?: number;
  /**
   * Defines the maxValue of the chart.
   *
   * __Note:__ If `value` is greater than `maxValue` the chart is always 100% filled.
   */
  maxValue?: number;
  /**
   * Defines the label inside the `RadialChart`.
   */
  displayValue?: number | string;
  /**
   * Defines the color of the completed section.
   */
  color?: CSSProperties['color'];
  /**
   * The `onDataPointClick` event fires whenever the user clicks on e.g. a  bar in `BarChart` or a point the `LineChart`.
   *
   * You can use this event to trigger e.g. navigations or set filters based on the last clicked data point.
   */
  onDataPointClick?: (event: CustomEvent<{ value: unknown; payload: unknown; dataIndex: number }>) => void;
}

const radialChartMargin = { right: 30, left: 30, top: 30, bottom: 30 };
const radialBarBackground = { fill: ThemingParameters.sapContent_ImagePlaceholderBackground };
const radialBarLabelStyle = { fontSize: ThemingParameters.sapFontHeader3Size, fill: ThemingParameters.sapTextColor };

const RadialChart: FC<RadialChartProps> = forwardRef((props: RadialChartProps, ref: Ref<HTMLDivElement>) => {
  const { maxValue, value, displayValue, onDataPointClick, color, style, className, tooltip, slot } = props;

  const range = useMemo(() => {
    return [0, maxValue];
  }, [maxValue]);

  const dataset = useMemo(() => [{ value }], [value]);

  const onDataPointClickInternal = useCallback(
    (payload, i, event) => {
      if (payload && onDataPointClick) {
        onDataPointClick(
          enrichEventWithDetails(event, {
            value: payload.value,
            payload: payload.payload,
            dataIndex: i
          })
        );
      }
    },
    [onDataPointClick]
  );

  const passThroughProps = usePassThroughHtmlProps(props, ['onDataPointClick', 'onLegendClick']);
  return (
    <ChartContainer
      dataset={dataset}
      ref={ref}
      Placeholder={PieChartPlaceholder}
      style={style}
      className={className}
      tooltip={tooltip}
      slot={slot}
      resizeDebounce={250}
      {...passThroughProps}
    >
      <RadialBarChart
        margin={radialChartMargin}
        innerRadius="90%"
        outerRadius="100%"
        barSize={10}
        data={dataset}
        cx="50%"
        cy="50%"
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis type="number" domain={range as any} tick={false} />
        <RadialBar
          background={radialBarBackground}
          dataKey="value"
          cornerRadius="50%"
          fill={color ?? ThemingParameters.sapChart_OrderedColor_1}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onClick={onDataPointClickInternal}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="progress-label"
          style={radialBarLabelStyle}
        >
          {displayValue}
        </text>
      </RadialBarChart>
    </ChartContainer>
  );
});

RadialChart.defaultProps = {
  maxValue: 100
};

RadialChart.displayName = 'RadialChart';

export { RadialChart };
