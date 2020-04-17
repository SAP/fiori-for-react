import { action } from '@storybook/addon-actions';
import React from 'react';
import { RadarChart } from './RadarChart';
import { ColumnChart } from '../ColumnChart/ColumnChart';
import { boolean } from '@storybook/addon-knobs';
import { complexDataSet, secondaryDimensionDataSet, simpleDataSet } from '../../resources/DemoProps';

export default {
  title: 'Charts - Unstable /  RadarRechart',
  component: RadarChart
};

export const renderStory = () => {
  return (
    <RadarChart
      loading={boolean('loading', false)}
      onDataPointClick={action('onDataPointClick')}
      onLegendClick={action('onLegendClick')}
      dataset={complexDataSet}
      style={{ width: '50%' }}
      dimensions={[
        {
          accessor: 'name',
          formatter: (d) => `${d} 2019`,
          interval: 0
        }
      ]}
      measures={[
        {
          accessor: 'users',
          label: 'Users',
          formatter: (val) => val.toLocaleString()
        },
        {
          accessor: 'sessions',
          label: 'Active Sessions',
          formatter: (val) => `${val} sessions`,
          hideDataLabel: true
        },
        {
          accessor: 'volume',
          label: 'Vol.'
        }
      ]}
    />
  );
};

renderStory.story = {
  name: 'Default'
};

export const renderStoryWithCustomColor = () => (
  <RadarChart
    onDataPointClick={action('onDataPointClick')}
    dimensions={[{ accessor: 'name' }]}
    measures={[{ accessor: 'users', color: 'red' }]}
    dataset={simpleDataSet}
    style={{ width: '50%' }}
  />
);

renderStoryWithCustomColor.story = {
  name: 'With custom color'
};

export const renderLabelStory = () => {
  return (
    <RadarChart
      onDataPointClick={action('onDataPointClick')}
      onLegendClick={action('onLegendClick')}
      dimensions={[{ accessor: 'name' }]}
      measures={[
        {
          accessor: 'users'
        },
        {
          accessor: 'sessions'
        },
        {
          accessor: 'volume'
        }
      ]}
      dataset={complexDataSet}
      style={{ width: '50%' }}
    />
  );
};

renderLabelStory.story = {
  name: 'With data labels'
};

export const renderCustomDataLabelStory = () => {
  return (
    <RadarChart
      onDataPointClick={action('onDataPointClick')}
      onLegendClick={action('onLegendClick')}
      dataset={complexDataSet}
      dimensions={[{ accessor: 'name', label: 'number of users', formatter: (element: string) => element.slice(0, 3) }]}
      chartConfig={{ polarGridType: 'polygon' }}
      measures={[
        {
          accessor: 'users',
          formatter: (element: number) => `${element / 10}`
        },
        {
          accessor: 'sessions'
        },
        {
          accessor: 'volume'
        }
      ]}
      style={{ width: '50%' }}
    />
  );
};

renderCustomDataLabelStory.story = {
  name: 'As polygon'
};

export const loadingPlaceholder = () => <RadarChart style={{ width: '30%' }} dimensions={[]} measures={[]} />;

loadingPlaceholder.story = {
  name: 'Loading placeholder'
};
