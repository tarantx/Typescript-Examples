import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'

export default {
  input: 'src/index.ts',
  output: {
    format: 'cjs',
    file: 'dist/main.js'
  },
  plugins: [
    typescript({
      tsconfig: false,
      target: "es5",
      declaration: true,
      strict: true,
      lib: ["es6"]
    }),
    vue(),
    nodeResolve(),
    commonjs(),
    replace({'process.env.NODE_ENV': JSON.stringify('development')})
  ]
}
