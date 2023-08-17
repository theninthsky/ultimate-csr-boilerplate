import 'utils/disable-speedy'

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import 'styles'
import 'utils/delay-page-visibility'
import 'utils/service-worker-registration'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
