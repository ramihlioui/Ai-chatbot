// src/App.tsx or any other component
import React from 'react';
import { Chatbot } from './chatbot';

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Your app content */}
      <Chatbot 
        config={{
          apiUrl: 'http://localhost:8000/ask',
          welcomeMessage: 'Welcome! How can I assist you today?'
        }}
      />
    </div>
  );
}

export default App;