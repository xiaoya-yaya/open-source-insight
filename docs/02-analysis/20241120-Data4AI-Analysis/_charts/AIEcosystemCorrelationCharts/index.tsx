import React from 'react';

import GraphChart, { GraphChartProps } from '@site/src/components/GraphChart';
import useData, { getStaticDataUrl } from '@site/src/utils/useData';

export const Data4AICorrelationChartFull: React.FC = () => {
  const {data, loading } = useData<GraphChartProps['data']>({url: getStaticDataUrl('20241120-Data4AI-Analysis/graph_data4ai.json')})
  if (loading) return null;
  return <GraphChart data={data} highlightNodeIds={['elastic/kibana','grafana/grafana', 'ClickHouse/ClickHouse','apache/doris','elastic/elasticsearch', 'airbytehq/airbyte','StarRocks/starrocks','apache/airflow','metabase/metabase', 'ray-project/ray']}/>;
};

export const TableFormatCorrelationChart: React.FC = () => {
  const {data, loading } = useData<GraphChartProps['data']>({url: getStaticDataUrl('20241120-Data4AI-Analysis/graph_table_format.json')})
  if (loading) return null;
  return <GraphChart data={data} />;
};

export const DataEngineeringLandscapeCorrelationChart: React.FC = () => {
  const {data, loading } = useData<GraphChartProps['data']>({url: getStaticDataUrl('20241120-Data4AI-Analysis/graph_data_engineering_2024.json')})
  if (loading) return null;
  return <GraphChart data={data} />;
};

