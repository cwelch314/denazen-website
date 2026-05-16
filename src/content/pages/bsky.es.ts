import indexContent from './index.es';

const bskyContent: typeof indexContent = {
  ...indexContent,
  meta: {
    title: 'Rhize — Añade una capa privada y cifrada a Bluesky',
    description:
      'Añade una capa privada y cifrada a Bluesky. Privacidad inspirada en Signal. Conexión como en los primeros días de Facebook. Libertad y elección de Bluesky. Donde la conexión real echa raíces.',
  },
  hero: {
    ...indexContent.hero,
    heading: 'Añade una capa privada y cifrada a Bluesky',
    tagline: ['Donde la conexión real echa raíces'],
  },
};

export default bskyContent;
