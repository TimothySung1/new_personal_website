import ReactDOM from 'react-dom/client'
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from 'react-router-dom'
import App from './App.jsx'
import Test from './pages/Test.jsx'
import './index.css'
import RootLayout from './components/RootLayout.jsx'
import About from './pages/About.jsx'
import Projects from './pages/Projects.jsx'
import Hobbies from './pages/Hobbies.jsx'
import ContactMe from './pages/ContactMe.jsx'

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
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'projects',
        element: <Projects />
      },
      {
        path: 'hobbies',
        element: <Hobbies />
      },
      {
        path: 'contact-me',
        element: <ContactMe />
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
