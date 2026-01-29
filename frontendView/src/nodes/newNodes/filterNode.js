// filterNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from '../utils/BaseNode';

export const FilterNode = ({ id, data }) => {
  const [filterType, setFilterType] = useState(data?.filterType || 'contains');

  const handles = [
    {
      id: `${id}-input`,
      type: 'target',
      position: Position.Left,
    },
    {
      id: `${id}-filtered`,
      type: 'source',
      position: Position.Right,
      style: { top: '40%' }
    },
    {
      id: `${id}-rejected`,
      type: 'source',
      position: Position.Right,
      style: { top: '60%' }
    }
  ];

  const content = (
    <div className="flex-col gap-sm">
      <label className="form-group">
        <div>Filter Type:</div>
        <select 
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="contains">Contains</option>
          <option value="startswith">Starts With</option>
          <option value="endswith">Ends With</option>
          <option value="regex">Regex</option>
        </select>
      </label>
    </div>
  );

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Filter"
      nodeType="filter"
      content={content}
      handles={handles}
      styling={{ minWidth: '200px' }}
    />
  );
}
