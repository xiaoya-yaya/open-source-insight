import React from 'react';

import LineChart, { DataItem } from '@site/src/components/LineChart';
import useData, { getStaticDataUrl } from '@site/src/utils/useData';

const LLMDistributedTrainingLineChart: React.FC = () => {
  const {data, loading } = useData<DataItem[]>({url: getStaticDataUrl('20241018-QCon-Shanghai-2024/LLMDistributedTraining.csv'), type: 'csv'})
  if (loading) return null;
  return <LineChart data={data} />;
};

export default LLMDistributedTrainingLineChart;
