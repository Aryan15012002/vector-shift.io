// emailNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from '../utils/BaseNode';

export const EmailNode = ({ id, data }) => {
  const [recipient, setRecipient] = useState(data?.recipient || 'user@example.com');

  const handles = [
    {
      id: `${id}-subject`,
      type: 'target',
      position: Position.Left,
      style: { top: '25%' }
    },
    {
      id: `${id}-body`,
      type: 'target',
      position: Position.Left,
      style: { top: '75%' }
    },
    {
      id: `${id}-status`,
      type: 'source',
      position: Position.Right,
    }
  ];

  const content = (
    <div className="flex-col gap-sm">
      <label className="form-group">
        <div>Recipient:</div>
        <input 
          type="text" 
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="email@example.com"
        />
      </label>
      <div className="text-xs text-neutral-600 mt-md">
        Email delivery node
      </div>
    </div>
  );

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Email"
      nodeType="email"
      content={content}
      handles={handles}
      styling={{ minWidth: '200px' }}
    />
  );
}
