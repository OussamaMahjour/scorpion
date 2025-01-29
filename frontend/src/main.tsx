import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from "./pages/home/Home"
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoadingBarContainer } from 'react-top-loading-bar'
import Editor from './pages/editor/Editor'

const router = createBrowserRouter([
  {
    path:"/",
    element: <Home />
  },
  {
    path:"editor",
    element:<Editor />
  }

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoadingBarContainer>
      <RouterProvider router={router}/>   
    </LoadingBarContainer>
  </StrictMode>,
)
