const confusingBrowserGlobals = require('confusing-browser-globals');

module.exports = {
    ignorePatterns: [
        '**/dist/**'
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended'
    ],
    env: {
        browser: true,
        es6: true,
        node: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint/eslint-plugin',
        'import',
        'react-hooks',
        'jest',
        '@regru/prefer-early-return'
    ],
    settings: {
        react: {
            version: 'detect'
        }
    },
    globals: {
        'google': 'readonly'
    },
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        camelcase: 'off',
        'react/no-children-prop': 'off',
        'react/prop-types': 'off',
        'react/display-name': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        'no-irregular-whitespace': [
            'error',
            {
                skipStrings: true,
                skipComments: true,
                skipTemplates: true
            }
        ],
        '@typescript-eslint/camelcase': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: true
            }
        ],
        'no-empty': [
            'error',
            {
                allowEmptyCatch: true
            }
        ],
        quotes: [
            'error',
            'single',
            {
                allowTemplateLiterals: true
            }
        ],
        curly: [
            'error',
            'all'
        ],
        'object-curly-spacing': [
            'error',
            'never'
        ],
        'object-curly-newline': [
            'error',
            {
                ObjectExpression: {
                    minProperties: 4,
                    multiline: true,
                    consistent: true
                },
                ObjectPattern: {
                    minProperties: 4,
                    multiline: true,
                    consistent: true
                },
                ImportDeclaration: {
                    minProperties: 4,
                    multiline: true,
                    consistent: true
                },
                ExportDeclaration: {
                    minProperties: 4,
                    multiline: true,
                    consistent: true
                }
            }
        ],
        indent: 'off', // See: https://github.com/eslint/eslint/issues/13956
        '@typescript-eslint/indent': [
            'error',
            4,
            {
                SwitchCase: 1,
                ignoredNodes: ['TSTypeParameterInstantiation']
            }
        ],
        'no-multi-spaces': 'error',
        'keyword-spacing': [2],
        'no-trailing-spaces': 'error',
        'import/order': [
            'error',
            {
                'newlines-between': 'always'
            }
        ],
        'max-len': [
            'error',
            120,
            {
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true,
                ignoreUrls: true
            }
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'react/jsx-boolean-value': 'error',
        'react/jsx-first-prop-new-line': 'error',
        'react/jsx-indent-props': [
            'error',
            4
        ],
        'react/jsx-max-props-per-line': 'error',
        'react/self-closing-comp': 'error',
        'react/jsx-closing-bracket-location': 'error',
        'react/jsx-wrap-multilines': [
            'error',
            {
                declaration: 'parens-new-line',
                assignment: 'parens-new-line',
                return: 'parens-new-line',
                arrow: 'parens-new-line',
                condition: 'parens-new-line',
                logical: 'parens-new-line',
                prop: 'ignore'
            }
        ],
        'react/jsx-one-expression-per-line': ['error', {'allow': 'single-child'}],
        'eol-last': 'error',
        'no-nested-ternary': 'error',
        '@regru/prefer-early-return/prefer-early-return': 'error',
        'no-multiple-empty-lines': [
            'error',
            {
                max: 1
            }
        ],
        semi: 'error',
        'semi-spacing': 'error',
        'operator-linebreak': [
            'error',
            'after'
        ],
        'no-console': 'error',
        'lines-between-class-members': ['error', 'always'],
        'comma-spacing': 'error',
        'comma-dangle': ['error', {
            'arrays': 'never',
            'objects': 'never',
            'imports': 'never',
            'exports': 'never',
            'functions': 'never'
        }],
        'no-restricted-globals': ['error', 'isFinite', 'isNaN'].concat(confusingBrowserGlobals),
        'id-match': ['error', '^[a-zA-Z_$][a-zA-Z0-9_$]*$'], // https://regex101.com/r/LoObQT/1
        'no-else-return': ['error', {'allowElseIf': false}],
        'padding-line-between-statements': ['error',
            {'blankLine': 'always', 'prev': '*', 'next': 'if'}
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-var-requires': 'off'
    },
    overrides: [
        {
            files: [
                '*.test.ts?(x)',
                '**/__jest__/setup.ts'
            ],
            extends: [
                'plugin:jest/recommended',
                'plugin:jest-dom/recommended',
                'plugin:testing-library/react'
            ],
            env: {
                'jest/globals': true
            },
            rules: {
                'jest/no-disabled-tests': 'off',
                'jest/expect-expect': 'off',
                'jest/no-standalone-expect': 'off',
                'jest/valid-expect-in-promise': 'off',
                'jest/no-conditional-expect': 'off',
                'jest/valid-title': 'off',
                'testing-library/render-result-naming-convention': 'off'
            }
        }
    ]
};
