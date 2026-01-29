// BaseNode.js - Base component for all nodes with common styling and functionality

import React from 'react';
import { Handle } from 'reactflow';
import { useStore } from '../../store';
import '../../styles/variables.css';
import '../../styles/forms.css';
import '../../styles/nodes-enhanced.css';

/**
 * BaseNode provides a reusable foundation for all node types
 * - Manages styling and layout
 * - Handles node title and content rendering
 * - Manages handles (input/output ports)
 * 
 * @param {string} id - Node ID
 * @param {object} data - Node data
 * @param {string} title - Node title to display
 * @param {string} nodeType - Node type for styling (e.g., 'input', 'output', 'text')
 * @param {JSX} content - Content to render in the node body
 * @param {array} handles - Array of handle configs: {id, type, position, label?, style?, offset?}
 * @param {object} styling - Custom styling for the node container
 * @param {object} nodeData - Additional data passed to the node
 */
export const BaseNode = ({ 
  id, 
  data,
  title,
  nodeType = 'default',
  content, 
  handles = [], 
  styling = {},
  nodeData = {}
}) => {

  const deleteNode = useStore((state) => state.deleteNode);

  const handleDelete = () => {
    deleteNode(id);
  };

  const nodeClass = `node-${nodeType}`;
  const defaultStyle = {
    padding: '0',
    borderRadius: '13px',
    border: '4px solid #101011ee',
    backgroundColor: '#f8f9fa',
    minWidth: '180px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    fontSize: '12px',
    fontFamily: 'sans-serif',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    ...styling
  };

  return (
    <div style={defaultStyle} className={`base-node node-container ${nodeClass}`}>
      {/* Header Section */}
      <div className="node-header">
        <button
          onClick={handleDelete}
          className="node-delete-btn"
          title="Delete node"
          aria-label="Delete node"
        >
          ✕
        </button>

        {title && (
          <div className="node-title">
            {title}
          </div>
        )}
      </div>
      
      {/* Content Section */}
      <div className="node-content-wrapper">
        {content}
      </div>

      {/* Handles Section */}
      <div className="node-handles-section">
        {handles.map((handle, idx) => (
          <Handle
            key={`${id}-${handle.id || idx}`}
            type={handle.type}
            position={handle.position}
            id={handle.id || `${id}-handle-${idx}`}
            style={handle.style}
            label={handle.label}
          />
        ))}
      </div>
    </div>
  );
};

export default BaseNode;
