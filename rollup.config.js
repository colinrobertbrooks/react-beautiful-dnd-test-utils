import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.cjs.js',
    format: 'cjs'
  },
  plugins: [typescript({ tsconfig: './tsconfig.json' })],
  external: [
    '@testing-library/jest-dom',
    '@testing-library/react',
    '@testing-library/user-event',
    'jest'
  ]
};
