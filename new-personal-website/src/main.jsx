import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from 'react-router-dom'
import App from './App.jsx'
import Test from './pages/Test.jsx'
import './index.css'
import RootLayout from './components/RootLayout.jsx'

const redirector = async () => {
  return redirect('/home');
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        loader: redirector,
      },
      {
        path: 'home',
        element: <App />,
      }
    ],
  },
  {
    path: '/test',
    element: <Test />
  },
  {
    path: '*',
    loader: redirector,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
