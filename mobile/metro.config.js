const { getDefaultConfig } = require('metro-config');
const path = require('path');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      assetExts: [
        ...assetExts,
        'png',
        'jpg',
        'jpeg',
        'gif',
        'ico',
        'svg',
        'webp',
        'ttf',
        'otf',
        'woff',
        'woff2'
      ].filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
      extraNodeModules: new Proxy({}, {
        get: (target, name) => {
          return path.join(process.cwd(), `node_modules/${name}`);
        },
      }),
    },
    watchFolders: [
      path.resolve(__dirname, 'node_modules')
    ],
  };
})(); 