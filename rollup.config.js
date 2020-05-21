import babel from '@rollup/plugin-babel'
import vue from 'rollup-plugin-vue'
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import scss from 'rollup-plugin-scss';
import buble from '@rollup/plugin-buble';

export default {
  input:  'index.js',
  output: [
    {
      file: 'dist/vue-flowchart.js',
      format: 'umd',
      sourcemap: true,
      name: 'vueFlowchart'
    },
    {
      file: 'dist/vue-flowchart.esm.js',
      format: 'es',
      sourcemap: true,
      name: 'vueFlowchart'
    }
  ],
  plugins: [
    commonjs({
      include: 'node_modules/**',
    }),
    vue({
      css: false,
    }),
    scss({
      output: 'dist/vue-flowchart.css',
    }),
    // babel({
    //   exclude: ['node_modules/**', '*.vue'],
    // }),
    buble({objectAssign: 'Object.assign'}),
    nodeResolve({
      browser: true,
      jsnext: true,
      main: true
    })
  ],
  external: [
    'Vue',
  ]
}
