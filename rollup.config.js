import path from 'path'
import typescript from 'rollup-plugin-typescript'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import alias from 'rollup-plugin-alias'

export default {
  input: 'src/index.ts',
  output: {
    format: 'cjs',
    file: 'dist/bundle.js'
  },
  plugins: [
    alias({
      vue: path.resolve('./node_modules/vue/dist/vue.esm.js')
    }),
    nodeResolve(),
    commonjs(),
    typescript({
      tsconfig: false,
      target: "es5",
      declaration: true,
      strict: true,
      lib: ["es6"]
    }),
    replace({'process.env.NODE_ENV': JSON.stringify('development')})
  ]
}
