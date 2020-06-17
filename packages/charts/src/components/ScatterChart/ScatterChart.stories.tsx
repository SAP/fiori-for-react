import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import React from 'react';
import { ScatterChart } from '../../lib/ScatterChart';
import {
  bigDataSet,
  complexDataSet,
  scatterComplexDataSet,
  secondaryDimensionDataSet,
  simpleDataSet
} from '../../resources/DemoProps';

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
    dimension={{
      accessor: 'volume',
      formatter: (e) => e + 'test'
    }}
    measures={[
      {
        accessor: 'users',
        label: 'Users',
        formatter: (val) => val.toLocaleString()
      },
      {
        accessor: 'sessions',
        label: 'Active Sessions',
        hideDataLabel: true
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
    dimensions={{ accessor: 'name' }}
    measures={[{ accessor: 'users', color: 'red' }]}
    dataset={scatterComplexDataSet}
    style={{ width: '95%', height: '40vh' }}
  />
);

renderStoryWithCustomColor.story = {
  name: 'With custom color'
};

export const withSecondaryDimension = () => (
  <ScatterChart
    loading={boolean('loading', false)}
    noLegend={boolean('noLegend', false)}
    noAnimation={boolean('noAnimation', false)}
    onDataPointClick={action('onDataPointClick')}
    dimensions={[{ accessor: 'name' }, { accessor: 'dimension' }]}
    measures={[{ accessor: 'users', color: 'red' }]}
    dataset={secondaryDimensionDataSet}
    style={{ width: '95%', height: '60vh' }}
  />
);

withSecondaryDimension.story = {
  name: 'With secondary dimension'
};

export const renderLabelStory = () => {
  return (
    <ScatterChart
      loading={boolean('loading', false)}
      noLegend={boolean('noLegend', false)}
      noAnimation={boolean('noAnimation', false)}
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
      style={{ width: '95%', height: '40vh' }}
      chartConfig={{
        zoomingTool: true
      }}
    />
  );
};

renderLabelStory.story = {
  name: 'With data labels'
};

export const renderCustomDataLabelStory = () => {
  return (
    <ScatterChart
      loading={boolean('loading', false)}
      noLegend={boolean('noLegend', false)}
      noAnimation={boolean('noAnimation', false)}
      onDataPointClick={action('onDataPointClick')}
      onLegendClick={action('onLegendClick')}
      dataset={complexDataSet}
      dimensions={[{ accessor: 'name', formatter: (element: string) => element.slice(0, 3) }]}
      measures={[
        {
          accessor: 'users',
          formatter: (element: number) => `${element / 10}`,
          label: 'number of users'
        },
        {
          accessor: 'sessions'
        },
        {
          accessor: 'volume'
        }
      ]}
      style={{ width: '95%', height: '40vh' }}
      chartConfig={{
        zoomingTool: true
      }}
    />
  );
};

renderCustomDataLabelStory.story = {
  name: 'With formatter'
};

export const loadingPlaceholder = () => <LineChart style={{ width: '100%' }} dimensions={[]} measures={[]} />;

loadingPlaceholder.story = {
  name: 'Loading placeholder'
};

export const withReferenceLineStory = () => {
  return (
    <ScatterChart
      loading={boolean('loading', false)}
      noLegend={boolean('noLegend', false)}
      noAnimation={boolean('noAnimation', false)}
      onDataPointClick={action('onDataPointClick')}
      onLegendClick={action('onLegendClick')}
      dataset={bigDataSet}
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
      style={{ width: '95%', height: '40vh' }}
      chartConfig={{
        referenceLine: {
          color: 'red',
          label: 'MAX',
          value: 650
        }
      }}
    />
  );
};

withReferenceLineStory.story = {
  name: 'With reference line'
};
