import indexContent from './index.es';

const bskyContent: typeof indexContent = {
  ...indexContent,
  meta: {
    title: 'Rhize — Tu capa privada y cifrada sobre Bluesky',
    description: indexContent.meta.description,
  },
  hero: {
    ...indexContent.hero,
    heading: 'Tu capa privada y cifrada sobre Bluesky',
    subheading: 'Donde la conexión real echa raíces',
  },
};

export default bskyContent;
