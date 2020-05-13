import { deprecationNotice } from '@ui5/webcomponents-react-base/lib/Utils';
import { useConsolidatedRef } from '@ui5/webcomponents-react-base/lib/useConsolidatedRef';
import { withChartContainer } from '@ui5/webcomponents-react-charts/lib/withChartContainer';
import React, { FC, forwardRef, Ref, useEffect, useMemo } from 'react';
import { Radar } from 'react-chartjs-2';
import { getTheme } from '@ui5/webcomponents-base/dist/config/Theme';
import { ChartBaseProps } from '../../interfaces/ChartBaseProps';
import { InternalProps } from '../../interfaces/InternalProps';
import { useLegend, useLegendItemClickHandler } from '../../internal/ChartLegend';
import { ChartBaseDefaultProps } from '../../util/ChartBaseDefaultProps';
import { useChartData } from '../../util/populateData';
import { formatAxisCallback, formatTooltipLabel, useMergedConfig } from '../../util/utils_deprecated';

export interface RadarChartPropTypes extends ChartBaseProps {}

const RadarChartComponent = forwardRef((props: RadarChartPropTypes, ref: Ref<any>) => {
  const {
    labels,
    datasets,
    width,
    height,
    options,
    categoryAxisFormatter,
    getDatasetAtEvent,
    getElementAtEvent,
    valueAxisFormatter,
    colors,
    noLegend,
    legendRef
  } = props as RadarChartPropTypes & InternalProps;

  useEffect(() => {
    deprecationNotice(
      'RadarChart',
      "This component is deprecated and will be removed with v0.10.0. Please use '@ui5/webcomponents-react-charts/lib/next/RadarChart' instead."
    );
  }, []);

  const theme = getTheme();
  const data = useChartData(labels, datasets, colors, theme);

  const radarChartDefaultConfig = useMemo(() => {
    return {
      scale: {
        ticks: {
          callback: formatAxisCallback(valueAxisFormatter)
        }
      },
      tooltips: {
        callbacks: {
          label: formatTooltipLabel(categoryAxisFormatter, valueAxisFormatter)
        }
      },
      plugins: {
        datalabels: false
      }
    };
  }, [categoryAxisFormatter, valueAxisFormatter]);
  const mergedOptions = useMergedConfig(radarChartDefaultConfig, options);

  const chartRef = useConsolidatedRef<any>(ref);
  const handleLegendItemPress = useLegendItemClickHandler(chartRef, legendRef);
  useLegend(chartRef, legendRef, noLegend, handleLegendItemPress);

  return (
    <Radar
      ref={chartRef}
      data={data}
      height={height}
      width={width}
      options={mergedOptions}
      getDatasetAtEvent={getDatasetAtEvent}
      getElementAtEvent={getElementAtEvent}
    />
  );
});

/**
 * <code>import { RadarChart } from '@ui5/webcomponents-react-charts/lib/RadarChart';</code>
 * <br />
 * <b>This component is deprecated and will be removed with v0.10.0. Please use [this component](https://sap.github.io/ui5-webcomponents-react/?path=/docs/charts-radarchart) instead.</b>
 */
const RadarChart: FC<RadarChartPropTypes> = withChartContainer(RadarChartComponent);

RadarChart.defaultProps = {
  ...ChartBaseDefaultProps
};
RadarChart.displayName = 'RadarChart';

export { RadarChart };
