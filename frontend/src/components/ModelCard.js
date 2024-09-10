import React from 'react';

function ModelCard({ modelName, description, onRun }) {
  return (
    <div className="model-card">
      <h3>{modelName}</h3>
      <p>{description}</p>
      <button onClick={onRun}>Run Model</button>
    </div>
  );
}

export default ModelCard;
