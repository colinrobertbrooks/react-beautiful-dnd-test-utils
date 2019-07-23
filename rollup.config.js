export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.cjs.js',
    format: 'cjs'
  },
  external: ['jest', '@testing-library/jest-dom/extend-expect', '@testing-library/react']
};
