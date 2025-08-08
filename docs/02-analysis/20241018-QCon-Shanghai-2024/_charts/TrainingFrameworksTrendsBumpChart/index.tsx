import { EChartsOption } from 'echarts';
import { findLast, uniq } from 'lodash-es';
import React from 'react';

import ResponsiveECharts from '@site/src/components/ResponsiveECharts';
import useData, { getStaticDataUrl } from '@site/src/utils/useData';

interface DataItem {
  month: string; // YYYY-MM-DD
  openrank: string; // 数字 string
  repo_id: string;
  repo_name: string;
}

const TrainingFrameworksOpenRankDecadeTrendsBumpChart: React.FC = () => {
  const {data, loading } = useData<DataItem[]>({url: getStaticDataUrl('20241018-QCon-Shanghai-2024/ML-framework-trend.csv'), type: 'csv'})
  if (loading) return null;

  const repoIds = uniq((data as DataItem[]).map((item) => item.repo_id));
  const months = uniq((data as DataItem[]).map((item) => item.month));

  const generateRankingData = () => {
    const map = new Map();
    for (const month of months) {
      // 将数据按照openrank值进行排序
      const monthData = (data as DataItem[]).filter((item) => item.month === month);
      const sortedData = monthData.sort((a, b) => parseFloat(b.openrank) - parseFloat(a.openrank));
      const rankMap: Record<string, number> = {};
      sortedData.forEach((item, index) => {
        rankMap[item.repo_id] = index + 1;
      });
      repoIds.forEach((id: string) => {
        // 仓库可能改名，取最新的名字
        const latestName = findLast(data as DataItem[], (item) => item.repo_id === id)?.repo_name;
        map.set(latestName, (map.get(latestName) || []).concat(rankMap[id]));
      });
    }
    return map;
  };

  const generateSeriesList = () => {
    const seriesList: EChartsOption['series'] = [];
    const rankingMap = generateRankingData();
    rankingMap.forEach((_data, name) => {
      const series: EChartsOption['series'] = {
        name,
        symbolSize: 10,
        type: 'line',
        smooth: true,
        emphasis: {
          focus: 'series',
        },
        endLabel: {
          show: true,
          formatter: '{a}',
          distance: 20,
        },
        lineStyle: {
          width: 2,
        },
        data: _data,
      };
      seriesList.push(series);
    });
    return seriesList;
  };

  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
    },
    grid: {
      left: 30,
      right: 110,
      bottom: 30,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      splitLine: {
        show: true,
      },
      axisLabel: {
        margin: 30,
        fontSize: 16,
      },
      boundaryGap: false,
      data: months,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        margin: 30,
        fontSize: 16,
        formatter: '#{value}',
      },
      inverse: true,
      interval: 1,
      min: 1,
      max: repoIds.length,
    },
    dataZoom: {
      type: 'inside',
    },
    series: generateSeriesList(),
  };

  return <ResponsiveECharts style={{ height: '500px' }} option={option} />;
};

export default TrainingFrameworksOpenRankDecadeTrendsBumpChart;
