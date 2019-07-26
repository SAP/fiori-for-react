import { Optional } from '@ui5/webcomponents-react-base';
import { useEffect, Ref, RefObject, useCallback } from 'react';

const getSymbolForDataset = (type, dataset) => {
  const datasetMeta: any = dataset.hasOwnProperty('_meta') ? Object.values(dataset._meta)[0] : null;
  const elementType = Optional.of(datasetMeta, 'type').orElse(type);
  switch (elementType) {
    case 'line':
      return `
        <div style="width: 5px; height: 2px; background-color: ${dataset.backgroundColor}; border-top-left-radius: 2px; border-bottom-left-radius: 2px; margin-right: 2px"></div>
        <div style="width: 10px; height: 10px; background-color: ${dataset.backgroundColor}; border-radius: 50%;"></div>
        <div style="width: 5px; height: 2px; background-color: ${dataset.backgroundColor}; border-top-right-radius: 2px; border-bottom-right-radius: 2px; margin-left: 2px; margin-right: 8px"></div>
      `;
    default:
      return `<div style="width: 14px; height: 14px; border-radius: 2px; background-color: ${dataset.backgroundColor}; margin-right: 8px"></div>`;
  }
};

const getLegendEntry = (dataset, type, index) => {
  const symbol = getSymbolForDataset(type, dataset);

  return `<li style="display: flex; align-items: center; margin-right: 24px; margin-bottom: 1rem; cursor:pointer;" data-datasetindex="${index}">
${symbol}
<span style="font-size: 12px; color: #32363a; font-family: '72', Arial, Helvetica, sans-serif; user-select: none">${dataset.label}</span>
</li>`;
};

export const generateLegend = (chart) => {
  const { datasets } = chart.config.data;
  const type = chart.config.type;

  let itemsForLegend = datasets;
  if (['pie', 'doughnut'].includes(type)) {
    let pieDataSet = Object.values(datasets[0]._meta)[0] as any;
    itemsForLegend = pieDataSet.data.map((meta) => meta._model);
  }
  return `<div style="display: flex; flex-wrap: wrap; padding: 0 1rem; box-sizing: border-box">
${itemsForLegend.map((item, index) => getLegendEntry(item, type, index)).join(' ')}
</div>`;
};

export const useLegend = (
  chartRef: RefObject<any>,
  legendRef: RefObject<HTMLElement>,
  noLegend: boolean,
  handleLegendItemPress: (e: any) => void
) => {
  useEffect(() => {
    if (chartRef && legendRef) {
      if (noLegend) {
        legendRef.current.innerHTML = '';
      } else {
        legendRef.current.innerHTML = chartRef.current.chartInstance.generateLegend();
        legendRef.current.querySelectorAll('li').forEach((legendItem) => {
          legendItem.addEventListener('click', handleLegendItemPress);
        });
      }
    }
  }, [chartRef.current, legendRef.current, noLegend, handleLegendItemPress]);
};

export const usePieLegendItemClickHandler = (chartRef: RefObject<any>, legendRef: RefObject<HTMLElement>) => {
  return useCallback(
    (e) => {
      const clickTarget = (e.currentTarget as unknown) as HTMLLIElement;
      const datasetIndex = parseInt(clickTarget.dataset.datasetindex);
      const { chartInstance } = chartRef.current;
      const meta = chartInstance.getDatasetMeta(0).data[datasetIndex];
      meta.hidden = !meta.hidden;
      chartInstance.update();
      clickTarget.style.textDecoration = meta.hidden ? 'line-through' : 'unset';
    },
    [legendRef.current, chartRef.current]
  );
};

export const useLegendItemClickHandler = (chartRef: RefObject<any>, legendRef: RefObject<HTMLElement>) => {
  return useCallback(
    (e) => {
      const clickTarget = (e.currentTarget as unknown) as HTMLLIElement;
      const datasetIndex = parseInt(clickTarget.dataset.datasetindex);
      const { chartInstance } = chartRef.current;
      const meta = chartInstance.getDatasetMeta(datasetIndex);
      meta.hidden = meta.hidden === null ? !chartInstance.data.datasets[datasetIndex].hidden : null;
      chartInstance.update();
      clickTarget.style.textDecoration = meta.hidden ? 'line-through' : 'unset';
    },
    [legendRef.current, chartRef.current]
  );
};
