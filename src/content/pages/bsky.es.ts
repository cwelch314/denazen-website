import indexContent from './index.es';

const bskyContent: typeof indexContent = {
  ...indexContent,
  meta: {
    title: 'Rhize — Tu capa privada y cifrada sobre Bluesky',
    description: indexContent.meta.description,
  },
  hero: {
    ...indexContent.hero,
    heading: 'Añade una capa privada y cifrada a Bluesky',
    tagline: ['Donde la conexión real echa raíces'],
  },
};

export default bskyContent;
