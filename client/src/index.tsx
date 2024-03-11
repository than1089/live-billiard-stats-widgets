import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { FirstShot, Logo, Break, Stats, Offense, Defense } from './widgets';

const router = createBrowserRouter([
  {
    path: '/:table',
    children: [
      {
        path: "stats",
        element: <Stats />,
      },
      {
        path: "break",
        element: <Break />,
      },
      {
        path: "offense",
        element: <Offense />,
      },
      {
        path: "defense",
        element: <Defense />,
      },
      {
        path: "first-shot",
        element: <FirstShot />,
      },
      {
        path: "logo",
        element: <Logo />,
      },
    ]
  },

]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
