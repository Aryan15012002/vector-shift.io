// databaseNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from '../utils/BaseNode';

export const DatabaseNode = ({ id, data }) => {
  const [dbType, setDbType] = useState(data?.dbType || 'postgres');
  const [query, setQuery] = useState(data?.query || 'SELECT * FROM table');

  const handles = [
    {
      id: `${id}-params`,
      type: 'target',
      position: Position.Left,
    },
    {
      id: `${id}-results`,
      type: 'source',
      position: Position.Right,
    }
  ];

  const content = (
    <div className="flex-col gap-sm">
      <label className="form-group">
        <div>Database:</div>
        <select 
          value={dbType} 
          onChange={(e) => setDbType(e.target.value)}
        >
          <option value="postgres">PostgreSQL</option>
          <option value="mysql">MySQL</option>
          <option value="mongodb">MongoDB</option>
          <option value="sqlite">SQLite</option>
        </select>
      </label>
      <label className="form-group">
        <div>Query:</div>
        <textarea 
          className="code-editor"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
    </div>
  );

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Database"
      nodeType="database"
      content={content}
      handles={handles}
      styling={{ minWidth: '240px' }}
    />
  );
}
