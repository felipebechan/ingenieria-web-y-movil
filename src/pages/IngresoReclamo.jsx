import React, { useEffect, useState } from 'react'; 
import { 
  IonItem, IonLabel, IonInput, IonTextarea, 
  IonSelect, IonSelectOption, IonButton, IonCheckbox,
  useIonToast 
} from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import AppLayout from '../components/AppLayout';
import TerminosLink from '../components/TerminosLink';
import { crearSolicitud, buscarDirecciones } from '../services/solicitudesService';

import './IngresoReclamo.css';

// para guardar el tipo con el nombre que se ve en las tablas
const TIPOS = {
  alumbrado: 'Alumbrado',
  basura: 'Aseo y limpieza',
  bache: 'Vialidad'
};

const IngresoReclamo = () => {
  const router = useIonRouter();
  const [formulario, setFormulario] = useState({
    tipo: '',
    direccion: '',
    descripcion: '',
    terminos: false
  });

  const [presentToast] = useIonToast();

  // sugerencias de direcciones que vienen de OpenStreetMap
  const [sugerencias, setSugerencias] = useState([]);
  const [buscando, setBuscando] = useState(false);
  const [direccionElegida, setDireccionElegida] = useState(false);

  // esperamos a que deje de escribir antes de consultar, para no mandar
  // una peticion por cada letra
  useEffect(() => {
    if (direccionElegida || formulario.direccion.trim().length < 4) {
      setSugerencias([]);
      return;
    }

    const espera = setTimeout(async () => {
      setBuscando(true);
      try {
        const { resultados } = await buscarDirecciones(formulario.direccion);
        setSugerencias(resultados);
      } catch {
        // si falla la busqueda no molestamos: igual puede escribirla a mano
        setSugerencias([]);
      } finally {
        setBuscando(false);
      }
    }, 600);

    return () => clearTimeout(espera);
  }, [formulario.direccion, direccionElegida]);

  const elegirDireccion = (direccion) => {
    manejarCambio('direccion', direccion);
    setDireccionElegida(true);
    setSugerencias([]);
  };

  const manejarCambio = (campo, valor) => {
    setFormulario({
      ...formulario,
      [campo]: valor
    });
  };

  const enviarReclamo = async () => {
    if (!formulario.tipo || !formulario.direccion || !formulario.descripcion || !formulario.terminos) {
      presentToast({
        message: 'Por favor, completa todos los campos y acepta los términos.',
        duration: 3000,
        color: 'danger'
      });
      return;
    }

    try {
      const solicitud = await crearSolicitud({
        ...formulario,
        tipo: TIPOS[formulario.tipo] || formulario.tipo
      });

      presentToast({
        message: `Reclamo enviado. Tu folio es ${solicitud.folio}`,
        duration: 3000,
        color: 'success',
        icon: 'checkmark-circle-outline'
      });

      setFormulario({ tipo: '', direccion: '', descripcion: '', terminos: false });

      // despues de enviar lo mandamos a ver el listado de sus solicitudes
      router.push('/mis-solicitudes');
    } catch (problema) {
      presentToast({
        message: problema.message,
        duration: 3000,
        color: 'danger'
      });
    }
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
                onIonInput={(e) => {
                  setDireccionElegida(false);
                  manejarCambio('direccion', e.detail.value);
                }}
              />
            </IonItem>

            {buscando && <p className="ayuda-direccion">Buscando direcciones...</p>}

            {sugerencias.length > 0 && (
              <ul className="sugerencias">
                {sugerencias.map((lugar) => (
                  <li key={lugar.direccion}>
                    <button type="button" onClick={() => elegirDireccion(lugar.direccion)}>
                      {lugar.direccion}
                    </button>
                  </li>
                ))}
              </ul>
            )}
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
              Acepto los <TerminosLink />
            </IonLabel>
          </div>

          <IonButton className="boton-enviar" onClick={enviarReclamo}>
            Enviar Reclamo
          </IonButton>

        </div>

        <div className="contenedor-imagen-fondo">
          <img src={import.meta.env.BASE_URL + "img/playa.png"} alt="Costa de Santo Domingo" className="imagen-costa" />
        </div>

      </div>
    </AppLayout>
  );
};

export default IngresoReclamo;