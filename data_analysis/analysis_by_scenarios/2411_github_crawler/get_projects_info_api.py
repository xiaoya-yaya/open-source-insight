# 通过 API 爬取项目信息

import requests
import csv
from datetime import datetime

# GitHub API URL for the Alipay organization repositories
url = "https://api.github.com/orgs/alipay/repos?per_page=100"

# Send a GET request to the GitHub API
response = requests.get(url)
repos = response.json()

# Define the CSV file name
csv_file = "alipay_repos.csv"

# Specify the CSV headers
csv_headers = [
    "id", "full_name", "description", "html_url",
    "forks_count", "stargazers_count", "created_at", "pushed_at"
]

# Helper function to format date to "YYYY/MM/DD"
def format_date(date_str):
    if date_str:
        return datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%SZ").strftime("%Y/%m/%d")
    return ""

# Write data to CSV file
with open(csv_file, mode='w', newline='', encoding='utf-8-sig') as file:
    writer = csv.DictWriter(file, fieldnames=csv_headers)
    writer.writeheader()

    # Iterate through each repository and write data to CSV
    for repo in repos:
        writer.writerow({
            "id": repo.get("id"),
            "full_name": repo.get("full_name"),
            "html_url": repo.get("html_url"),
            "description": repo.get("description"),
            "stargazers_count": repo.get("stargazers_count"),
            "forks_count": repo.get("forks_count"),
            "created_at": format_date(repo.get("created_at")),
            "pushed_at": format_date(repo.get("pushed_at"))
        })

print(f"Data saved to {csv_file}")
