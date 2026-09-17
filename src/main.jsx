import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import './index.css'
import App from './App'
import PageNotFound from './pages/PageNotFound'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <PageNotFound/>,
    children: [
      {path: "*", element: <PageNotFound/>}
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
