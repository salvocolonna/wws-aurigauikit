module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__test__/__mock__/dummy-resource.js',
    '\\.(css|less)$': '<rootDir>/src/__test__/__mock__/dummy-style.js',
    'react-intl': '<rootDir>/src/__test__/__mock__/react-intl.js',
    'react-sizeme': '<rootDir>/src/__test__/__mock__/react-sizeme.js',
  },
  modulePaths: ['./src/main'],
  setupFiles: ['<rootDir>/src/__test__/polyfills'],
}
