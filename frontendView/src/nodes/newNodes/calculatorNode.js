// calculatorNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from '../utils/BaseNode';

export const CalculatorNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  const handles = [
    {
      id: `${id}-input1`,
      type: 'target',
      position: Position.Left,
      style: { top: '30%' }
    },
    {
      id: `${id}-input2`,
      type: 'target',
      position: Position.Left,
      style: { top: '70%' }
    },
    {
      id: `${id}-result`,
      type: 'source',
      position: Position.Right,
    }
  ];

  const content = (
    <div className="flex-col gap-sm">
      <label className="form-group">
        <div>Operation:</div>
        <select 
          value={operation} 
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (-)</option>
          <option value="multiply">Multiply (*)</option>
          <option value="divide">Divide (/)</option>
        </select>
      </label>
    </div>
  );

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Calculator"
      nodeType="calculator"
      content={content}
      handles={handles}
      styling={{ minWidth: '200px' }}
    />
  );
}
