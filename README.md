# Santo Domingo Responde
Plataforma web y móvil para la gestión y seguimiento de reclamos ciudadanos (OIRS).

![Logo Municipalidad de Santo Domingo](public/img/logo.png)

---

## Integrantes y Distribución de Responsabilidades

| Integrante | Rol y Responsabilidades |
| :--- | :--- |
| **Felipe Bechan** | Frontend, diseño de componentes y pantallas en Figma y desarrollo. |
| **Giovani Faúndez** | Documentación técnica, frontend y pantallas en Figma. |
| **Vicente Rodríguez** | Frontend y pantallas en Figma. |
| **Tomás Olivares** | Frontend y pantallas en Figma. |

---

## Índice
1. [Justificación del problema](#1-justificación-del-problema)
2. [Objetivos del Proyecto](#2-objetivos-del-proyecto)
3. [Usuarios objetivo y Roles](#3-usuarios-objetivo-y-roles)
   * [Usuarios objetivo](#usuarios-objetivo)
   * [Roles del Sistema](#roles-del-sistema)
   * [Definición de conceptos](#definición-de-conceptos)
   * [Proto-personas](#proto-personas)
4. [Requerimientos](#4-requerimientos)
   * [Requerimientos Funcionales por Rol](#requerimientos-funcionales-por-rol)
   * [Funcionalidades Transversales](#funcionalidades-transversales)
   * [Requerimientos No Funcionales](#requerimientos-no-funcionales)
5. [Arquitectura de la Información / UX](#5-arquitectura-de-la-información--ux)
   * [1. Rutas principales y secundarias](#1-rutas-principales-y-secundarias)
   * [2. Relaciones jerárquicas entre vistas](#2-relaciones-jerárquicas-entre-vistas)
   * [3. Diferenciación de acceso según roles](#3-diferenciación-de-acceso-según-roles)
   * [4. Flujos de Tareas (Task Flows)](#4-flujos-de-tareas-task-flows)
   * [5. Puntos críticos de interacción](#5-puntos-críticos-de-interacción)
   * [6. Justificación Técnica](#6-justificación-técnica)
6. [Bocetos UX/UI](#6-bocetos-uxui)
7. [Tecnologías y Librerías Utilizadas](#7-tecnologías-y-librerías-utilizadas)
8. [Instalación y Ejecución](#8-instalación-y-ejecución)

---

## 1. Justificación del problema

**Santo Domingo Responde** es una plataforma web y móvil para la Oficina de Informaciones, Reclamos y Sugerencias (OIRS) de la Municipalidad de Santo Domingo. Permite a los vecinos ingresar solicitudes, reclamos y sugerencias con fotos y ubicación, entregando un número de folio único para conocer el estado del trámite en tiempo real. Al mismo tiempo, permite a los funcionarios derivar requerimientos a las direcciones correspondientes (Obras, Aseo y Ornato, Tránsito, etc.) y controlar los plazos de respuesta.

En la gestión comunal, la falta de canales claros y los tiempos de espera prolongados generan desconfianza en los vecinos. Además, según la **Ley Nº 18.695 (Orgánica Constitucional de Municipalidades)** y la Ordenanza OIRS, los municipios deben responder formalmente en un plazo máximo de **20 días corridos**. Actualmente muchas gestiones se hacen en papel o planillas dispersas, lo que provoca demoras y pérdida de solicitudes. La plataforma busca resolver este problema centralizando los trámites de forma simple y accesible para cualquier vecino.

---

## 2. Objetivos del Proyecto

### Objetivo General
Desarrollar una plataforma web y móvil accesible para la gestión, derivación y seguimiento transparente de reclamos y solicitudes ciudadanas en la Municipalidad de Santo Domingo.

### Objetivos Específicos
* Diseñar prototipos accesibles en Figma adaptados a las necesidades de vecinos y funcionarios.
* Implementar el frontend responsivo utilizando React y componentes de Ionic Framework.
* Incorporar trazabilidad mediante folios únicos y control visual del plazo legal de 20 días.

---

## 3. Usuarios objetivo y Roles

La plataforma considera principalmente dos grupos de usuarios de interacción directa: **Ciudadanos** y **Funcionarios Municipales**, complementados por un rol de **Administrador** del sistema.

### Usuarios objetivo

#### Ciudadanos y Vecinos
Corresponden a los principales beneficiarios de la plataforma. Este grupo está integrado por personas que residen, trabajan o transitan por la comuna y que necesitan manifestar problemas, solicitudes o inquietudes sobre su entorno.
Dentro de este grupo pueden existir personas que:
* Disponen de escaso tiempo para trámites presenciales y prefieren gestionar requerimientos desde su smartphone;
* Necesitan reportar incidentes urbanos en la vía pública georreferenciando el lugar y adjuntando fotografías;
* Requieren conocer de manera continua y transparente el avance de su solicitud sin depender de visitas presenciales a la municipalidad;
* Presentan menor familiaridad con herramientas digitales (adultos mayores o personas en situación de brecha digital) y requieren pasos simples, tipografía legible y lenguaje directo;
* Exigen certeza respecto a la recepción de su requerimiento mediante un comprobante formal (folio único).

#### Funcionarios Municipales
Corresponden al equipo operativo y administrativo encargado de la atención ciudadana y la resolución de incidentes en el territorio comunal.
Dentro de este grupo se encuentran:
* Encargados de la oficina OIRS y secretaría municipal, responsables de recepcionar, clasificar y derivar los requerimientos a las unidades técnicas pertinentes;
* Directores y jefaturas de unidades técnicas (Dirección de Obras Municipales, Tránsito, Aseo y Ornato, Seguridad Ciudadana, etc.) que deben evacuar informes técnicos y proyectos de respuesta dentro de los plazos legales;
* Funcionarios que requieren monitorear vencimientos de plazos para evitar faltas administrativas.

### Roles del Sistema
* **Ciudadano:** Usuario que ingresa presentaciones (consultas, sugerencias) o reclamaciones (reclamos, denuncias), adjunta antecedentes, geolocaliza incidentes y consulta el avance de sus requerimientos.
* **Funcionario OIRS / Gestor Municipal:** Usuario encargado de admitir a trámite, clasificar, derivar requerimientos a las direcciones correspondientes, redactar oficios de respuesta y registrar el estado de resolución.
* **Administrador:** Usuario responsable de la administración técnica global de la plataforma, control de cuentas, asignación de unidades municipales y supervisión de indicadores de cumplimiento y auditoría.

### Definición de conceptos
* **Rol:** Define qué puede hacer y qué funciones tiene permitidas un usuario dentro del sistema informático y su seguridad.
* **Proto-persona:** Describe quién podría ser ese usuario, sus características sociodemográficas, motivaciones, metas, dificultades cotidianas y contexto real de uso.

### Proto-personas

#### Proto-persona 1: Ciudadana activa con interacción móvil autónoma
* **Nombre ficticio:** Camila
* **Tipo de usuario o rol:** Ciudadano
* **Características generales:** Joven profesional de 28 años que reside en la comuna. Utiliza permanentemente su teléfono móvil para resolver actividades diarias. Dispone de poco tiempo libre y prefiere canales de atención digitales e inmediatos para interactuar con los servicios públicos.
* **Necesidades principales:**
  * Ingresar requerimientos de forma rápida (menos de 2 minutos).
  * Adjuntar fotografías del problema y ubicación GPS desde su teléfono.
  * Disponer de un número de folio para dar seguimiento sin trasladarse al municipio.
  * Recibir notificaciones en su correo ante cada cambio de estado de su solicitud.
* **Objetivos de uso:** Contribuir al mejoramiento de la infraestructura de su barrio y obtener respuestas oportunas y transparentes por parte de la autoridad local.
* **Dificultades o puntos de frustración:**
  * Formularios extensos que exigen datos redundantes.
  * Falta de información sobre qué unidad municipal tiene a cargo su requerimiento.
  * Sitios web no adaptados a pantallas móviles.
* **Funcionalidades de la aplicación que utilizaría:** Formulario de ingreso de reclamos, captura de cámara y ubicación, consulta rápida por folio y notificaciones de estado.
* **Dispositivo y contexto probable de acceso:** Smartphone (iOS/Android) durante trayectos cotidianos por la vía pública o desde su hogar.

#### Proto-persona 2: Vecino adulto mayor con requerimiento de claridad y accesibilidad
* **Nombre ficticio:** Don Mario
* **Tipo de usuario o rol:** Ciudadano
* **Características generales:** Jubilado de 68 años, vecino histórico de la comuna. Posee conocimientos digitales básicos y utiliza el computador principalmente en su hogar para gestiones esenciales. En ocasiones acude de forma presencial o realiza llamadas a la oficina OIRS del municipio.
* **Necesidades principales:**
  * Interfaces sencillas, con letras de tamaño legible y alto contraste visual.
  * Lenguaje claro y libre de tecnicismos jurídicos o administrativos excesivos.
  * Mecanismo directo para verificar el estado de su trámite ingresando solo su folio o RUT.
* **Objetivos de uso:** Reportar situaciones de aseo, arbolado urbano o ruidos molestos en su pasaje y verificar que la municipalidad cumpla con el plazo de respuesta.
* **Dificultades o puntos de frustración:**
  * Menús complejos o pasos ocultos de navegación.
  * Mensajes de error incomprensibles.
  * Sensación de incertidumbre o pérdida de la solicitud por fallas de conexión.
* **Funcionalidades de la aplicación que utilizaría:** Módulo de consulta pública por folio, vista de estado en letra grande y comprobante descargable en PDF.
* **Dispositivo y contexto probable de acceso:** Computador de escritorio en su domicilio o teléfono móvil con la asistencia de un familiar.

#### Proto-persona 3: Funcionario municipal gestor de expedientes OIRS
* **Nombre ficticio:** Carlos
* **Tipo de usuario o rol:** Funcionario
* **Características generales:** Funcionario administrativo de 42 años de la Oficina OIRS Municipal. Cuenta con experiencia en atención al público y manejo de sistemas de gestión documental. Recibe requerimientos desde múltiples vías (web, ventanilla presencial y vía telefónica) y debe canalizarlos a las direcciones pertinentes.
* **Necesidades principales:**
  * Bandeja de entrada centralizada con filtros avanzados por unidad técnica, fecha y estado.
  * Alerta visual preventiva del plazo legal de 20 días corridos para evitar faltas al principio de celeridad.
  * Herramienta ágil para derivar el caso a otras direcciones (Obras, Tránsito, Medioambiente) y adjuntar antecedentes técnicos.
* **Objetivos de uso:** Gestionar con eficacia el flujo de requerimientos vecinales, coordinar respuestas interdepartamentales y dar cumplimiento oportuno a las exigencias normativas de la LOCM.
* **Dificultades o puntos de frustración:**
  * Solicitudes repetidas o con descripciones imprecisas.
  * Demora de las unidades técnicas externas en evacuar informes.
  * Sistemas lentos o con procesos de guardado engorrosos.
* **Funcionalidades de la aplicación que utilizaría:** Panel general de gestión, derivación interdepartamental, semáforo de plazos legales, carga de informes y emisión de oficios de respuesta formal.
* **Dispositivo y contexto probable de acceso:** Computador de escritorio en su puesto de trabajo municipal durante la jornada laboral.

---

## 4. Requerimientos

Un requerimiento funcional (RF) describe qué debe hacer el sistema, representando las funcionalidades, servicios y acciones que la plataforma debe proporcionar a los distintos roles.

### Requerimientos Funcionales por Rol
| ID | Requerimiento funcional | Rol |
| :--- | :--- | :--- |
| **RF-01** | El sistema deberá permitir al ciudadano ingresar una presentación o reclamo clasificándolo por tipo (consulta, sugerencia, reclamo o denuncia), temática, descripción detallada, ubicación geográfica y archivos de respaldo. | Ciudadano |
| **RF-02** | El sistema deberá generar y asignar automáticamente un número de folio único e irrepetible para cada requerimiento ingresado, permitiendo su trazabilidad pública y autenticada. | Ciudadano |
| **RF-03** | El sistema deberá permitir al ciudadano consultar el estado y avance de sus solicitudes mediante su cuenta o a través del módulo de consulta por folio. | Ciudadano |
| **RF-04** | El sistema deberá permitir al funcionario OIRS visualizar la bandeja general de requerimientos, filtrando por estado, categoría, fecha de ingreso y plazo restante de respuesta. | Funcionario |
| **RF-05** | El sistema deberá permitir al funcionario derivar el requerimiento a la unidad técnica correspondiente (Obras, Tránsito, Aseo, etc.) y registrar observaciones internas. | Funcionario |
| **RF-06** | El sistema deberá permitir al funcionario redactar y registrar la respuesta formal al ciudadano, adjuntar informes técnicos y cambiar el estado del requerimiento a "Respondido / Cerrado". | Funcionario |
| **RF-07** | El sistema deberá permitir al administrador gestionar cuentas de usuarios, configurar los departamentos municipales y consultar métricas globales de tiempos de respuesta. | Administrador |

### Funcionalidades Transversales
Las siguientes funcionalidades son necesarias para el funcionamiento general de la plataforma, pero complementan los requerimientos funcionales principales del dominio:
* **FT-01:** El sistema deberá permitir el registro de nuevos usuarios en la plataforma.
* **FT-02:** El sistema deberá permitir a los usuarios iniciar sesión mediante sus credenciales.
* **FT-03:** El sistema deberá permitir cerrar una sesión activa de forma segura.
* **FT-04:** El sistema deberá restringir las funcionalidades y vistas disponibles de acuerdo con el rol del usuario autenticado.

### Requerimientos No Funcionales

Los requerimientos no funcionales establecen las condiciones de calidad, rendimiento, accesibilidad y seguridad que debe satisfacer la plataforma:

#### UX y Usabilidad
* **RNF-UX-01 — Diseño adaptable:** La interfaz deberá adaptarse responsive a dispositivos móviles, tablets y computadores de escritorio, manteniendo accesibles todas las funciones principales.
* **RNF-UX-02 — Navegación consistente:** La aplicación deberá mantener patrones de navegación uniformes y predecibles en todas sus vistas.
* **RNF-UX-03 — Reducción de carga cognitiva:** Los formularios deberán segmentarse de manera progresiva y clara, evitando saturar al usuario con campos innecesarios.
* **RNF-UX-04 — Retroalimentación al usuario:** Todas las acciones del usuario deberán contar con retroalimentación visual inmediata (confirmaciones, indicadores de carga y alertas de error).

#### Accesibilidad
* **RNF-ACC-01 — Claridad del contenido:** Los textos e instrucciones deberán expresarse en un lenguaje ciudadano directo y accesible, facilitando su comprensión por personas de todas las edades.
* **RNF-ACC-02 — Jerarquía visual:** Las pantallas deberán mantener una jerarquía visual estructurada, con contrastes de color adecuados y tamaños de texto legibles.

#### Seguridad y Privacidad
* **RNF-SEG-01 — Protección de contraseñas:** Las contraseñas deberán almacenarse en la base de datos utilizando mecanismos seguros de derivación criptográfica (hash bcrypt) y nunca en texto plano.
* **RNF-SEG-02 — Autenticación y control de acceso por roles:** Las rutas protegidas deberán verificar la identidad y permisos del usuario antes de desplegar información reservada.
* **RNF-SEG-03 — Privacidad de datos personales:** Los datos de contacto del ciudadano deberán resguardarse bajo confidencialidad en cumplimiento de la Ley Nº 19.628 y el Art. 47 de la Ordenanza Municipal.

#### Rendimiento, Compatibilidad y Escalabilidad
* **RNF-01: Tiempo de respuesta:** Las operaciones de consulta y guardado deberán ejecutarse en tiempos promedio inferiores a 2 segundos en condiciones estándar de conectividad.
* **RNF-02: Compatibilidad:** La plataforma deberá funcionar de manera consistente en las versiones actuales de Google Chrome, Mozilla Firefox, Microsoft Edge y Safari.
* **RNF-03: Escalabilidad:** La arquitectura modular deberá permitir incorporar nuevas dependencias municipales o un incremento en el volumen de reclamos sin afectar el rendimiento global.

---

## 5. Arquitectura de la Información / UX

### 1. Rutas principales y secundarias

La aplicación considera rutas públicas y rutas protegidas según el perfil autenticado.

#### Rutas públicas
| Ruta | Vista | Descripción |
| :--- | :--- | :--- |
| `/login` | Inicio de sesión | Permite al usuario ingresar a la plataforma con sus credenciales. |
| `/registro` | Registro de usuario | Permite crear una nueva cuenta ciudadana ingresando datos de identificación. |
| `/consulta-folio` | Consulta pública | Permite verificar el estado de un reclamo mediante el código de folio y RUT. |

#### Rutas protegidas del Ciudadano
| Ruta | Vista | Descripción |
| :--- | :--- | :--- |
| `/ciudadano/inicio` | Inicio Ciudadano | Despliega resumen de trámites activos y accesos directos principales. |
| `/ciudadano/reclamos/nuevo` | Nuevo Requerimiento | Formulario estructurado para registrar una solicitud o reclamo con fotos y ubicación. |
| `/ciudadano/mis-solicitudes` | Mis Solicitudes | Pantalla de seguimiento y listado completo de trámites y reclamos ingresados por el vecino, con visualización de folio, fecha, tipo y estado actual. |
| `/ciudadano/reclamos/:id` | Detalle del Requerimiento | Muestra la trazabilidad, unidad asignada, plazos de respuesta y resolución final. |
| `/ciudadano/perfil` | Perfil de Usuario | Consulta y actualización de datos de contacto y preferencias de notificación. |

#### Rutas protegidas del Funcionario
| Ruta | Vista | Descripción |
| :--- | :--- | :--- |
| `/funcionario/inicio` | Panel de Control OIRS | Resumen operativo, indicadores diarios y alertas de plazos por vencer. |
| `/funcionario/bandeja` | Bandeja de Reclamos | Listado completo de requerimientos con filtros por estado, unidad y fecha. |
| `/funcionario/reclamos/:id/atender` | Gestión de Solicitud | Interfaz para derivar internamente, adjuntar informes técnicos y responder formalmente. |

#### Rutas protegidas del Administrador
| Ruta | Vista | Descripción |
| :--- | :--- | :--- |
| `/admin/inicio` | Inicio Administrador | Panel de control general con estadísticas comunales y tiempos de respuesta. |
| `/admin/usuarios` | Gestión de Usuarios | Administración y asignación de roles para funcionarios municipales. |
| `/admin/configuracion` | Parámetros del Sistema | Catálogo de direcciones municipales y tipologías de reclamos. |

---

### 2. Relaciones jerárquicas entre vistas

La aplicación organiza su navegación de forma jerárquica, separando el dominio público del acceso protegido:

```text
Aplicación OIRS
│
├── Rutas públicas
│   ├── Login
│   ├── Registro
│   └── Consulta pública por folio
│
└── Rutas protegidas
    │
    ├── Ciudadano
    │   ├── Inicio
    │   ├── Nuevo Requerimiento (Ingreso)
    │   ├── Mis Solicitudes (Historial y Seguimiento)
    │   │   └── Detalle y Seguimiento de Reclamo
    │   └── Perfil de Usuario
    │
    ├── Funcionario
    │   ├── Inicio / Resumen de Alertas
    │   └── Bandeja de Reclamos
    │       ├── Detalle y Derivación Interna
    │       └── Emisión de Respuesta Oficial
    │
    └── Administrador
        ├── Inicio / Métricas Globales
        ├── Gestión de Usuarios y Roles
        └── Parámetros del Sistema
```

---

### 3. Diferenciación de acceso según roles

La plataforma controla el acceso a las vistas de acuerdo con el perfil del usuario autenticado, asegurando que cada rol utilice exclusivamente las herramientas pertinentes a sus funciones.

#### Matriz de acceso por rol
| Funcionalidad | Ciudadano | Funcionario | Administrador |
| :--- | :---: | :---: | :---: |
| Ingresar nuevo requerimiento / reclamo | ✓ | — | — |
| Consultar estado por código de folio | ✓ | ✓ | ✓ |
| Visualizar historial de requerimientos propios | ✓ | — | — |
| Visualizar bandeja general de requerimientos municipales | — | ✓ | ✓ |
| Derivar requerimientos a direcciones técnicas | — | ✓ | — |
| Cargar informes técnicos y redactar respuesta oficial | — | ✓ | — |
| Monitorear semáforo de plazos legales (20 días corridos) | — | ✓ | ✓ |
| Crear y administrar cuentas de funcionarios | — | — | ✓ |
| Configurar unidades municipales y parámetros del sistema | — | — | ✓ |

#### Acceso del Ciudadano
El ciudadano tiene acceso a los módulos orientados a la interacción vecinal y seguimiento de trámites.
* **Podrá:** Completar el formulario de reclamo, adjuntar fotografías y geolocalización, consultar el avance de sus presentaciones y actualizar su información de contacto.
* **El ciudadano no podrá:** Acceder a bandejas internas de funcionarios, revisar requerimientos de terceros ni alterar datos del sistema.

#### Acceso del Funcionario
El funcionario tiene acceso a las herramientas de gestión operativa y resolución de trámites.
* **Podrá:** Revisar solicitudes, derivar expedientes a dependencias técnicas, registrar informes internos y emitir respuestas oficiales.
* **El funcionario no podrá:** Modificar la configuración global de la plataforma ni administrar roles de otros usuarios.

#### Acceso del Administrador
El administrador es el responsable técnico de la configuración y supervisión general.
* **Podrá:** Crear usuarios municipales, asignar roles y direcciones técnicas, y monitorear métricas globales de gestión y cumplimiento de plazos.
* **El administrador no tendrá como función:** La atención directa ni la redacción técnica de respuestas a requerimientos vecinales.

#### Control de acceso a rutas
```text
/login
/registro
/consulta-folio

/ciudadano/inicio
/ciudadano/reclamos/nuevo
/ciudadano/mis-solicitudes
/ciudadano/reclamos/:id
/ciudadano/perfil

/funcionario/inicio
/funcionario/bandeja
/funcionario/reclamos/:id/atender

/admin/inicio
/admin/usuarios
/admin/configuracion
```

---

### 4. Flujos de Tareas (Task Flows)

Los flujos de tareas representan la secuencia de pasos e interacciones que realiza un usuario para completar una actividad determinada. Para este proyecto se definen dos flujos principales:

#### Task Flow 1: Ingreso de requerimiento y consulta de estado
* **Rol:** Ciudadano
* **Objetivo:** Registrar una nueva solicitud o reclamo con antecedentes y obtener el comprobante con código de folio para su seguimiento.

```text
Inicio de sesión o acceso como vecino
        ↓
Inicio del ciudadano
        ↓
Seleccionar "Nuevo Requerimiento"
        ↓
Ingresar tipo (reclamo, consulta, sugerencia) y temática
        ↓
Describir situación y adjuntar ubicación/evidencia
        ↓
Revisar resumen de la solicitud
        ↓
¿Datos completos y válidos?
        ↓                       ↓
       No                       Sí
        ↓                       ↓
Mostrar alertas          Registrar solicitud
de validación                   ↓
                         Generar código de folio único
                                ↓
                         Mostrar pantalla de confirmación con folio
                                ↓
                         Redirigir a "Mis Solicitudes" con estado "Enviado"
```

#### Task Flow 2: Gestión, derivación y respuesta oficial de requerimiento
* **Rol:** Funcionario
* **Objetivo:** Evaluar un requerimiento asignado, canalizarlo a la dirección técnica correspondiente y redactar la respuesta oficial dentro del plazo legal.

```text
Inicio de sesión del funcionario
        ↓
Panel de control OIRS
        ↓
Acceder a "Bandeja de Reclamos"
        ↓
Filtrar por reclamos pendientes / próximos a vencer (plazo 20 días)
        ↓
Seleccionar requerimiento a gestionar
        ↓
Revisar antecedentes y evidencias del ciudadano
        ↓
¿Corresponde a su unidad técnica?
        ↓                               ↓
       No                               Sí
        ↓                               ↓
Derivar a unidad competente      Elaborar informe técnico / respuesta
        ↓                               ↓
Actualizar estado a "Derivado"   ¿Requiere prórroga legal (10 días)?
                                        ↓                 ↓
                                       Sí                 No
                                        ↓                 ↓
                               Registrar prórroga   Redactar respuesta
                               y notificar vecino          ↓
                                                    Cambiar a "Resuelto"
                                                           ↓
                                                    Notificar al ciudadano
```

---

### 5. Puntos críticos de interacción

Los puntos críticos de interacción corresponden a aquellos momentos del sistema en los que una interfaz ambigua, una validación deficiente o una falla de navegación pueden afectar significativamente la experiencia del usuario o el cumplimiento normativo:

1. **Autenticación y direccionamiento seguro según rol:** El sistema deberá validar de forma estricta las credenciales y redirigir inmediatamente a la vista autorizada de cada rol, bloqueando cualquier intento de manipulación manual de rutas URL.
2. **Carga y compresión de evidencias fotográficas en móviles:** Al subir imágenes desde la cámara o galería de un dispositivo móvil, el proceso no debe bloquear la interfaz ni fallar ante conexiones lentas. Se requerirá compresión previa y retroalimentación mediante barra de progreso.
3. **Generación y resguardo del código de folio único:** Al finalizar el envío de un reclamo, la pantalla de confirmación debe exhibir claramente el folio asignado y permitir su copiado o descarga inmediata, enviando además un respaldo por correo para evitar la pérdida del número de trámite.
4. **Alerta y control de plazos legales de respuesta (20 días corridos):** La bandeja del funcionario debe advertir de forma notoria la proximidad del vencimiento del plazo legal estipulado en la Ordenanza OIRS (semáforo visual: verde > 10 días, amarillo entre 5 y 10 días, rojo < 5 días), asegurando que no se incurra en retrasos injustificados.
5. **Claridad del estado del trámite para el ciudadano:** Las fases del expediente deben presentarse con lenguaje pedagógico y visual (ej. *Ingresado → En revisión técnica → En ejecución de solución → Respuesta emitida*), eliminando abreviaturas burocráticas confusas.
6. **Consistencia de interacción entre versión web y móvil:** La experiencia de registro y consulta debe mantener los mismos pasos, botones y etiquetas tanto si el vecino interactúa desde un teléfono en la calle como si lo hace desde un computador en su hogar.

---

### 6. Justificación Técnica

La arquitectura de navegación fue concebida considerando criterios de **usabilidad, eficiencia de interacción, claridad estructural y escalabilidad**:

#### Usabilidad
Se ofrece una navegación limpia, intuitiva y predecible. Para el ciudadano se minimiza el esfuerzo de digitación a través de formularios guiados paso a paso con ayuda visual. Para el funcionario se disponen tableros con filtrado inmediato y clasificación cromática de urgencias.

#### Eficiencia de interacción
Las funcionalidades de mayor frecuencia (ingresar reclamo y consultar folio) son accesibles en no más de 2 clics desde la vista principal. Además, la persistencia de datos del perfil evita que el vecino deba reingresar sus datos de identificación en cada trámite.

#### Claridad estructural
La jerarquía de navegación delimita de manera nítida el entorno público del entorno protegido, evitando confusiones y garantizando que los procesos internos de gestión municipal queden debidamente resguardados.

---

## 6. Bocetos UI/UX

[Figma - Prototipo de UI/UX (Municipalidad Santo Domingo)](https://www.figma.com/design/JikLataPUhoOYYd2Q8mXPN/Municipalidad---Ingenier%C3%ADa-Web-y-M%C3%B3vil?node-id=51-907&t=W8P07MjhLURe7epO-1)

---

## 7. Tecnologías y Librerías Utilizadas

### Estilos
- CSS3 (estilos modulares por vista y variables de Ionic)

### Librerías principales

| Librería | Propósito |
| :--- | :--- |
| `react` | Construcción de la interfaz mediante componentes. |
| `react-dom` | Renderizado de los componentes React en el navegador. |
| `@ionic/react` | Proporciona los componentes de interfaz de Ionic (`IonPage`, `IonContent`, `IonButton`, `IonInput`, `IonCard`, entre otros). |
| `@ionic/react-router` | Integración de la navegación de Ionic con React Router. |
| `react-router-dom` | Definición y gestión de rutas entre las diferentes vistas de la aplicación. |
| `ionicons` | Biblioteca oficial de iconos utilizada por Ionic. |

### Tecnologías
- **Ionic Framework** (@ionic/react v9)
- **React** (v19)
- **JavaScript (JSX)**
- **Vite**
- **Capacitor** (para plugins nativos, si aplica)

---

## 8. Instalación y Ejecución

### Requisitos previos
- Node.js (v18 o superior)
- Git

### Pasos para ejecutar el proyecto localmente

```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>

# 2. Entrar a la carpeta del proyecto
cd "web practica"

# 3. Instalar dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npm run dev
```

La aplicación quedará disponible en el navegador en: **`http://localhost:5173/`**
