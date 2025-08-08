# Data Analysis Environment Setup

This directory contains various data analysis scripts and notebooks for the ant-ospo-insights project.

## Environment Setup

### Prerequisites

- Python 3.6 or higher
- pip (Python package installer)
- virtualenv or conda (recommended for environment isolation)

### Setting Up a Virtual Environment

It's recommended to use a virtual environment to avoid conflicts with other Python projects.

#### Using virtualenv

```bash
# Install virtualenv if you don't have it
pip install virtualenv

# Create a virtual environment
virtualenv venv

# Activate the virtual environment
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

#### Using conda

```bash
# Create a conda environment
conda create -n ospo-insights python=3.9

# Activate the conda environment
conda activate ospo-insights
```

### Installing Dependencies

All required Python packages are listed in the `requirements.txt` file. To install them, run:

```bash
pip install -r requirements.txt
```

### Environment Variables

Some scripts require environment variables to be set for database connections and API access. Create a `.env` file in the `data_analysis` directory with the following variables:

```
CLICKHOUSE_HOST=your_clickhouse_host
CLICKHOUSE_USER=your_clickhouse_username
CLICKHOUSE_PASSWORD=your_clickhouse_password
GITHUB_TOKEN=your_github_token
HF_TOKEN=your_huggingface_token  # If needed
```

## Running the Analysis

After setting up your environment and installing dependencies, you can run the Jupyter notebooks or Python scripts in this directory.

```bash
# For Jupyter notebooks
jupyter notebook

# For Python scripts
python analysis_by_insights/graph_construction.py
```
