import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import About from './Components/About/About.jsx';
import Home from './Components/Home/Home.jsx';
import Contact from './Components/Contact/Contact.jsx';
import LogIn from './Components/LogIn/LogIn.jsx';
import Register from './Components/Register/Register.jsx';
import AuthProvider from './AuthProvider/AuthProvider.jsx';
import Explore from './Components/Explore/Explore.jsx';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import AllTask from './Dashboard/AllTask/AllTask.jsx';
import Priority from './Dashboard/Priority/Priority.jsx';
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'login',
        element: <LogIn />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'explore',
        element: <PrivateRoute><Explore /></PrivateRoute>,
      },
    ],
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
    children: [
      {
        path: 'alltask',
        element: <AllTask />,
      },
      {
        path: 'priority',
        element: <Priority />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>

  </React.StrictMode>,
);
