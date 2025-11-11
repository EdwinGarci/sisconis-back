import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

// Prettier settings
const prettierSettings = {
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 100,
    tabWidth: 4,
    useTabs: false,
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: 'avoid',
    endOfLine: 'lf',
    quoteProps: 'as-needed',
    proseWrap: 'preserve',
};

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    {
        ignores: ['node_modules/', 'dist/', 'build/', '*.js.map', 'src/setupTests.ts', 'coverage/'],
    },
    js.configs.recommended,
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: ['./tsconfig.json'],
            },
            globals: {
                console: 'readonly',
                process: 'readonly',
                Buffer: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                global: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            prettier: prettierPlugin,
        },
        extends: ['plugin:@typescript-eslint/recommended'],
        rules: {
            // Reglas de Prettier
            'prettier/prettier': 'error',

            // Reglas de seguridad TypeScript
            '@typescript-eslint/no-unsafe-assignment': 'error',
            '@typescript-eslint/no-unsafe-call': 'error',
            '@typescript-eslint/no-unsafe-member-access': 'error',
            '@typescript-eslint/no-unsafe-return': 'error',
            '@typescript-eslint/no-var-requires': 'error',
            '@typescript-eslint/no-empty-function': [
                'error',
                {
                    allow: ['constructors', 'private-constructors', 'protected-constructors'],
                },
            ],

            // Manejo de errores
            '@typescript-eslint/no-throw-literal': 'error',
            'no-unused-expressions': 'off',
            '@typescript-eslint/no-unused-expressions': [
                'error',
                {
                    allowShortCircuit: true,
                    allowTernary: true,
                    allowTaggedTemplates: true,
                },
            ],
            'no-unreachable': 'error',

            // Manejo de variables
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],
            '@typescript-eslint/explicit-function-return-type': [
                'error',
                {
                    allowExpressions: true,
                    allowTypedFunctionExpressions: true,
                    allowHigherOrderFunctions: true,
                },
            ],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/await-thenable': 'error',

            // Manejo de plantillas
            '@typescript-eslint/restrict-template-expressions': [
                'error',
                {
                    allowNumber: true,
                    allowBoolean: false,
                    allowAny: false,
                    allowNullish: false,
                    allowRegExp: false,
                    allowString: false,
                },
            ],

            // Manejo de console y debugger
            'no-console': [
                'warn',
                {
                    allow: ['warn', 'error', 'info'],
                },
            ],
            'no-debugger': 'error',

            // Manejo de variables
            'no-var': 'error',
            'prefer-const': 'error',
            'prefer-arrow-callback': 'error',

            // Manejo de espaciado
            'arrow-spacing': 'error',
            'no-multiple-empty-lines': [
                'error',
                {
                    max: 1,
                    maxEOF: 0,
                    maxBOF: 0,
                },
            ],
            'eol-last': 'error',

            // Manejo de imports
            'no-duplicate-imports': 'error',
            'sort-imports': [
                'error',
                {
                    ignoreCase: true,
                    ignoreDeclarationSort: true,
                    ignoreMemberSort: false,
                    memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
                    allowSeparatedGroups: true,
                },
            ],

            // Reglas adicionales recomendadas
            '@typescript-eslint/prefer-nullish-coalescing': 'error',
            '@typescript-eslint/prefer-optional-chain': 'error',
            '@typescript-eslint/no-unnecessary-condition': 'warn',
            '@typescript-eslint/no-unnecessary-type-assertion': 'error',
            '@typescript-eslint/prefer-as-const': 'error',
            '@typescript-eslint/prefer-readonly': 'warn',
            '@typescript-eslint/switch-exhaustiveness-check': 'error',

            // Mejores prácticas generales
            'prefer-template': 'error',
            'no-useless-concat': 'error',
            'no-useless-return': 'error',
            'no-else-return': 'error',
            'no-lonely-if': 'error',
            'no-unneeded-ternary': 'error',
            'object-shorthand': 'error',
            'prefer-destructuring': [
                'error',
                {
                    array: true,
                    object: true,
                },
                {
                    enforceForRenamedProperties: false,
                },
            ],
        },
    },
    {
        files: ['**/*.{js,ts,tsx}'],
        plugins: ['prettier'],
        extends: ['plugin:prettier/recommended'],
        rules: {
            'prettier/prettier': ['error', prettierSettings],
        },
    },
];
