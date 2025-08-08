import { DeveloperLogin, DeveloperMetricType, MetricCategory, MetricData, RepositoryFullName, RepositoryMetricType } from "@site/src/types/opendigger";
import fetchData from "./fetchData";

export interface FetchOpenDiggerDataProps {
  type: [MetricCategory.REPOSITORY, RepositoryMetricType] | [MetricCategory.DEVELOPER, DeveloperMetricType];
  name: RepositoryFullName | DeveloperLogin;
}

const fetchOpenDiggerData = async ({ type, name }: FetchOpenDiggerDataProps) => {
  const data = await fetchData<MetricData>({
    url: `https://oss.open-digger.cn/github/${name}/${type[1]}.json`,
    type: 'json',
  })
  return data;
}

export default fetchOpenDiggerData;
