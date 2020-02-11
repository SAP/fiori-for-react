import React, { ComponentType, forwardRef, ReactNode, Ref, useCallback } from 'react';
import { ComposedChart, Legend, Tooltip, YAxis, XAxis, CartesianGrid, Brush } from 'recharts';
import { LineChartPlaceholder } from '..';
import { useTheme } from 'react-jss';
import { useConsolidatedRef } from '@ui5/webcomponents-react-base';
import { RechartBaseProps } from '../interfaces/RechartBaseProps';
import { ChartContainer } from './ChartContainer';

export interface ComposedChartContainerProps extends RechartBaseProps {
  children: ReactNode;
  placeHolder?: ComponentType<unknown>;
}

const ComposedChartContainer = forwardRef((props: ComposedChartContainerProps, ref: Ref<any>) => {
  const {
    height,
    width,
    loading,
    dataset,
    labelKey,
    dataPointClickHandler,
    legendClickHandler,
    chartConfig = {
      yAxisVisible: true,
      xAxisVisible: true,
      legendVisible: true,
      gridStroke: 'white',
      gridHorizontal: true,
      gridVertical: true,
      yAxisId: '',
      yAxisColor: 'red',
      legendPosition: 'bottom',
      secondYAxis: {
        name: '',
        dataKey: ''
      }
    }
  } = props;

  const { parameters }: any = useTheme();
  const chartRef = useConsolidatedRef<any>(ref);

  const onItemLegendClick = useCallback(
    (e) => {
      if (legendClickHandler) {
        legendClickHandler({
          dataKey: e.dataKey,
          value: e.value,
          chartType: e.type,
          color: e.color,
          payload: e.payload
        });
      }
    },
    [dataset]
  );

  const onDataPointClick = useCallback(
    (e) => {
      // TODO: Clickhandler datapoint click
    },
    [dataset]
  );

  return (
    <ChartContainer
      width={width}
      height={height}
      loading={loading}
      dataset={dataset}
      placeholder={LineChartPlaceholder}
    >
      <ComposedChart style={{ fontSize: parameters.sapUiFontSmallSize }} data={dataset}>
        <CartesianGrid
          vertical={chartConfig.gridVertical}
          horizontal={chartConfig.gridHorizontal}
          stroke={chartConfig.gridStroke}
        />
        {chartConfig.xAxisVisible && <XAxis dataKey={labelKey} />}
        {chartConfig.yAxisVisible && <YAxis />}
        {chartConfig.yAxisVisible && <YAxis type="number" orientation="right" yAxisId="left" />}
        <Tooltip />
        {chartConfig.legendVisible && <Legend onClick={onItemLegendClick} verticalAlign={chartConfig.legendPosition} />}
        {props['children']}
        <Brush height={30} />
      </ComposedChart>
    </ChartContainer>
  );
});

export { ComposedChartContainer };
