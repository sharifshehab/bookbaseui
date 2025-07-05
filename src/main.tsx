import  { StrictMode, type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './routes/Routes.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { HeadProvider } from 'react-head';

const headTags: ReactElement[] = []; 
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <HeadProvider headTags={headTags}>
        <RouterProvider router={router}></RouterProvider>
      </HeadProvider>
    </Provider>
  </StrictMode>
)
