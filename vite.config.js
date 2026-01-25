import handlebars from 'vite-plugin-handlebars';
import Handlebars from 'handlebars';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';
import { theme, getFontUrls } from './src/config/theme.config.js';

// Register SVG files as partials
const registerSvgPartials = () => {
  const iconsDir = path.resolve(__dirname, 'src/partials/base/icons');
  const svgFiles = fs.readdirSync(iconsDir).filter(file => file.endsWith('.svg'));

  svgFiles.forEach(file => {
    const name = `base/icons/${path.basename(file, '.svg')}`;
    const content = fs.readFileSync(path.join(iconsDir, file), 'utf-8');
    Handlebars.registerPartial(name, content);
  });
};

// Load data from JSON files in the data folder
const loadData = () => {
  const dataFolder = path.resolve(__dirname, 'src/data');
  const data = fs.readdirSync(dataFolder).reduce((data, file) => {
    const filePath = path.join(dataFolder, file);
    const fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const name = path.basename(file, '.json');
    data[name] = fileData;
    return data;
  }, {});

  // Add theme config to context
  data.theme = theme;
  data.fontUrls = getFontUrls();

  return data;
};

// Custom plugin to watch partials directory
const watchPartialsPlugin = () => {
  return {
    name: 'watch-partials',
    configureServer(server) {
      const partialsDir = path.resolve(__dirname, 'src/partials');

      // Watch the partials directory for changes
      server.watcher.add(partialsDir);
      server.watcher.on('change', (filePath) => {
        // Re-register SVG partials on change
        if (filePath.endsWith('.svg')) {
          registerSvgPartials();
        }
        server.ws.send({
          type: 'full-reload',
          path: '*',
        });
      });
    },
  };
};

// Register SVG partials on startup
registerSvgPartials();

export default {
  plugins: [
    tailwindcss(),
    handlebars({
      // This is the directory where your partials are located
      partialDirectory: [
        path.resolve(__dirname, 'src/partials'),
        path.resolve(__dirname, 'src/partials/base'),
        path.resolve(__dirname, 'src/partials/components'),
      ],
      context: loadData(),
      reloadOnPartialChange: true,
      helpers: {
        eq: (a, b) => a === b,
        add: (a, b) => a + b,
        multiply: (a, b) => a * b,
        concat: (...args) => args.slice(0, -1).join(''),
      },
    }),
    watchPartialsPlugin(),
  ],
  // This is the directory where your pages are located
  root: 'src/pages',
  publicDir: path.resolve(__dirname, 'public'),
  server: {
    hmr: true,
    fs: {
      strict: false,
    },
  },
  build: {
    // this is the output directory for the generated files
    // these are the files you need to launch your site
    outDir: '../../dist',
    emptyOutDir: true,
    // Minification settings
    minify: 'esbuild', // Use esbuild for JS minification (fast, good compression)
    cssMinify: true,   // Enable CSS minification
    rollupOptions: {
      // Add new pages here
      input: {
        index: path.resolve(__dirname, 'src/pages/index.html'),
        about: path.resolve(__dirname, 'src/pages/about.html'),
        features: path.resolve(__dirname, 'src/pages/features.html'),
        pricing: path.resolve(__dirname, 'src/pages/pricing.html'),
        blog: path.resolve(__dirname, 'src/pages/blog.html'),
        contact: path.resolve(__dirname, 'src/pages/contact.html'),
        support: path.resolve(__dirname, 'src/pages/support.html'),
        terms: path.resolve(__dirname, 'src/pages/terms.html'),
        login: path.resolve(__dirname, 'src/pages/login.html'),
        register: path.resolve(__dirname, 'src/pages/register.html'),
        'forgot-password': path.resolve(__dirname, 'src/pages/forgot-password.html'),
      },
    },
  },
};
