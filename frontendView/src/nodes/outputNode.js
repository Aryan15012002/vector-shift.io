// outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './utils/BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const handles = [
    {
      id: `${id}-value`,
      type: 'target',
      position: Position.Left,
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
        <select value={outputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </div>
  );

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Output"
      nodeType="output"
      content={content}
      handles={handles}
      styling={{ minWidth: '200px' }}
    />
  );
}
