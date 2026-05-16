export default {
  meta: {
    title: 'Rhize',
    description:
      'La política de privacidad de Rhize: qué recopilamos, qué no, y cómo el cifrado de extremo a extremo limita lo que siquiera podríamos ver.',
  },
  heading: 'Política de Privacidad',
  lastUpdatedLabel: 'Última actualización: ',
  lastUpdatedDate: '2026-05-15',
  lastUpdatedText: '15 de mayo de 2026',
  sections: [
    {
      heading: 'Acerca de esta política',
      paragraphs: [
        'Rhize es una aplicación social que prioriza la privacidad y que permite a las personas comunicarse de manera más auténtica a través de una capa social pública y una capa privada cifrada de extremo a extremo. Rhize está construido como un cliente de la red Bluesky / AT Protocol. Eso significa que parte de la actividad en Rhize ocurre en infraestructura social pública o de terceros que Rhize no posee ni controla.',
        'Esta Política de Privacidad explica qué información recopila Rhize, qué no recopilamos, cómo funciona el cifrado, cómo se maneja el contenido público de Bluesky / AT Protocol y qué opciones tienes.',
        'Rhize es operado por Denazen, Inc. Puedes contactarnos en privacy@denazen.com.',
      ],
    },
    {
      heading: '1. Nuestros compromisos de privacidad',
      paragraphs: [
        'Rhize está diseñado en torno a un principio simple: tu vida social privada no debería convertirse en nuestro modelo de negocio.',
      ],
      list: [
        { body: 'No vendemos tu información personal.' },
        { body: 'No usamos tu contenido privado para publicidad.' },
        { body: 'No podemos leer tus publicaciones privadas ni tus mensajes cifrados de extremo a extremo.' },
        { body: 'No construimos perfiles publicitarios a partir de tu actividad.' },
        {
          body: 'Recopilamos solo la información que razonablemente necesitamos para operar, asegurar, mejorar y dar soporte a la aplicación.',
        },
      ],
    },
    {
      heading: '2. Rhize y Bluesky / AT Protocol',
      paragraphs: [
        'Rhize es un cliente para Bluesky y el AT Protocol. Cuando usas Rhize para ver, crear, dar «me gusta», responder, repostear, seguir o interactuar de otra manera con contenido público de Bluesky / AT Protocol, esa actividad puede ser procesada, almacenada, moderada, mostrada, indexada o manejada de alguna otra forma por Bluesky, los servicios del AT Protocol, tu servidor de datos personal, los servicios AppView, los relays y otras infraestructuras de terceros.',
        'Rhize no controla las políticas de contenido público, las reglas de moderación, los registros del servidor, las prácticas de retención de datos, las reglas de cuenta ni la visibilidad a nivel de red de Bluesky.',
        'Las publicaciones públicas y las interacciones públicas deben tratarse como públicas. Incluso si usas Rhize para crearlas o verlas, la actividad pública de Bluesky / AT Protocol puede ser visible fuera de Rhize.',
      ],
    },
    {
      heading: '3. Contenido privado cifrado de extremo a extremo',
      paragraphs: [
        'Rhize incluye funciones privadas diseñadas para usar cifrado de extremo a extremo. Esto significa que el contenido de tus publicaciones privadas en Rhize, tus mensajes privados y otras comunicaciones privadas cifradas se cifra en tu dispositivo antes de almacenarse o transmitirse.',
        'Rhize no tiene las claves necesarias para leer tu contenido privado cifrado. Tu contraseña de cifrado se procesa solo en tu dispositivo y nunca se transmite a los servidores de Rhize de una forma que nos permita reconstruirla. La clave maestra que descifra tu contenido privado se almacena en nuestros servidores únicamente en una forma cifrada por una clave derivada de tu contraseña — sin tu contraseña, no podemos descifrarla.',
        'Por esto:',
      ],
      list: [
        { body: 'Rhize no puede leer tus publicaciones privadas ni tus mensajes cifrados.' },
        {
          body: 'Rhize no puede recuperar el contenido privado cifrado si pierdes el acceso a las claves o credenciales necesarias para descifrarlo. El restablecimiento de cuenta es destructivo — genera nuevas claves, y el contenido cifrado con las claves anteriores queda permanentemente ilegible.',
        },
        {
          body: 'Rhize no puede proporcionar copias en texto plano del contenido privado cifrado en respuesta a solicitudes de soporte, solicitudes de cumplimiento legal, ni ninguna otra solicitud.',
        },
        {
          body: 'Rhize no puede revisar el texto plano del contenido privado cifrado para fines de moderación. Para el contenido privado solo podemos actuar con base en reportes enviados por usuarios, capturas de pantalla proporcionadas voluntariamente, señales de abuso a nivel de cuenta y metadatos que no son contenido.',
        },
      ],
      trailingParagraphs: [
        'Cierta información de metadatos relacionada con el contenido cifrado es visible para Rhize, para la infraestructura de Bluesky / AT Protocol o para otros participantes de la red. Esto incluye: la existencia de una publicación o un mensaje, la marca de tiempo en que se creó, los identificadores de cuenta (DID y nombre de usuario) involucrados, las relaciones entre cuentas (seguimientos, conexiones de amistad), el tipo de registro y el texto cifrado y cualquier referencia a un blob cifrado asociado. Otros clientes en la red AT Protocol pueden observar los mismos metadatos públicos.',
        'El cifrado de extremo a extremo protege el contenido de las comunicaciones privadas. No hace que todos los metadatos sean invisibles.',
      ],
    },
    {
      heading: '4a. Información que recopilamos — Información de cuenta y perfil',
      paragraphs: [
        'Rhize está diseñado para recopilar la menor cantidad de información posible. Podemos procesar información asociada a tu cuenta de Bluesky / AT Protocol, como:',
      ],
      list: [
        { body: 'Tu nombre de usuario.' },
        { body: 'Tu identificador descentralizado (DID).' },
        { body: 'Tu nombre para mostrar.' },
        { body: 'Tu imagen de perfil.' },
        { body: 'La descripción pública de tu perfil.' },
        {
          body: 'Tus seguidos públicos, seguidores, publicaciones, respuestas, «me gusta», reposts y otra actividad pública del AT Protocol.',
        },
        { body: 'Tokens de autenticación o información de sesión necesarios para conectar tu cuenta con Rhize.' },
      ],
      trailingParagraphs: [
        'Parte de esta información es pública o está disponible a través de la infraestructura de Bluesky / AT Protocol. La usamos para brindar la experiencia de la aplicación.',
      ],
    },
    {
      heading: '4b. Información que recopilamos — Información de red privada',
      paragraphs: ['Para proveer las funciones privadas de Rhize, procesamos información limitada como:'],
      list: [
        { body: 'Tus relaciones de red privada en Rhize.' },
        { body: 'Membresía en círculos o relaciones de compartición.' },
        {
          body: 'Material clave cifrado (almacenado en tu servidor de datos personal del AT Protocol, cifrado con una clave derivada de tu contraseña).',
        },
        { body: 'Claves de contenido cifradas (almacenadas en tu servidor de datos personal del AT Protocol, cifradas).' },
        { body: 'Registros privados cifrados (almacenados en tu servidor de datos personal del AT Protocol, cifrados).' },
        {
          body: 'Mensajes privados cifrados (transmitidos a través de la infraestructura de bandeja de entrada cifrada de Rhize solo como texto cifrado).',
        },
        {
          body: 'Metadatos que no son contenido y que son necesarios para sincronizar, enrutar, mostrar, asegurar o gestionar las funciones privadas.',
        },
      ],
      trailingParagraphs: [
        'Rhize no tiene las claves necesarias para leer ninguno de estos materiales cifrados y no los usa para leer el contenido privado cifrado.',
      ],
    },
    {
      heading: '4c. Información que recopilamos — Información técnica y de diagnóstico',
      paragraphs: ['Recopilamos información técnica limitada para operar y mejorar Rhize, como:'],
      list: [
        { body: 'Versión de la aplicación.' },
        { body: 'Tipo de dispositivo.' },
        { body: 'Versión del sistema operativo.' },
        {
          body: 'Reportes de excepciones de JavaScript no manejadas (rastros de pila y mensajes de error, con los nombres de usuario, DIDs y URIs eliminados antes de la transmisión).',
        },
        { body: 'Diagnósticos de rendimiento y de tiempo (por ejemplo, duración del inicio de sesión, duración de carga del feed).' },
        {
          body: 'Eventos de error de función (por ejemplo, una publicación privada que falla al cifrarse, con un código de error acotado — no el contenido).',
        },
        { body: 'Marcas de tiempo aproximadas.' },
        { body: 'Metadatos de solicitud al servidor necesarios para operar el servicio.' },
      ],
      trailingParagraphs: [
        'Usamos esta información para corregir errores, prevenir abusos, mejorar la confiabilidad y entender si la aplicación está funcionando.',
      ],
    },
    {
      heading: '4d. Información que recopilamos — Analíticas mínimas',
      paragraphs: [
        'Rhize recopila analíticas anónimas y limitadas sobre el uso de la aplicación. Usamos PostHog como nuestro proveedor de analíticas, configurado de manera que:',
      ],
      list: [
        {
          body: 'Nunca se crean perfiles de usuario (sin identify, sin alias, con los perfiles anónimos de personas deshabilitados).',
        },
        { body: 'La geolocalización por IP está deshabilitada.' },
        { body: 'La repetición de sesión está deshabilitada.' },
        { body: 'La captura automática de vistas de pantalla y de toques está deshabilitada.' },
        {
          body: 'Un filtro elimina nombres de usuario, DIDs, URIs del AT Protocol y direcciones de correo electrónico de cada propiedad de evento y de cada mensaje de excepción antes de la transmisión.',
        },
      ],
      trailingParagraphs: [
        'Los eventos que enviamos incluyen, por ejemplo: si se completó el onboarding, si se canjeó un código de invitación, si la creación de cuenta o el inicio de sesión tuvieron éxito o fallaron, si se usan ciertas funciones, conteos agregados anónimos de acciones en la aplicación y tendencias de excepciones no manejadas.',
        'No usamos analíticas para leer contenido privado. No usamos analíticas para crear perfiles publicitarios. No vendemos datos de analíticas. No vinculamos los eventos de analíticas con tu nombre de usuario de Bluesky, tu DID ni ningún otro identificador personal.',
      ],
    },
    {
      heading: '4e. Información que recopilamos — Información de feedback y soporte',
      paragraphs: [
        'Si nos contactas, envías feedback, reportas un problema o participas en pruebas, podemos recopilar información que tú decidas proporcionar, como:',
      ],
      list: [
        { body: 'Tu dirección de correo electrónico.' },
        { body: 'Tu nombre o nombre de usuario.' },
        { body: 'Tu mensaje hacia nosotros.' },
        { body: 'Capturas de pantalla o registros que decidas enviar.' },
        { body: 'Información necesaria para investigar tu solicitud.' },
        { body: 'Versión de la aplicación e información del dispositivo relacionada con el problema.' },
      ],
      trailingParagraphs: [
        'Por favor, no nos envíes información personal sensible a menos que sea necesaria para tu solicitud.',
      ],
    },
    {
      heading: '4f. Información que recopilamos — Información de pago o suscripción',
      paragraphs: [
        'Si Rhize ofrece funciones de pago, suscripciones o compras dentro de la aplicación, los pagos pueden ser procesados por Apple, Google u otro proveedor de pagos. Rhize no recibe el número completo de tu tarjeta de pago de Apple ni de Google.',
        'Podemos recibir información limitada relacionada con la compra, como el estado de la suscripción, el producto adquirido, el estado de renovación, los identificadores de transacción y la información de derecho necesaria para proveer las funciones de pago.',
      ],
    },
    {
      heading: '5. Información que no recopilamos',
      paragraphs: ['Rhize no recopila:'],
      list: [
        { body: 'El contenido en texto plano de tus publicaciones privadas ni de tus mensajes cifrados de extremo a extremo.' },
        {
          body: 'Tu contraseña privada de cifrado ni tu secreto de recuperación en ninguna forma que Rhize pueda descifrar.',
        },
        {
          body: 'Ubicación GPS precisa (Rhize no solicita permisos de ubicación y no incluye ningún SDK de ubicación).',
        },
        {
          body: 'Tus contactos (Rhize no solicita permisos de contactos y no incluye ningún SDK de contactos).',
        },
        {
          body: 'Acceso a micrófono, vídeo o archivos arbitrarios (Rhize incluye solo un selector de imágenes, usado bajo demanda cuando eliges adjuntar una imagen a una publicación o a un mensaje de feedback).',
        },
        {
          body: 'Identificadores publicitarios para rastreo entre aplicaciones (Rhize no solicita el aviso de App Tracking Transparency de iOS y no incluye ningún SDK de publicidad ni de atribución).',
        },
        { body: 'Información personal sensible para publicidad.' },
        {
          body: 'Información biométrica (Rhize no usa Face ID, Touch ID ni ninguna API de autenticación biométrica; el código de acceso del dispositivo se usa únicamente a través del almacenamiento seguro estándar del sistema operativo).',
        },
      ],
      trailingParagraphs: [
        'Si una versión futura de Rhize añade una función que requiera permisos o datos adicionales, lo explicaremos en ese momento y actualizaremos esta política según sea necesario.',
      ],
    },
    {
      heading: '6. Cómo usamos la información',
      paragraphs: ['Usamos la información descrita arriba para:'],
      list: [
        { body: 'Proveer y operar Rhize.' },
        { body: 'Conectarnos con los servicios de Bluesky / AT Protocol.' },
        { body: 'Autenticar usuarios.' },
        { body: 'Mostrar contenido social público.' },
        { body: 'Habilitar funciones privadas cifradas de extremo a extremo.' },
        { body: 'Sincronizar contenido privado cifrado y metadatos.' },
        { body: 'Gestionar códigos de invitación, onboarding y acceso a cuentas.' },
        { body: 'Prevenir spam, abuso, fraude e incidentes de seguridad.' },
        { body: 'Depurar fallos y problemas de rendimiento.' },
        { body: 'Responder a solicitudes de soporte y a reportes de usuarios.' },
        { body: 'Mejorar la confiabilidad y la usabilidad de la aplicación.' },
        { body: 'Cumplir con obligaciones legales.' },
        { body: 'Hacer cumplir nuestros Términos de Servicio y nuestras reglas comunitarias.' },
      ],
      trailingParagraphs: ['No usamos tu contenido privado cifrado para publicidad ni para perfilado.'],
    },
    {
      heading: '7a. Cómo compartimos la información — Con la infraestructura de Bluesky / AT Protocol',
      paragraphs: [
        'Debido a que Rhize es un cliente de Bluesky / AT Protocol, la actividad pública de la cuenta y el contenido público pueden enviarse o recuperarse desde Bluesky, desde los servidores de datos personales del AT Protocol, desde los relays, desde los servicios AppView o desde infraestructura relacionada.',
        'Los registros privados cifrados también pueden almacenarse o transmitirse a través de la infraestructura del AT Protocol en forma cifrada. Rhize no controla cómo la infraestructura de terceros del AT Protocol registra, retiene, indexa o procesa los metadatos a nivel de red.',
      ],
    },
    {
      heading: '7b. Cómo compartimos la información — Con proveedores de servicios',
      paragraphs: [
        'Usamos proveedores de servicios para ayudar a operar Rhize. Estos proveedores tienen permitido procesar información solo según sea necesario para prestarnos sus servicios, sujetos a obligaciones apropiadas de confidencialidad y seguridad.',
        'Proveedores de servicios en producción actualmente:',
      ],
      list: [
        {
          label: 'Supabase:',
          body: ' almacena metadatos de cuenta, claves maestras cifradas (solo texto cifrado) y la bandeja de entrada cifrada que se usa para retransmitir mensajes de gestión de claves y mensajes directos cifrados. Supabase recibe únicamente texto cifrado y metadatos que no son contenido; no recibe contenido privado en texto plano ni claves sin cifrar.',
        },
        {
          label: 'PostHog:',
          body: ' analíticas anónimas de la aplicación y reportes de excepciones no manejadas, configurado para no identificar nunca a los usuarios, con la geolocalización por IP deshabilitada, la repetición de sesión deshabilitada y la captura automática de pantalla y de toques deshabilitada. PostHog no actúa como un proveedor separado de reportes de fallos; solo captura excepciones de JavaScript.',
        },
        {
          label: 'Apple App Store / TestFlight:',
          body: ' distribución y, si Rhize ofrece funciones de pago, procesamiento de compras dentro de la aplicación.',
        },
        {
          label: 'Google Play (si Rhize se publica para Android):',
          body: ' distribución y, si corresponde, procesamiento de compras dentro de la aplicación.',
        },
      ],
      trailingParagraphs: [
        'Las publicaciones públicas, las interacciones públicas y la identidad de la cuenta son manejadas por la infraestructura de Bluesky / AT Protocol (tu servidor de datos personal, los relays, los servicios AppView) — consulta la sección anterior.',
        'Rhize no usa actualmente un servicio separado de reporte de fallos (Sentry, Bugsnag, etc.), ni una plataforma de gestión de relaciones con clientes, ni un proveedor separado de envío de correo electrónico, ni un proveedor de hospedaje en la nube dedicado más allá de los listados, ni ningún SDK de publicidad o atribución.',
      ],
    },
    {
      heading: '7c. Cómo compartimos la información — Por razones legales, de seguridad o de protección',
      paragraphs: ['Podemos divulgar información si creemos que es razonablemente necesario para:'],
      list: [
        { body: 'Cumplir con la ley, con procesos legales o con solicitudes gubernamentales válidas.' },
        { body: 'Proteger los derechos, la seguridad y la protección de los usuarios, de Rhize o de terceros.' },
        { body: 'Investigar fraude, abuso, spam, incidentes de seguridad o violaciones de nuestros términos.' },
        { body: 'Protegernos frente a responsabilidad legal.' },
      ],
      trailingParagraphs: [
        'Debido a que Rhize no puede descifrar el contenido privado cifrado de extremo a extremo, es posible que no podamos proporcionar contenido privado en texto plano incluso si se solicita legalmente.',
      ],
    },
    {
      heading: '7d. Cómo compartimos la información — Transferencias de negocio',
      paragraphs: [
        'Si Rhize se ve involucrado en una fusión, adquisición, financiación, reorganización, bancarrota o venta de activos, la información puede transferirse como parte de esa transacción. Si eso ocurre, tomaremos medidas razonables para asegurar que esta política siga aplicándose o para que los usuarios reciban aviso de los cambios materiales.',
        'No vendemos tu información personal.',
      ],
    },
    {
      heading: '8. Contenido público y moderación',
      paragraphs: [
        'Rhize incluye contenido generado por los usuarios. El contenido público de Bluesky / AT Protocol está sujeto a las reglas de Bluesky, a la infraestructura del AT Protocol, a los servicios de moderación aplicables, a los sistemas de etiquetado y a los controles del usuario.',
        'Rhize provee las siguientes salvaguardas dentro de la aplicación:',
      ],
      list: [
        {
          label: 'Reportar.',
          body: ' Una acción de «Reportar» en cualquier publicación envía un reporte a la moderación de Bluesky / AT Protocol con una de varias categorías de motivo (spam, violación de las pautas comunitarias, contenido engañoso, contenido sexual no deseado, acoso u otro).',
        },
        {
          label: 'Bloquear.',
          body: ' Una acción de «Bloquear» impide que el usuario bloqueado interactúe con tu cuenta y se propaga a Bluesky / AT Protocol — tu bloqueo aplica en clientes compatibles del AT Protocol.',
        },
        {
          label: 'Silenciar.',
          body: ' Una acción de «Silenciar» oculta las publicaciones de un usuario en tu feed de Rhize. El silenciamiento de Rhize es actualmente local al dispositivo — no se propaga a tus otros dispositivos ni a otros clientes del AT Protocol.',
        },
        {
          label: 'Filtrado de contenido para adultos.',
          body: ' Las publicaciones etiquetadas por la moderación de Bluesky como contenido explícito (categorías que incluyen pornografía, desnudez, contenido sexual, contenido gráfico, violencia explícita y similares) siempre se ocultan en Rhize. Rhize no provee una opción para que el usuario anule estas categorías.',
        },
      ],
      trailingParagraphs: [
        'Debido a que Rhize es un cliente para infraestructura social pública de terceros, las acciones de moderación sobre el contenido público (incluyendo reportes, bloqueos y etiquetas) son procesadas por los servicios de Bluesky / AT Protocol y no directamente por Rhize.',
        'Para el contenido privado cifrado, Rhize no puede revisar el contenido subyacente porque no podemos leerlo. Aún así podemos actuar con base en reportes enviados por usuarios, capturas de pantalla proporcionadas voluntariamente, señales de abuso a nivel de cuenta y metadatos que no son contenido.',
        'Para reportar abuso, usa la acción «Reportar» dentro de la aplicación sobre la publicación o la cuenta correspondiente, o contáctanos en safety@denazen.com.',
      ],
    },
    {
      heading: '9. Niños y límites de edad',
      paragraphs: [
        'Rhize no está destinado a niños menores de 13 años. No recopilamos a sabiendas información personal de niños menores de 13 años.',
        'Rhize usa la creación de cuentas de Bluesky / AT Protocol para el registro. Bluesky aplica sus propios requisitos de verificación de edad durante la creación de la cuenta, y Rhize no recopila independientemente una fecha de nacimiento ni realiza una verificación de edad separada en el momento en que conectas tu cuenta con Rhize.',
        'Debido a que Rhize incluye funciones sociales y contenido generado por los usuarios, podemos requerir que los usuarios cumplan con una edad mínima más alta, como 16 o 18 años, dependiendo de decisiones de lanzamiento, jurisdicción, clasificación de la App Store y ley aplicable. Si una edad mínima más alta aplica a nivel de la clasificación de la App Store, se hace cumplir mediante el control de edad de la App Store al momento de instalación.',
        'Si crees que un niño nos ha proporcionado información personal, contáctanos en privacy@denazen.com y tomaremos las medidas apropiadas.',
      ],
    },
    {
      heading: '10. Retención de datos',
      paragraphs: [
        'Conservamos la información solo durante el tiempo razonablemente necesario para los fines descritos en esta política, incluido proveer Rhize, mantener la seguridad, cumplir con la ley, resolver disputas, hacer cumplir acuerdos y mejorar la aplicación.',
        'Diferentes tipos de información pueden retenerse durante diferentes períodos:',
      ],
      list: [
        { body: 'La información de conexión de cuenta se retiene mientras tu cuenta esté conectada con Rhize.' },
        {
          body: 'Los registros privados cifrados pueden permanecer disponibles mientras sean necesarios para proveer las funciones privadas o hasta que se eliminen según la funcionalidad del producto y el comportamiento del protocolo subyacente.',
        },
        {
          body: 'Los mensajes de soporte pueden retenerse mientras sean necesarios para responder y para mantener registros de negocio.',
        },
        { body: 'Los registros de seguridad pueden retenerse durante un período limitado para detectar y prevenir abusos.' },
        {
          body: 'Las analíticas agregadas pueden retenerse durante más tiempo si no identifican a usuarios individuales.',
        },
      ],
      trailingParagraphs: [
        'El contenido público de Bluesky / AT Protocol y sus metadatos pueden seguir existiendo fuera de Rhize incluso si dejas de usar Rhize. La eliminación de contenido a través de Rhize puede depender de las capacidades de Bluesky / AT Protocol, de tu servidor de datos personal, de los relays, de las cachés, de los clientes de terceros y de otra infraestructura que no controlamos.',
      ],
    },
    {
      heading: '11. Tus opciones y controles',
      paragraphs: ['Dependiendo de la función y de la ley aplicable, es posible que puedas:'],
      list: [
        { body: 'Acceder, actualizar o eliminar cierta información de tu cuenta de Rhize.' },
        { body: 'Desconectar Rhize de tu cuenta de Bluesky / AT Protocol.' },
        { body: 'Eliminar cierto contenido creado en Rhize.' },
        { body: 'Bloquear o silenciar usuarios.' },
        { body: 'Reportar contenido o cuentas.' },
        { body: 'Optar por no participar en analíticas opcionales cuando esté disponible.' },
        { body: 'Solicitar la eliminación de información que Rhize controla.' },
        { body: 'Contactarnos con preguntas o solicitudes de privacidad.' },
      ],
      trailingParagraphs: [
        'Para hacer una solicitud de privacidad, contáctanos en privacy@denazen.com.',
        'Es posible que necesitemos verificar tu solicitud antes de actuar sobre ella. Es posible que cierta información no se pueda eliminar por completo si necesitamos retenerla por razones legales, de seguridad, de prevención de fraude o por razones operativas legítimas.',
      ],
    },
    {
      heading: '12. Seguridad',
      paragraphs: [
        'Usamos medidas técnicas y organizativas diseñadas para proteger la información que procesamos. Estas incluyen:',
      ],
      list: [
        {
          body: 'Cifrado de extremo a extremo de las publicaciones privadas y de los mensajes directos, realizado en tu dispositivo antes de la transmisión, usando un cifrado autenticado (XChaCha20-Poly1305 con vinculación de datos asociados).',
        },
        {
          body: 'Almacenamiento local en el dispositivo de las claves de cifrado en el almacenamiento seguro del sistema operativo (Keychain en iOS, Keystore en Android), con la sincronización en la nube de esos elementos del almacenamiento seguro deshabilitada a nivel del sistema operativo.',
        },
        { body: 'Derivación de claves a partir de la contraseña usando Argon2id, con una sal aleatoria por cuenta.' },
        {
          body: 'Exclusión del sandbox de datos locales de la aplicación de iCloud Backup y de Google Drive Backup para que el material clave y el contenido descifrado no salgan del dispositivo a través de los canales de respaldo del dispositivo.',
        },
        {
          body: 'Un límite de datos del lado del servidor en el que los servidores de Rhize (Supabase) reciben solo texto cifrado y metadatos que no son contenido — nunca contenido privado en texto plano ni claves sin cifrar.',
        },
      ],
      trailingParagraphs: [
        'Ningún sistema es perfectamente seguro. Eres responsable de proteger tu dispositivo, las credenciales de tu cuenta, la información de recuperación y cualquier contraseña o secreto usado para acceder al contenido privado cifrado.',
        'Si pierdes el acceso a tu contraseña de cifrado y a tu contraseña de recuperación, Rhize no puede restaurar tu contenido privado cifrado. El restablecimiento de cuenta genera un nuevo conjunto de claves y deja permanentemente ilegible el contenido cifrado con las claves anteriores.',
      ],
    },
    {
      heading: '13. Usuarios internacionales',
      paragraphs: [
        'Rhize opera desde los Estados Unidos. Si usas Rhize desde fuera de los Estados Unidos, tu información puede procesarse en países que pueden tener leyes de protección de datos diferentes a las del lugar donde vives.',
        'Cuando sea requerido, usaremos salvaguardas apropiadas para las transferencias internacionales de información personal.',
      ],
    },
    {
      heading: '14. Derechos legales por región',
      paragraphs: [
        'Dependiendo de dónde vivas, puedes tener derechos para acceder, corregir, eliminar, exportar, restringir u oponerte a ciertos usos de tu información personal.',
        'Los residentes de ciertos estados de EE. UU., del Espacio Económico Europeo, del Reino Unido, de Canadá y de otras jurisdicciones pueden tener derechos de privacidad adicionales.',
        'Para ejercer tus derechos de privacidad, contáctanos en privacy@denazen.com.',
        'No discriminamos a los usuarios por ejercer sus derechos de privacidad.',
      ],
    },
    {
      heading: '15. Aviso de privacidad para California',
      paragraphs: [
        'Si eres residente de California, la ley de California puede otorgarte derechos respecto a la información personal, incluido el derecho a saber, eliminar, corregir y optar por no participar en cierta compartición o venta.',
        'Rhize no vende información personal. Rhize no comparte información personal para publicidad conductual de contexto cruzado.',
        'Las categorías de información personal que podemos recopilar incluyen:',
      ],
      list: [
        {
          body: 'Identificadores, como nombre de usuario, DID, dirección de correo electrónico si se proporciona e identificadores de cuenta.',
        },
        {
          body: 'Actividad de internet o de red, como interacciones con la aplicación, diagnósticos y registros de seguridad.',
        },
        { body: 'Contenido generado por el usuario, incluidas publicaciones públicas y registros privados cifrados.' },
        { body: 'Información comercial, si compras funciones de pago.' },
        {
          body: 'Inferencias, solo en contextos operativos limitados o de analíticas agregadas, no para perfiles publicitarios.',
        },
      ],
      trailingParagraphs: ['Usamos esta información para los fines descritos en esta política.'],
    },
    {
      heading: '16. Cambios a esta política',
      paragraphs: [
        'Podemos actualizar esta Política de Privacidad de vez en cuando. Si hacemos cambios materiales, tomaremos medidas razonables para notificar a los usuarios, como actualizar la fecha efectiva, publicar un aviso en la aplicación o enviar un correo electrónico cuando sea apropiado.',
        'Tu uso continuo de Rhize después de que una política actualizada entre en vigor significa que aceptas la política actualizada, en la medida permitida por la ley.',
      ],
    },
    {
      heading: '17. Contáctanos',
      paragraphs: ['Para preguntas o solicitudes de privacidad, contacta a Denazen, Inc. en '],
      contactEmail: 'privacy@denazen.com',
      trailingParagraphs: [
        'Seguridad / reportes: safety@denazen.com',
        'Soporte: support@denazen.com',
        'Dirección postal: 328 Mount Union Ave, Philomath OR, 97370',
      ],
    },
  ],
};
