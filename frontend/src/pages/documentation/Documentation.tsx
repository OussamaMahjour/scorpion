import React from 'react';
import { HashLink } from 'react-router-hash-link';

const Documentation: React.FC = () => {
  const documentationStyles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    section: {
      margin: '40px 0',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as 'collapse',
      margin: '20px 0'
    },
    th: {
      backgroundColor: '#e9ecef',
      padding: '12px',
      textAlign: 'left' as 'left',
      border: '1px solid #dee2e6'
    },
    td: {
      padding: '12px',
      border: '1px solid #dee2e6'
    },
    code: {
      backgroundColor: '#f1f3f5',
      padding: '2px 4px',
      borderRadius: '4px',
      fontFamily: 'monospace'
    }
  };

  return (
    <div style={documentationStyles.container}>
      <h1>Scorpion ML Platform Documentation</h1>

      {/* Table of Contents */}
      <nav style={{ marginBottom: '40px' }}>
        <h2>Contents</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li><HashLink smooth to="#pipeline-config">Pipeline Configuration</HashLink></li>
          <li><HashLink smooth to="#dataset-config">Dataset Configuration</HashLink></li>
          <li><HashLink smooth to="#preprocessing">Preprocessing Steps</HashLink></li>
          <li><HashLink smooth to="#model-config">Model Configuration</HashLink></li>
          <li><HashLink smooth to="#evaluation">Evaluation Metrics</HashLink></li>
          <li><HashLink smooth to="#saving">Model Saving</HashLink></li>
        </ul>
      </nav>

      {/* Pipeline Configuration */}
      <section id="pipeline-config" style={documentationStyles.section}>
        <h2>Pipeline Configuration</h2>
        <pre style={documentationStyles.code}>
          {`<pipeline task="TASK_TYPE" library="ML_LIBRARY">`}
        </pre>
        
        <table style={documentationStyles.table}>
          <thead>
            <tr>
              <th style={documentationStyles.th}>Attribute</th>
              <th style={documentationStyles.th}>Allowed Values</th>
              <th style={documentationStyles.th}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={documentationStyles.td}><code>task</code></td>
              <td style={documentationStyles.td}>
                <ul>
                  <li>Regression</li>
                  <li>Classification</li>
                  <li>Clustering (beta)</li>
                </ul>
              </td>
              <td style={documentationStyles.td}>Type of machine learning task</td>
            </tr>
            <tr>
              <td style={documentationStyles.td}><code>library</code></td>
              <td style={documentationStyles.td}>
                <ul>
                  <li>tensorflow</li>
                  <li>pytorch</li>
                  <li>xgboost</li>
                  <li>lightgbm</li>
                  <li>catboost</li>
                  <li>sklearn</li>
                </ul>
              </td>
              <td style={documentationStyles.td}>ML framework/library</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Dataset Configuration */}
      <section id="dataset-config" style={documentationStyles.section}>
        <h2>Dataset Configuration</h2>
        <pre style={documentationStyles.code}>
          {`<dataset path="PATH" type="DATA_TYPE">...</dataset>`}
        </pre>

        <h3>Data Types</h3>
        <table style={documentationStyles.table}>
          <tbody>
            <tr>
              <td style={documentationStyles.td}><code>type</code></td>
              <td style={documentationStyles.td}>
                <ul>
                  <li>csv</li>
                  <li>excel</li>
                  <li>parquet</li>
                  <li>json</li>
                  <li>custom</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>

        <h3>Feature Types</h3>
        <table style={documentationStyles.table}>
          <tbody>
            <tr>
              <td style={documentationStyles.td}><code>type</code></td>
              <td style={documentationStyles.td}>
                <ul>
                  <li>int</li>
                  <li>float</li>
                  <li>category</li>
                  <li>timestamp</li>
                  <li>text</li>
                  <li>bool</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Preprocessing Steps */}
      <section id="preprocessing" style={documentationStyles.section}>
        <h2>Preprocessing Steps</h2>
        <table style={documentationStyles.table}>
          <thead>
            <tr>
              <th style={documentationStyles.th}>Step Type</th>
              <th style={documentationStyles.th}>Parameters</th>
              <th style={documentationStyles.th}>Allowed Values</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={documentationStyles.td}>imputation</td>
              <td style={documentationStyles.td}>strategy</td>
              <td style={documentationStyles.td}>
                <ul>
                  <li>mean</li>
                  <li>median</li>
                  <li>most_frequent</li>
                  <li>constant</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td style={documentationStyles.td}>scaling</td>
              <td style={documentationStyles.td}>method</td>
              <td style={documentationStyles.td}>
                <ul>
                  <li>standard</li>
                  <li>minmax</li>
                  <li>robust</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Model Configuration */}
      <section id="model-config" style={documentationStyles.section}>
        <h2>Model Configuration</h2>
        
        <h3>Hyperparameters</h3>
        <table style={documentationStyles.table}>
          <thead>
            <tr>
              <th style={documentationStyles.th}>Library</th>
              <th style={documentationStyles.th}>Parameters</th>
              <th style={documentationStyles.th}>Allowed Values</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={documentationStyles.td}>XGBoost</td>
              <td style={documentationStyles.td}>
                <ul>
                  <li>max_depth</li>
                  <li>learning_rate</li>
                  <li>n_estimators</li>
                </ul>
              </td>
              <td style={documentationStyles.td}>
                Numerical values<br/>
                e.g., <code>3-10</code> for max_depth
              </td>
            </tr>
            <tr>
              <td style={documentationStyles.td}>TensorFlow</td>
              <td style={documentationStyles.td}>
                <ul>
                  <li>epochs</li>
                  <li>batch_size</li>
                  <li>optimizer</li>
                </ul>
              </td>
              <td style={documentationStyles.td}>
                <ul>
                  <li>Adam</li>
                  <li>SGD</li>
                  <li>RMSprop</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Evaluation Metrics */}
      <section id="evaluation" style={documentationStyles.section}>
        <h2>Evaluation Metrics</h2>
        <table style={documentationStyles.table}>
          <tbody>
            <tr>
              <td style={documentationStyles.td}>Regression</td>
              <td style={documentationStyles.td}>
                <ul>
                  <li>mse</li>
                  <li>rmse</li>
                  <li>mae</li>
                  <li>r2</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td style={documentationStyles.td}>Classification</td>
              <td style={documentationStyles.td}>
                <ul>
                  <li>accuracy</li>
                  <li>f1</li>
                  <li>precision</li>
                  <li>recall</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Model Saving */}
      <section id="saving" style={documentationStyles.section}>
        <h2>Model Saving</h2>
        <table style={documentationStyles.table}>
          <thead>
            <tr>
              <th style={documentationStyles.th}>Format</th>
              <th style={documentationStyles.th}>Compatible Libraries</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={documentationStyles.td}>h5</td>
              <td style={documentationStyles.td}>TensorFlow/Keras</td>
            </tr>
            <tr>
              <td style={documentationStyles.td}>pytorch</td>
              <td style={documentationStyles.td}>PyTorch</td>
            </tr>
            <tr>
              <td style={documentationStyles.td}>onnx</td>
              <td style={documentationStyles.td}>Cross-platform</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Documentation;