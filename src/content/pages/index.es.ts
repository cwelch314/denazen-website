export default {
  meta: {
    title: 'Rhize',
    description: 'Rhize - Privacidad. Conexión. Libertad.',
  },
  hero: {
    heading: 'Tu red privada sobre lo social público.',
    linesBefore: ['Privacidad inspirada en Signal.'],
    rotator: {
      prefix: 'Conexión como ',
      words: ['Facebook', 'Instagram'],
      suffix: ' en sus <em>primeros días</em>.',
    },
    linesAfter: [
      'Libertad de Bluesky.',
    ],
    tagline: ['Comparte con libertad. Ni siquiera nosotros podemos ver tus publicaciones privadas.'],
    waitlistButton: 'Solicitar invitación',
    waitlistNote: 'Beta solo por invitación próximamente. Ayuda a dar forma al futuro de las redes sociales.',
    imagePublic: {
      src: '/images/screenshots/hero-public.webp',
      alt: 'La app de Rhize en un iPhone mostrando un feed público de publicaciones de Bluesky.',
    },
    imagePrivate: {
      src: '/images/screenshots/hero-private.webp',
      alt: 'La app de Rhize en un iPhone mostrando un feed privado con una publicación etiquetada como "Compartida con tu círculo de amigos de confianza".',
    },
  },
  whatRhize: {
    heading: '¿Te acuerdas cuando lo social era social?',
    paragraphs: [
      'Las redes sociales empezaron como una forma de mantenerte al día con las personas de tu vida. Las personas a las que de verdad llamarías. Tu hermana. Tu compañera de cuarto de la universidad. Tus amigos más cercanos.',
      'En algún momento, el feed dejó de ser sobre ellos. Se convirtió en extraños, performers y anuncios. Lo que un algoritmo decidiera para mantenerte desplazándote.',
    ],
    resolution: 'Rhize vuelve a poner a las personas en el centro.',
    list: [
      'Crea círculos para las personas que importan: amigos cercanos, familia, tu club de lectura',
      'Un feed cronológico de las personas que realmente elegiste seguir',
      'Comparte momentos pensados para unos pocos, no publicaciones diseñadas para alcanzar a millones',
      'Menos performance. Más presencia.',
    ],
    image: {
      src: '/images/screenshots/whats-denazen.webp',
      alt: 'El feed privado de Rhize mostrando una publicación del viaje de una pareja compartida con el círculo Familia del usuario.',
    },
  },
  privacy: {
    heading: 'Privado significa privado.',
    paragraphs: [
      'Comparte con libertad con las personas en las que confías. Las publicaciones que compartes con tus círculos privados se cifran en tu dispositivo antes de salir de él. Solo las personas en las que confías tienen las llaves para descifrarlas.',
      'Ni los anunciantes. Ni la IA. Ni los gobiernos. <em>Nadie más.</em> Ni siquiera nosotros.',
    ],
    closer: 'Privado por diseño. No por promesa.',
    image: {
      src: '/images/screenshots/private-network.webp',
      alt: 'La pantalla de Red Privada de Rhize en iPhone, explicando el cifrado de extremo a extremo.',
    },
  },
  freedom: {
    heading: 'La libertad de una red abierta.',
    intro:
      'Rhize corre sobre el AT Protocol, la red social abierta detrás de Bluesky y más de 40 millones de personas. Sumérgete en cualquier tema que te importe y descubre lo que realmente está pasando, no lo que un algoritmo decidió mostrarte.',
    list: [
      'Explora publicaciones públicas sobre cualquier tema: política, arte, ciencia, tu hobby de nicho',
      'Trae tu handle existente de Bluesky, o empieza desde cero en la app',
      'Lleva tus seguidores, publicaciones e identidad a cualquier app del AT Protocol',
    ],
    closing: [
      'Tú eliges lo que importa. Tú eliges cómo experimentarlo.',
      'Si algún día dejamos de ser el lugar adecuado para ti, tu red se va contigo.',
    ],
    bskyNote:
      'Los usuarios actuales de Bluesky pueden iniciar sesión con su cuenta existente, o puedes crear una nueva en la app.',
    image: {
      src: '/images/screenshots/circles.webp',
      alt: 'La pantalla de gestión de círculos de Rhize mostrando círculos definidos por el usuario como Amigos Más Cercanos, Familia y Club de Lectura.',
    },
  },
  values: {
    heading: 'Construido diferente. A propósito.',
    paragraphs: [
      'Rhize es una Public Benefit Corporation. Eso significa que nuestra misión no es solo una promesa. Es parte de nuestra estructura legal.',
      'Somos responsables ante las personas que usan la plataforma y el mundo en el que estamos construyendo. Desde el primer día contribuiremos con una parte de las ganancias a causas que incluyen la conservación y la protección del medio ambiente, los derechos civiles y humanos, y la privacidad.',
      'Rhize es gratis para todos, con funciones premium que nos permiten mantenernos independientes y no depender de anuncios, rastreo ni extracción de atención.',
      'Estamos construyendo un modelo basado en la reciprocidad, diseñado para devolver a las personas que hacen esta red lo que es.',
    ],
  },
};
