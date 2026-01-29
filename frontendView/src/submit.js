// submit.js

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import './styles/alert.css';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [alertData, setAlertData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setAlertData(data);
    } catch (error) {
      console.error('Error submitting pipeline:', error);
      setAlertData({
        num_nodes: nodes.length,
        num_edges: edges.length,
        is_dag: false,
        error: 'Failed to connect to backend',
      });
    } finally {
      setLoading(false);
    }
  };

  const closeAlert = () => {
    setAlertData(null);
  };

  return (
    <>
      <div className="submit-button-container">
        <button className={loading ? 'loading' : ''} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Pipeline'}
        </button>
      </div>

      {alertData && (
        <div className="alert-overlay" onClick={closeAlert}>
          <div className="alert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="alert-title">
              ✓ Pipeline Analysis Complete
            </div>
            
            <div className="alert-content">
              Your pipeline has been analyzed successfully.
            </div>

            <div className="alert-stat">
              <span className="alert-stat-label">Number of Nodes:</span>
              <span className="alert-stat-value">{alertData.num_nodes}</span>
            </div>

            <div className="alert-stat">
              <span className="alert-stat-label">Number of Edges:</span>
              <span className="alert-stat-value">{alertData.num_edges}</span>
            </div>

            <div className={`alert-dag-status ${alertData.is_dag ? 'yes' : 'no'}`}>
              {alertData.is_dag ? '✓ Valid DAG (Directed Acyclic Graph)' : '✗ Not a Valid DAG (Contains Cycles)'}
            </div>

            {alertData.error && (
              <div className="alert-error">
                <span>⚠</span>
                <span>{alertData.error}</span>
              </div>
            )}

            <div className="alert-buttons">
              <button className="alert-close-btn" onClick={closeAlert}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
