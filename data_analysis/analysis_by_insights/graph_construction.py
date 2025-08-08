import os
from dotenv import load_dotenv
# 连接 Clickhouse 数据库
import clickhouse_connect
import itertools
import pandas as pd
import json

load_dotenv()
clickhouse_host = os.getenv("CLICKHOUSE_HOST")
username = os.getenv("CLICKHOUSE_USER")
password = os.getenv("CLICKHOUSE_PASSWORD")

client = clickhouse_connect.get_client(host=clickhouse_host, port=8123, username=username, password=password)


def execute_search_projects(project_ids, limit):
    sql_search_projects = """
    WITH
        -- 获取仓库在指定时间段内的活跃开发者
        active_developers AS (
            SELECT DISTINCT actor_id, repo_id, repo_name
            FROM opensource.events
            WHERE repo_id IN (%s)
            AND created_at >= '2023-10-01'
            AND created_at < '2024-10-01'
            AND (type IN ('IssuesEvent', 'PullRequestEvent', 'IssueCommentEvent', 'PullRequestReviewEvent','PullRequestReviewCommentEvent'))
        ),
        -- 计算其他仓库中的活跃开发者
        repo_activity AS (
            SELECT repo_id, repo_name, COUNT(DISTINCT actor_id) AS active_count
            FROM opensource.events
            WHERE actor_id IN (SELECT actor_id FROM active_developers)
            AND created_at >= '2023-10-01'
            AND created_at < '2024-10-01'
            AND repo_id NOT IN (%s)
            AND (type IN ('IssuesEvent', 'PullRequestEvent', 'IssueCommentEvent','PullRequestReviewEvent', 'PullRequestReviewCommentEvent'))
            GROUP BY repo_id, repo_name
        )
        -- 获取关联度最高的 x 个仓库
        SELECT repo_id, repo_name, active_count
        FROM repo_activity
        ORDER BY active_count DESC
        LIMIT %s
        """
    formatted_query = sql_search_projects % (', '.join(f"'{id}'" for id in project_ids), ', '.join(f"'{id}'" for id in project_ids), limit)
    results = client.query(formatted_query)
    return results


def execute_query_relations(repo_id1, repo_id2):
    sql_query_relations = """
        -- 计算两个仓库之间的共同开发者数量
        WITH
            -- 获取第一个仓库在指定时间段内的活跃开发者
            active_developers_1 AS (
                SELECT DISTINCT actor_id
                FROM opensource.events
                WHERE repo_id = %s
                AND created_at >= '2024-01-01'
                AND created_at < '2024-11-01'
                AND (type IN ('IssuesEvent', 'PullRequestEvent', 'IssueCommentEvent','PullRequestReviewEvent','PullRequestReviewCommentEvent'))
            ),
            -- 获取第二个仓库在指定时间段内的活跃开发者
            active_developers_2 AS (
                SELECT DISTINCT actor_id
                FROM opensource.events
                WHERE repo_id = %s
                AND created_at >= '2024-01-01'
                AND created_at < '2024-11-01'
                AND (type IN ('IssuesEvent', 'PullRequestEvent', 'IssueCommentEvent', 'PullRequestReviewEvent', 'PullRequestReviewCommentEvent'))
            )
        -- 计算共同开发者数量
        SELECT COUNT(DISTINCT a.actor_id) AS common_developer_count
        FROM active_developers_1 a
        JOIN active_developers_2 b ON a.actor_id = b.actor_id
        """
    formatted_query = sql_query_relations % (f"'{repo_id1}'", f"'{repo_id2}'")
    results = client.query(formatted_query)
    return results

def execute_nodes_openrank(repo_id):
    sql_nodes_openrank = """
        -- 查询仓库的 openrank 均值
        SELECT repo_id, avg(openrank) AS average_openrank
        FROM opensource.global_openrank
        WHERE repo_id = %s
        AND platform = 'GitHub'
        AND created_at >= '2024-01-01'
        AND created_at < '2024-11-01'
        GROUP BY repo_id
    """
    formatted_query = sql_nodes_openrank % (f"'{repo_id}'")
    results = client.query(formatted_query)
    return results

def execute_query_projects_name(repo_id):
    sql_query_project_name = """
        -- 根据 repo_id 查询最新的 repo_name
        SELECT repo_id, repo_name
        FROM opensource.events
        WHERE repo_id IN (%s)
        ORDER BY created_at DESC
        LIMIT 1
        """
    formatted_query = sql_query_project_name % (f"'{repo_id}'")
    results = client.query(formatted_query)
    return results

def get_repo_ids(results):
    return list(set(result[0] for result in results))

# seed_projects
first_projects= set()
for project_id in seed_projects:
    results = execute_search_projects([project_id], 10)
    for row in results.result_rows:
        first_projects.add (row[0])
first_projects = list(first_projects)

second_projects= set()
for project_id in first_projects:
    results = execute_search_projects([project_id], 5)
    for row in results.result_rows:
        second_projects.add (row[0])
second_projects = list(second_projects)

final_projects = {}
for repo_id in second_projects:
    project_names = execute_query_projects_name(repo_id)
    if project_names :
        final_projects[repo_id] = {"name":project_names.result_rows[0][1],"openrank":None}

for repo_id in list(final_projects.keys()):
    openrank = execute_nodes_openrank(repo_id)
    if openrank:
        average_openrank = int(openrank.result_rows[0][1])
        if average_openrank >=40:
            final_projects[repo_id]["openrank"] = average_openrank
        else:
            del final_projects[repo_id]

nodes = []
for repo_id, info in final_projects.items():
    nodes.append([info["name"], info["openrank"]])

edges = []
for key1, key2 in itertools.combinations(final_projects.keys(), 2):
    project1 = final_projects[key1]['name']
    project2 = final_projects[key2]['name']

    query_result = execute_query_relations(key1, key2)
    value = query_result.result_rows[0][0]
    edges.append([project1, project2, value])

filtered_edges = [edge for edge in edges if edge[2] >= 20]

print(final_projects)
print(len(nodes),len(filtered_edges))

graph = {
    "nodes": nodes,
    "edges": filtered_edges
}

# 保存到 graph.json 文件中
with open('graph.json', 'w') as json_file:
    json.dump(graph, json_file, indent=4)

if __name__ == "__main__":
  seed_projects = ['158256479','182849188','76474200'] #apache/iceberg, delta-io/delta, apache/hudi

  # Your main function code here
  pass
