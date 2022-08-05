// React 18   // Strict method will not work for useEffect because it will run twice.

import { createRoot } from "react-dom/client";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />)


// Before React 18 Version

// import React from 'react';
// import ReactDOM from 'react-dom';

// import App from './App';

// ReactDOM.render(<App />, document.getElementById('root'));