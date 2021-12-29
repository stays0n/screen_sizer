module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module',
    },
    rules: {
        semi: [2, 'always'],
        indent: [0, 4],
        'space-before-function-paren': [
            'error',
            { anonymous: 'always', named: 'never' },
        ],
        'multiline-ternary': ['off'],
        quotes: [
            'error',
            'single',
            {
                allowTemplateLiterals: true,
            },
        ],
        'display-name': 'off',
        'comma-dangle': ['error', 'always-multiline'],
    },
    globals: {
        module: 'readonly',
        app: 'readonly',
        global: 'readonly',
        process: 'readonly',
    },
};
