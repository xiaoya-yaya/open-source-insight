import React from 'react';

import GraphChart, { GraphChartProps } from '@site/src/components/GraphChart';
import useData, { getStaticDataUrl } from '@site/src/utils/useData';

export const LandscapeCorrelationChartFull: React.FC = () => {
  const {data, loading } = useData<GraphChartProps['data']>({url: getStaticDataUrl('20250501-OpenSourceAI-Landscape/graph_landscape_202505.json')})
  if (loading) return null;
  return <GraphChart data={data} highlightNodeIds={['pytorch/pytorch',
    'vllm-project/vllm',
    'langgenius/dify',
    'elastic/elasticsearch',
    'ollama/ollama',
    'openvinotoolkit/openvino',
    'apache/airflow',
    'sgl-project/sglang',
    'open-webui/open-webui',
    'ggml-org/llama.cpp',
    'BerriAI/litellm',
    'ray-project/ray',
    'stackblitz/bolt.new',
    'PaddlePaddle/Paddle',
    'airbytehq/airbyte',
    'apache/spark',
    'microsoft/onnxruntime',
    'n8n-io/n8n',
    'infiniflow/ragflow',
    'NVIDIA/NeMo']}/>;
};


