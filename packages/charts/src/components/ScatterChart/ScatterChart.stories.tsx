import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import React from 'react';
import { ScatterChart } from '../../lib/ScatterChart';
import { bigDataSet, complexDataSet, scatterColorDataSet, scatterComplexDataSet } from '../../resources/DemoProps';

export default {
  title: 'Charts /  ScatterChart',
  component: ScatterChart
};

export const renderStory = () => (
  <ScatterChart
    loading={boolean('loading', false)}
    noLegend={boolean('noLegend', false)}
    noAnimation={boolean('noAnimation', false)}
    onDataPointClick={action('onDataPointClick')}
    onLegendClick={action('onLegendClick')}
    dataset={scatterComplexDataSet}
    style={{ width: '100%' }}
    measures={[
      {
        accessor: 'users',
        label: 'Users',
        axis: 'x'
      },
      {
        accessor: 'sessions',
        label: 'Sessions',
        axis: 'y'
      },
      {
        accessor: 'volume',
        axis: 'z'
      }
    ]}
  />
);

renderStory.story = {
  name: 'Default'
};

export const renderStoryWithCustomColor = () => (
  <ScatterChart
    loading={boolean('loading', false)}
    noLegend={boolean('noLegend', false)}
    noAnimation={boolean('noAnimation', false)}
    onDataPointClick={action('onDataPointClick')}
    dataset={scatterColorDataSet}
    style={{ width: '100%' }}
    measures={[
      {
        accessor: 'users',
        label: 'Users',
        axis: 'x'
      },
      {
        accessor: 'sessions',
        label: 'Sessions',
        axis: 'y'
      },
      {
        accessor: 'volume',
        axis: 'z'
      }
    ]}
  />
);

renderStoryWithCustomColor.story = {
  name: 'With custom color'
};

export const renderCustomDataLabelStory = () => {
  return (
    <ScatterChart
      loading={boolean('loading', false)}
      noLegend={boolean('noLegend', false)}
      noAnimation={boolean('noAnimation', false)}
      onDataPointClick={action('onDataPointClick')}
      onLegendClick={action('onLegendClick')}
      dataset={scatterComplexDataSet}
      style={{ width: '100%' }}
      measures={[
        {
          accessor: 'users',
          label: 'Users',
          formatter: (e) => e + ' Users',
          axis: 'x'
        },
        {
          accessor: 'sessions',
          label: 'Active Sessions',
          formatter: (e) => e + ' Sessions',
          hideDataLabel: true,
          axis: 'y'
        },
        {
          accessor: 'volume',
          axis: 'z'
        }
      ]}
    />
  );
};

renderCustomDataLabelStory.story = {
  name: 'With formatter'
};

export const loadingPlaceholder = () => <ScatterChart style={{ width: '100%' }} measures={[]} />;

loadingPlaceholder.story = {
  name: 'Loading placeholder'
};
