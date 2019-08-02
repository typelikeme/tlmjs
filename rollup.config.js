import { eslint } from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import minify from 'rollup-plugin-babel-minify';
import copy from 'rollup-plugin-copy'

export default {
    input: 'src/js/index.ts',
    output: {
        file: 'dist/js/tlm.min.js',
        format: 'iife',
        name: 'tlm'
    },
    plugins: [
        resolve({
            mainFields: ['jsnext', 'module', 'main', 'browser'],
            browser: true
        }),
        eslint({
            exclude: [
                'src/styles/**',
            ]
        }),
        minify(),
        copy({
            targets: [
                { src: 'dist/js/tlm.min.js', dest: 'tests/js' }
            ]
        })
    ]
};