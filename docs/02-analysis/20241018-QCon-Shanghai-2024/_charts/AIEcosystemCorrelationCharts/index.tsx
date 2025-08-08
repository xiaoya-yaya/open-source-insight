import React from 'react';

import GraphChart, { GraphChartProps } from '@site/src/components/GraphChart';
import useData, { getStaticDataUrl } from '@site/src/utils/useData';

export const AIEcosystemCorrelationChart1: React.FC = () => {
  const {data, loading } = useData<GraphChartProps['data']>({url: getStaticDataUrl('20241018-QCon-Shanghai-2024/graph1.json')})
  if (loading) return null;
  return <GraphChart data={data} highlightNodeIds={['pytorch/pytorch', 'vllm-project/vllm', 'langchain-ai/langchain']} />;
};

export const AIEcosystemCorrelationChart2: React.FC = () => {
  const {data, loading } = useData<GraphChartProps['data']>({url: getStaticDataUrl('20241018-QCon-Shanghai-2024/graph2.json')})
  if (loading) return null;
  return <GraphChart data={data} />;
};

export const AIEcosystemCorrelationChart3: React.FC = () => {
  const {data, loading } = useData<GraphChartProps['data']>({url: getStaticDataUrl('20241018-QCon-Shanghai-2024/graph3.json')})
  if (loading) return null;
  return <GraphChart data={data} />;
};

export const AIEcosystemCorrelationChart4: React.FC = () => {
  const {data, loading } = useData<GraphChartProps['data']>({url: getStaticDataUrl('20241018-QCon-Shanghai-2024/graph4.json')})
  if (loading) return null;
  return <GraphChart data={data} />;
};

export const AIEcosystemCorrelationChart5: React.FC = () => {
  const {data, loading } = useData<GraphChartProps['data']>({url: getStaticDataUrl('20241018-QCon-Shanghai-2024/graph5.json')})
  if (loading) return null;
  return <GraphChart data={data} />;
};

export const AIEcosystemCorrelationChart6: React.FC = () => {
  const {data, loading } = useData<GraphChartProps['data']>({url: getStaticDataUrl('20241018-QCon-Shanghai-2024/graph6.json')})
  if (loading) return null;
  return <GraphChart data={data} />;
};

export const AIEcosystemCorrelationChart7: React.FC = () => {
  const {data, loading } = useData<GraphChartProps['data']>({url: getStaticDataUrl('20241018-QCon-Shanghai-2024/top_projects_graph_1.json')})
  if (loading) return null;
  return <GraphChart data={data} />;
};

export const AIEcosystemCorrelationChart8: React.FC = () => {
  const {data, loading } = useData<GraphChartProps['data']>({url: getStaticDataUrl('20241018-QCon-Shanghai-2024/top_projects_graph_2.json')})
  if (loading) return null;
  return <GraphChart data={data} />;
};
