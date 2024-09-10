import React from 'react';
import ModelCard from '../components/ModelCard';

function Models() {
  const handleRunModel = () => {
    // Logic to call the backend API for the model
    console.log('Model is running...');
  };

  return (
    <div>
      <h1>Models</h1>
      <p>Here are the models I have trained:</p>
      <ModelCard
        modelName="Example Model"
        description="This is a brief description of the model."
        onRun={handleRunModel}
      />
      {/* Add more ModelCard components as needed */}
    </div>
  );
}

export default Models;
