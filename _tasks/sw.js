const fs = require('fs-extra');
const path = require('path');
const revHash = require('rev-hash');
const { rollup } = require('rollup');
const replace = require('@rollup/plugin-replace');
const resolve = require('@rollup/plugin-node-resolve');
const terserRollupPlugin = require('rollup-plugin-terser').terser;

module.exports = () => {
  try {
    const version = fs.readJSONSync('package.json').version;
    const buildTime = new Date();

    // TODO Generate these files with eleventy.
    // TODO Generate a list of paths that support this.
    const criticalAssets = [{
      url: '/shell-start.html',
      revision: revHash(
          await fs.readFile(path.join(config.publicDir, 'shell-start.html'))),
    }, {
      url: '/shell-end.html',
      revision: revHash(
          await fs.readFile(path.join(config.publicDir, 'shell-end.html'))),
    }];

    const plugins = [
      resolve(),
      replace({
        'process.env.NODE_ENV': JSON.stringify(ENV),
        '__VERSION__': JSON.stringify(version),
        '__BUILD_TIME__': JSON.stringify(buildTime),
        '__PRECACHE_MANIFEST__': JSON.stringify(criticalAssets),
      }),
    ];
    if (ENV !== 'development') {
      plugins.push(terserRollupPlugin({
        mangle: {
          toplevel: true,
          properties: {
            regex: /(^_|_$)/,
          },
        },
      }));
    }

    const bundle = await rollup({
      input: '_dev/service-worker.js',
      plugins,
    });

    await bundle.write({
      file: '_site/service-worker.js',
      sourcemap: true,
      format: 'es',
    });
  } catch (err) {
    // Beep!
    process.stdout.write('\x07');

    // Log but don't throw so watching still works.
    console.error(err);
  }
};