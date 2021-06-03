module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: 2, // 每行最多2个属性，超过两个就要换行
      multiline: {
        max: 1,
        allowFirstLine: false
      }
    }],
    'vue/html-indent': ['error', 2, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: true,
      ignores: []
    }],
    'vue/mustache-interpolation-spacing': 'error',
    'vue/space-infix-ops': 'error',
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/html-quotes': 'error'
  }
}
