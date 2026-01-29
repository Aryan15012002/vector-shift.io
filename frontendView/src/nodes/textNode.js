// textNode.js

import { useState, useMemo } from 'react';
import { Position } from 'reactflow';
import BaseNode from './utils/BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  // Parse variables from text (pattern: {{ variableName }})
  const variableHandles = useMemo(() => {
    const varRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [];
    let match;

    while ((match = varRegex.exec(currText)) !== null) {
      const varName = match[1];
      if (!matches.find(m => m === varName)) {
        matches.push(varName);
      }
    }

    return matches.map((varName, idx) => ({
      id: `${id}-var-${varName}`,
      type: 'target',
      position: Position.Left,
      style: { top: `${(idx + 1) * (100 / (matches.length + 2))}%` }
    }));
  }, [currText, id]);

  const handles = [
    {
      id: `${id}-output`,
      type: 'source',
      position: Position.Right,
    },
    ...variableHandles
  ];

  // Calculate dynamic width and height based on text content
  const getNodeDimensions = () => {
    const baseWidth = 200;
    const baseHeight = 100;
    const charsPerLine = 25;
    const lineHeight = 20;

    const lines = Math.ceil(currText.length / charsPerLine) || 1;
    const width = Math.max(baseWidth, Math.min(currText.split('\n').reduce((max, line) => Math.max(max, line.length), 0) * 8 + 40, 400));
    const height = Math.max(baseHeight, 80 + lines * lineHeight + variableHandles.length * 15);

    return { width, height };
  };

  const { width, height } = getNodeDimensions();

  const content = (
    <div className="flex-col gap-sm">
      <label className="form-group">
        <div>Text:</div>
        <textarea 
          className="code-editor"
          value={currText} 
          onChange={(e) => setCurrText(e.target.value)}
        />
      </label>
      {variableHandles.length > 0 && (
        <div className="node-variables-badge">
          <strong>Variables:</strong> {variableHandles.map(h => h.id.replace(`${id}-var-`, '')).join(', ')}
        </div>
      )}
    </div>
  );

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Text"
      nodeType="text"
      content={content}
      handles={handles}
      styling={{ 
        width: `100%`,
        height: `100%`,
        minWidth: '200px'
      }}
    />
  );
}
