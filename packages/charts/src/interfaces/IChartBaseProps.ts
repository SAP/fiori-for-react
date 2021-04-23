import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { ReactNode, ReactNodeArray } from 'react';
import { ICartesianChartConfig } from './ICartesianChartConfig';

export interface IChartBaseProps<T = ICartesianChartConfig> extends CommonProps {
  /**
   * Flag whether the chart should display a loading indicator.
   *
   * This can either be a placeholder shimmer (in case the chart has no data yet) or a small
   * loading bar in the top of the chart (in case the chart has already some data to display).
   */
  loading?: boolean;
  /**
   * The `dataset` is an array of object which will be displayed in the chart.
   */
  dataset?: Record<string, unknown>[];

  /**
   * With the help of the `children` prop you can add more svg elements to the chart, e.g. if you want to display
   * a linear gradient.
   */
  children?: ReactNode | ReactNodeArray;

  /**
   * `noLegend` toggles the visibility of the legend below the chart. If this prop is `true`, no legend will be rendered.
   */
  noLegend?: boolean;

  /**
   * The `onDataPointClick` event fires whenever the user clicks on e.g. a  bar in `BarChart` or a point the `LineChart`.
   *
   * You can use this event to trigger e.g. navigations or set filters based on the last clicked data point.
   */
  onDataPointClick?: (event: CustomEvent) => void;

  /**
   * The `onLegendClick` event fires when the user clicks on a label of the legend.
   *
   * This can be useful to e.g. show/hide the current dataset in case you have multiple datasets in in your chart.
   * @param event
   */
  onLegendClick?: (event: CustomEvent) => void;

  /**
   * `noAnimation` disabled all chart animations when set to `true`.
   */
  noAnimation?: boolean;

  /**
   * Defines possible configurations of the chart.
   *
   * <h4>Possible properties</h4>
   *
   * - `margin`: Sets the margin of the chart container. Receives a object with four possible properties (`right`, `left`, `top`, `bottom`) that expect a number as value.
   * - `legendPosition`: Position of the legend. Can be one of the following: `"top"`, `"left"`, `"right"`, `"bottom"`
   * - `legendHorizontalAlign`: Alignment of the legend. Can be one of the following: `"left"`, `"center"`, `"right"`
   * - `resizeDebounce`: Number that sets the amount of delay time the chart waits when resizing.
   */
  chartConfig?: T & {
    /**
     * Sets the margin of the chart container. Receives a object with four possible properties (`right`, `left`, `top`, `bottom`) that expect a number as value.
     */
    margin?: {
      right: number;
      left: number;
      top: number;
      bottom: number;
    };
    /**
     * Position of the legend. Can be one of the following: `"top"`, `"left"`, `"right"`, `"bottom"`
     */
    legendPosition?: string;
    /**
     * Alignment of the legend. Can be one of the following: `"left"`, `"center"`, `"right"`
     */
    legendHorizontalAlign?: string;
    /**
     * Number that sets the amount of delay time the chart waits when resizing.
     */
    resizeDebounce?: number;
    /**
     * Fired when clicked anywhere in the chart.
     */
    onClick?: (event: CustomEvent<{ payload: unknown; activePayloads: Record<string, unknown>[] }>) => void;
  };
}
