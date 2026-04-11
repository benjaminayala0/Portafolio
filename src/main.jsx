import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.jsx'
import './app/index.css'

console.info(
    "%c⚙️ ¿Mirando bajo el capó? Me gusta tu estilo.\n%cHablemos de Arquitectura de Software: %cbenjamin.ayala.dev@gmail.com",
    "color: #ff7300ff; font-size: 16px; font-weight: bold; font-family: monospace; padding-top: 10px;",
    "color: #e2e8f0; font-size: 14px; font-family: sans-serif; padding-top: 5px;",
    "color: #3b82f6; font-size: 14px; font-weight: bold; font-family: monospace; text-decoration: underline;"
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
