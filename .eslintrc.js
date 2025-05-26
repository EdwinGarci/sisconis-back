module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: '2022',
        sourceType: 'module',
        project: ['./tsconfig.eslint.json']
    },
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended'
    ],
    env: {
        node:true,
        es2022: true
    },
    rules: {
        'prettier/prettier': 'error',

        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
        '@typescript-eslint/no-explicit-any': 'warn',

        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/restrict-template-expressions': ['error', {
            allowNumber: true,
            allowBoolean: false,
            allowAny: false,
            allowNullish: false
        }],

        'no-console': 'warn',
        'no-debugger': 'error',
        'no-var': 'error',
        'prefer-const': 'error',
        'prefer-arrow-callback': 'error',
        'arrow-spacing': 'error',
        'no-multiple-empty-lines': ['error', { max: 1 }],
        'eol-last': 'error',

        'no-duplicate-imports': 'error',
        'sort-imports': ['error', {
            'ignoreCase': true,
            'ignoreDeclarationSort': true
        }]
    },
    ignorePatterns: [
        'node_modules/', 
        'dist/',
        'build/',
        '*.js.map',
        'src/setupTests.ts',
        'coverage/'
    ]
};
