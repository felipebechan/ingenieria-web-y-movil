import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// css que necesita ionic
import '@ionic/react/css/core.css'
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

import './theme/variables.css'

createRoot(document.getElementById('root')).render(<App />)
