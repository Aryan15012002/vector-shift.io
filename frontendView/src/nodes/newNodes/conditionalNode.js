// conditionalNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from '../utils/BaseNode';

export const ConditionalNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'equals');

  const handles = [
    {
      id: `${id}-input`,
      type: 'target',
      position: Position.Left,
      style: { top: '25%' }
    },
    {
      id: `${id}-compare`,
      type: 'target',
      position: Position.Left,
      style: { top: '75%' }
    },
    {
      id: `${id}-true`,
      type: 'source',
      position: Position.Right,
      style: { top: '30%' }
    },
    {
      id: `${id}-false`,
      type: 'source',
      position: Position.Right,
      style: { top: '70%' }
    }
  ];

  const content = (
    <div className="flex-col gap-sm">
      <label className="form-group">
        <div>Condition:</div>
        <select 
          value={condition} 
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="equals">Equals (==)</option>
          <option value="notequals">Not Equals (!=)</option>
          <option value="greater">Greater (&gt;)</option>
          <option value="less">Less (&lt;)</option>
        </select>
      </label>
      <div className="text-xs text-neutral-600 mt-md">
        True/False outputs
      </div>
    </div>
  );

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Conditional"
      nodeType="conditional"
      content={content}
      handles={handles}
      styling={{ minWidth: '210px' }}
    />
  );
}
