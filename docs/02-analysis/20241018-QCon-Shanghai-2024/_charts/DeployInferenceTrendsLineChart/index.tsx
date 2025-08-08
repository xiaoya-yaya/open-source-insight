import React from 'react';

import LineChart, { DataItem } from '@site/src/components/LineChart';
import useData, { getStaticDataUrl } from '@site/src/utils/useData';

const InferenceOpenRankTrendsLineChart: React.FC = () => {
  const {data, loading } = useData<DataItem[]>({url: getStaticDataUrl('20241018-QCon-Shanghai-2024/inference_openrank_trend.csv'), type: 'csv'})
  if (loading) return null;
  return <LineChart data={data} />;
};

export default InferenceOpenRankTrendsLineChart;
