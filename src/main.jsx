import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import './index.css'
import App from './App'
import HomePage from './pages/HomePage'
import ChannelsPage from './pages/ChannelsPage'
import ZappingPage from './pages/ZappingPage'
import SearchPage from './pages/SearchPage'
import TitlePage from './pages/TitlePage'
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
      {path: "busca/:termo", element: <SearchPage/>},
      {path: "titulo/:tipo/:id", element: <TitlePage/>},
      {path: "*", element: <PageNotFound/>}
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
