import React, { useState } from 'react'; 
import { 
  IonItem, IonLabel, IonInput, IonTextarea, 
  IonSelect, IonSelectOption, IonButton, IonCheckbox,
  useIonToast 
} from '@ionic/react';
import AppLayout from '../components/AppLayout'; 
import './ingreso_reclamo.css';

const IngresoReclamo = () => {
  const [formulario, setFormulario] = useState({
    tipo: '',
    direccion: '',
    descripcion: '',
    terminos: false
  });

  const [presentToast] = useIonToast(); 

  const manejarCambio = (campo, valor) => {
    setFormulario({
      ...formulario,
      [campo]: valor
    });
  };

  const enviarReclamo = () => {
    if (!formulario.tipo || !formulario.direccion || !formulario.descripcion || !formulario.terminos) {
      presentToast({
        message: 'Por favor, completa todos los campos y acepta los términos.',
        duration: 3000,
        color: 'danger'
      });
      return;
    }

    console.log("Datos listos para enviar al backend:", formulario);

    presentToast({
      message: '¡Reclamo enviado con éxito!',
      duration: 3000,
      color: 'success',
      icon: 'checkmark-circle-outline'
    });

    setFormulario({ tipo: '', direccion: '', descripcion: '', terminos: false });
  };

  return (
    <AppLayout>
      <div className="ion-padding contenedor-relativo">
        
        <h1 className="titulo-principal">Ingresa tu reclamo:</h1>

        <div className="contenedor-formulario">
          
          <div className="campo-contenedor">
            <IonLabel className="etiqueta-campo">Tipo de solicitud</IonLabel>
            <IonItem lines="none" className="input-bordeado">
              <IonSelect 
                placeholder="Seleccione una opción" 
                interface="popover" 
                className="w-100"
                value={formulario.tipo}
                onIonChange={(e) => manejarCambio('tipo', e.detail.value)}
              >
                <IonSelectOption value="alumbrado">Poste de luz dañado</IonSelectOption>
                <IonSelectOption value="basura">Microbasural</IonSelectOption>
                <IonSelectOption value="bache">Bache en la calle</IonSelectOption>
              </IonSelect>
            </IonItem>
          </div>

          <div className="campo-contenedor">
            <IonLabel className="etiqueta-campo">Dirección o sector</IonLabel>
            <IonItem lines="none" className="input-bordeado">
              <IonInput 
                placeholder="Av. Arturo Phillips 158" 
                value={formulario.direccion}
                onIonInput={(e) => manejarCambio('direccion', e.detail.value)}
              />
            </IonItem>
          </div>

          <div className="campo-contenedor">
            <IonLabel className="etiqueta-campo">Descripción</IonLabel>
            <IonItem lines="none" className="input-bordeado">
              <IonTextarea 
                rows={5} 
                placeholder="Redacta el reclamo" 
                value={formulario.descripcion}
                onIonInput={(e) => manejarCambio('descripcion', e.detail.value)}
              />
            </IonItem>
          </div>

          <div className="terminos-contenedor">
            <IonCheckbox 
              slot="start" 
              color="primary" 
              checked={formulario.terminos}
              onIonChange={(e) => manejarCambio('terminos', e.detail.checked)}
            />
            <IonLabel className="texto-terminos">
              Acepto los <span className="link-azul">términos y condiciones.</span>
            </IonLabel>
          </div>

          <IonButton className="boton-enviar" onClick={enviarReclamo}>
            Enviar Reclamo
          </IonButton>

        </div>

        <div className="contenedor-imagen-fondo">
          <img src="/img/playa.png" alt="Costa de Santo Domingo" className="imagen-costa" />
        </div>

      </div>
    </AppLayout>
  );
};

export default IngresoReclamo;