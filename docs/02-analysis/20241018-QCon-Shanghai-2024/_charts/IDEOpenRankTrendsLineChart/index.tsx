import React from 'react';

import LineChart, { DataItem } from '@site/src/components/LineChart';
import useData, { getStaticDataUrl } from '@site/src/utils/useData';

const IDEOpenRankTrendsLineChart: React.FC = () => {
  const {data, loading } = useData<DataItem[]>({url: getStaticDataUrl('20241018-QCon-Shanghai-2024/IDE_openrank.csv'), type: 'csv'})
  if (loading) return null;
  return <LineChart data={data} />;
};

export default IDEOpenRankTrendsLineChart;
