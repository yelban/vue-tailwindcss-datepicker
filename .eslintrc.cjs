/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-prettier/skip-formatting',
        'plugin:import/recommended', // 1. eslint-plugin-import
        'plugin:prettier/recommended', // 3. eslint-plugin-prettier
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    plugins: [
        'simple-import-sort', // 2. eslint-plugin-simple-import-sort
    ],
    rules: {
        // 2. eslint-plugin-simple-import-sort
        'simple-import-sort/imports': 'warn',
        'simple-import-sort/exports': 'warn',
        'import/first': 'warn',
        'import/newline-after-import': 'warn',
        'import/no-duplicates': 'warn',
        'import/no-extraneous-dependencies': 'warn',
        //
        'no-unused-vars': 'warn',
    },
    settings: {
        // resolve issue: Unable to resolve path to module '@/assets/main.css'.eslint (import/no-unresolved)
        ...createAliasSetting({
            '@': `${path.resolve(__dirname, './src')}`,
        }),
    },
    overrides: [
        {
            // Disable multi-word-component-names
            files: ['playground/**/*.{vue,js}', 'src/**/*.vue', 'docs/**/*.{vue,js}'],
            rules: {
                'vue/multi-word-component-names': 'off',
                'vue/html-self-closing': [
                    'error',
                    {
                        html: {
                            void: 'always',
                            normal: 'never',
                            component: 'always',
                        },
                        svg: 'always',
                        math: 'always',
                    },
                ],
            },
        },
    ],
};
