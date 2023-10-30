import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ThemeProvider } from '@material-tailwind/react' /* importing necessary modules from react, app,jsx, index.css, material-tailwind/react */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider> 
  </React.StrictMode>
);
