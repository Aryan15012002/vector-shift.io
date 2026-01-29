// inputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './utils/BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const handles = [
    {
      id: `${id}-value`,
      type: 'source',
      position: Position.Right,
    }
  ];

  const content = (
    <div className="flex-col gap-sm">
      <label className="form-group">
        <div>Name:</div>
        <input 
          type="text" 
          value={currName} 
          onChange={handleNameChange}
        />
      </label>
      <label className="form-group">
        <div>Type:</div>
        <select value={inputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </div>
  );

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Input"
      nodeType="input"
      content={content}
      handles={handles}
      styling={{ minWidth: '200px' }}
    />
  );
}
