export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.cjs.js',
    format: 'cjs'
  },
  external: ['jest', 'jest-dom/extend-expect', '@testing-library/react']
};
