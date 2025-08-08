import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className={styles.heroTitle}>
            Open Source Insight
          </Heading>
          <p className={styles.heroSubtitle}>
            Exploring the evolving landscape of open source ecosystems and technology innovation
          </p>
          <div className={styles.buttons}>
            <Link
              className={clsx("button button--lg", styles.exploreButton)}
              to="/landscape">
              Explore Insights
            </Link>
            <Link
              className={clsx("button button--lg", styles.landscapeButton)}
              href="https://antoss-landscape.my.canva.site/"
              target="_blank"
              rel="noopener noreferrer">
              Explore LLM Landscape
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Open Source Insight"
      description="Exploring the evolving landscape of open source ecosystems and technology innovation">
      <HomepageHeader />
      <div className={styles.featuresSection}>
        <div className="container">
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📊</div>
              <h3>Data-Driven Insights</h3>
              <p>Comprehensive analysis of open source trends, community dynamics, and ecosystem evolution</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔍</div>
              <h3>Technology Landscapes</h3>
              <p>Visualize and understand the relationships between emerging technologies and open source projects</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🌐</div>
              <h3>Global Perspective</h3>
              <p>Track worldwide development trends and collaborations across open source communities</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
