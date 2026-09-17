import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import './index.css'
import App from './App'
import HomePage from './pages/HomePage'
import ChannelsPage from './pages/ChannelsPage'
import ZappingPage from './pages/ZappingPage'
import PageNotFound from './pages/PageNotFound'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <PageNotFound/>,
    children: [
      {index: true, element: <HomePage/>},
      {path: "canais", element: <ChannelsPage/>},
      {path: "canal/:providerId", element: <ZappingPage/>},
      {path: "*", element: <PageNotFound/>}
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
