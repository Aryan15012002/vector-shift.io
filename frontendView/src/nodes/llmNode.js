// llmNode.js

import { Position } from 'reactflow';
import BaseNode from './utils/BaseNode';

export const LLMNode = ({ id, data }) => {
  const handles = [
    {
      id: `${id}-system`,
      type: 'target',
      position: Position.Left,
      style: { top: `${100/3}%` }
    },
    {
      id: `${id}-prompt`,
      type: 'target',
      position: Position.Left,
      style: { top: `${200/3}%` }
    },
    {
      id: `${id}-response`,
      type: 'source',
      position: Position.Right,
    }
  ];

  const content = (
    <div>
      <p className="text-xs text-neutral-600">
        Language Model for text generation
      </p>
    </div>
  );

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="LLM"
      nodeType="llm"
      content={content}
      handles={handles}
      styling={{ minWidth: '200px' }}
    />
  );
}
