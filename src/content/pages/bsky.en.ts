import indexContent from './index.en';

const bskyContent: typeof indexContent = {
  ...indexContent,
  meta: {
    title: 'Rhize — Add a private, encrypted layer to Bluesky',
    description:
      'Privacy inspired by Signal. Connection like early Facebook. Freedom and choice of Bluesky.',
  },
  hero: {
    ...indexContent.hero,
    heading: 'Add a private, encrypted layer to Bluesky',
    tagline: ['Where real connection takes root'],
  },
};

export default bskyContent;
