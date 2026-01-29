// toolbar.js

import { DraggableNode } from './draggableNode';
import './styles/app.css';

export const PipelineToolbar = () => {

    return (
        <div className="pipeline-toolbar">
            <div className="toolbar-section">
                <div className="toolbar-section-title">Core Nodes</div>
                <div className="toolbar-buttons">
                    <DraggableNode type='customInput' label='Input' />
                    <DraggableNode type='llm' label='LLM' />
                    <DraggableNode type='customOutput' label='Output' />
                    <DraggableNode type='text' label='Text' />
                </div>
            </div>
            
            <div className="toolbar-section">
                <div className="toolbar-section-title">Processing Nodes</div>
                <div className="toolbar-buttons">
                    <DraggableNode type='calculator' label='Calculator' />
                    <DraggableNode type='conditional' label='Conditional' />
                    <DraggableNode type='filter' label='Filter' />
                </div>
            </div>

            <div className="toolbar-section">
                <div className="toolbar-section-title">Integration Nodes</div>
                <div className="toolbar-buttons">
                    <DraggableNode type='email' label='Email' />
                    <DraggableNode type='database' label='Database' />
                </div>
            </div>
        </div>
    );
};
