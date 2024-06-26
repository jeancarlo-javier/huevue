module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  plugins: ['vue'],
  extends: ['standard', 'plugin:vue/vue3-essential'],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'space-before-function-paren': 'off'
  },
  globals: {
    describe: true,
    it: true,
    expect: true,
    beforeEach: true,
    afterEach: true,
    beforeAll: true,
    afterAll: true,
    vi: true
  }
}
