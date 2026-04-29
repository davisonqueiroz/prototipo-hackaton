import React from 'react';
import { createRoot } from 'react-dom/client';

import './tokens.css';
import './data.js';
import './design-canvas.jsx';
import './components.jsx';
import './screens.jsx';
import './app.jsx';

function Root() {
  const App = window.App;

  return (
    <div className="app-view">
      <App initialRoute="home" />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<Root />);
