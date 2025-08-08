import React from 'react';

import LineChart, { DataItem } from '@site/src/components/LineChart';
import useData, { getStaticDataUrl } from '@site/src/utils/useData';

const TrainingFrameworksOpenRankDecadeTrendsLineChart: React.FC = () => {
  const {data, loading } = useData<DataItem[]>({url: getStaticDataUrl('20241018-QCon-Shanghai-2024/ML-framework-trend.csv'), type: 'csv'})
  if (loading) return null;
  return <LineChart data={data} />;
};

export default TrainingFrameworksOpenRankDecadeTrendsLineChart;
