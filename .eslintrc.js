const OFF = 0,
  WARN = 1,
  ERR = 2

module.exports = {
  env: { browser: true, node: true, 'jest/globals': true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'plugin:flowtype/recommended',
    'prettier',
    'prettier/react',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: { jsx: true, experimentalObjectRestSpread: true },
    sourceType: 'module',
  },
  settings: {
    'import/parser': 'babel-eslint',
    'import/resolve': {
      moduleDirectory: [
        'node_modules',
        'src/main/webapp/WEB-INF/app',
        'node_modules/aurigauikit/src/main',
        'src/main',
      ],
    },
  },
  plugins: ['react', 'import', 'jest', 'flowtype', 'prettier', 'react-hooks'],
  rules: {
    indent: OFF,
    quotes: OFF,
    semi: OFF,
    'no-mixed-spaces-and-tabs': WARN,
    'no-console': WARN,
    'no-unused-vars': WARN,
    'no-var': WARN,
    'no-dupe-keys': WARN,
    'react/jsx-uses-react': ERR,
    'react/jsx-uses-vars': ERR,
    'react/jsx-no-undef': ERR,
    'react/prop-types': OFF,
    'react/display-name': OFF,
    'react/no-find-dom-node': OFF,
    'react/no-deprecated': WARN,
    'prettier/prettier': WARN,
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  },
  globals: {
    _userRoleMap: true,
    _userProfile: true,
    typeSwitch: true,
    Set: true,
    Chart: true,
    Symbol: true,
    Promise: true,
    guid: true,
    APP_CONFIG: true,
    _appHostName: true,
  },
}
