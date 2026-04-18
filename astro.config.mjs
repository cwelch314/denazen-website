import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.denazen.com',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  }
});
