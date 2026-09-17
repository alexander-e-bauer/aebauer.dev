import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { init } from '@plausible-analytics/tracker'
import App from './App.tsx'
//import App from './OldApp.tsx'

init({ domain: 'aebauer.dev', fileDownloads: true, outboundLinks: true })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
