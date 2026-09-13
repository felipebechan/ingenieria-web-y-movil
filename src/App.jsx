import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

setupIonicReact()

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}

export default App
