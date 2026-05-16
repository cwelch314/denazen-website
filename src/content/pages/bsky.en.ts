import indexContent from './index.en';

const bskyContent: typeof indexContent = {
  ...indexContent,
  meta: {
    title: 'Rhize — Your private, encrypted layer on Bluesky',
    description: indexContent.meta.description,
  },
  hero: {
    ...indexContent.hero,
    heading: 'Add a private, encrypted layer to Bluesky',
    tagline: ['Where real connection takes root'],
  },
};

export default bskyContent;
