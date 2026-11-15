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

const UN_MB = 1024 * 1024;
// mismo limite que revisa el backend
const MAXIMO_BASE64 = 1000000;

// El reclamo a medio escribir se guarda en el navegador, asi si el vecino
// cierra la pestaña por error no pierde lo que llevaba. La foto no se guarda
// porque en base64 llena el espacio que da el navegador.
const BORRADOR = 'borrador-reclamo';

const FORMULARIO_VACIO = { tipo: '', direccion: '', descripcion: '', terminos: false };

function leerBorrador() {
  try {
    const guardado = localStorage.getItem(BORRADOR);
    return guardado ? { ...FORMULARIO_VACIO, ...JSON.parse(guardado) } : FORMULARIO_VACIO;
  } catch {
    return FORMULARIO_VACIO;
  }
}

const IngresoReclamo = () => {
  const router = useIonRouter();
  const [formulario, setFormulario] = useState(leerBorrador);
  const [huboBorrador] = useState(() => Boolean(localStorage.getItem(BORRADOR)));

  const [presentToast] = useIonToast();

  // sugerencias de direcciones que vienen de OpenStreetMap
  const [sugerencias, setSugerencias] = useState([]);
  const [buscando, setBuscando] = useState(false);
  const [direccionElegida, setDireccionElegida] = useState(false);

  // aparte del formulario para que la respuesta del GPS no pise lo que se escribio mientras tanto
  const [foto, setFoto] = useState('');
  const [errorFoto, setErrorFoto] = useState('');
  const [ubicacion, setUbicacion] = useState(null);
  const [obteniendoUbicacion, setObteniendoUbicacion] = useState(false);
  const [errorUbicacion, setErrorUbicacion] = useState('');

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

  // cada vez que cambia algo, se guarda el borrador
  useEffect(() => {
    const tieneAlgo = formulario.tipo || formulario.direccion || formulario.descripcion;
    if (tieneAlgo) {
      localStorage.setItem(BORRADOR, JSON.stringify(formulario));
    } else {
      localStorage.removeItem(BORRADOR);
    }
  }, [formulario]);

  const descartarBorrador = () => {
    localStorage.removeItem(BORRADOR);
    setFormulario(FORMULARIO_VACIO);
  };

  const manejarCambio = (campo, valor) => {
    setFormulario({
      ...formulario,
      [campo]: valor
    });
  };

  const elegirFoto = (e) => {
    const archivo = e.target.files[0];
    // limpiamos el input para poder volver a elegir la misma imagen
    e.target.value = '';
    if (!archivo) return;

    if (archivo.size > UN_MB) {
      setErrorFoto('La imagen pesa más de 1 MB. Elige una más liviana.');
      return;
    }

    const lector = new FileReader();
    lector.onload = () => {
      // en base64 la imagen crece, asi que revisamos el largo final
      if (lector.result.length > MAXIMO_BASE64) {
        setErrorFoto('La imagen es muy grande. Elige una más liviana.');
        return;
      }
      setFoto(lector.result);
      setErrorFoto('');
    };
    lector.onerror = () => {
      setErrorFoto('No se pudo leer la imagen. Intenta con otra.');
    };
    lector.readAsDataURL(archivo);
  };

  const quitarFoto = () => {
    setFoto('');
    setErrorFoto('');
  };

  const usarMiUbicacion = () => {
    if (!navigator.geolocation) {
      setErrorUbicacion('Tu navegador no permite obtener la ubicación. Puedes escribir la dirección a mano.');
      return;
    }

    setObteniendoUbicacion(true);
    setErrorUbicacion('');

    navigator.geolocation.getCurrentPosition(
      (posicion) => {
        setUbicacion({
          latitud: Number(posicion.coords.latitude.toFixed(6)),
          longitud: Number(posicion.coords.longitude.toFixed(6))
        });
        setObteniendoUbicacion(false);
      },
      (problema) => {
        if (problema.code === problema.PERMISSION_DENIED) {
          setErrorUbicacion('No diste permiso para usar tu ubicación. Puedes escribir la dirección a mano.');
        } else {
          setErrorUbicacion('No pudimos obtener tu ubicación. Puedes escribir la dirección a mano.');
        }
        setObteniendoUbicacion(false);
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  const borrarUbicacion = () => {
    setUbicacion(null);
    setErrorUbicacion('');
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
        tipo: TIPOS[formulario.tipo] || formulario.tipo,
        foto: foto || null,
        latitud: ubicacion ? ubicacion.latitud : null,
        longitud: ubicacion ? ubicacion.longitud : null
      });

      presentToast({
        message: `Reclamo enviado. Tu folio es ${solicitud.folio}`,
        duration: 3000,
        color: 'success',
        icon: 'checkmark-circle-outline'
      });

      localStorage.removeItem(BORRADOR);
      setFormulario(FORMULARIO_VACIO);
      setFoto('');
      setUbicacion(null);

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

        {huboBorrador && (
          <div className="aviso-borrador">
            <span>Recuperamos lo que habías escrito antes.</span>
            <button type="button" onClick={descartarBorrador}>Empezar de nuevo</button>
          </div>
        )}

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

            <div className="bloque-ubicacion">
              {ubicacion ? (
                <div className="ubicacion-tomada">
                  <span>
                    Ubicación: {ubicacion.latitud}, {ubicacion.longitud}
                  </span>
                  <button type="button" className="boton-secundario" onClick={borrarUbicacion}>
                    Borrar ubicación
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="boton-secundario"
                  onClick={usarMiUbicacion}
                  disabled={obteniendoUbicacion}
                >
                  {obteniendoUbicacion ? 'Obteniendo...' : 'Usar mi ubicación'}
                </button>
              )}
              {errorUbicacion && <p className="mensaje-error">{errorUbicacion}</p>}
            </div>
          </div>

          <div className="campo-contenedor">
            <label className="etiqueta-campo" htmlFor="foto-reclamo">Foto (opcional)</label>
            {foto ? (
              <div className="vista-previa">
                <img src={foto} alt="Vista previa de la foto" />
                <button type="button" className="boton-secundario" onClick={quitarFoto}>
                  Quitar foto
                </button>
              </div>
            ) : (
              <input
                id="foto-reclamo"
                type="file"
                accept="image/*"
                className="input-foto"
                onChange={elegirFoto}
              />
            )}
            {errorFoto && <p className="mensaje-error">{errorFoto}</p>}
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