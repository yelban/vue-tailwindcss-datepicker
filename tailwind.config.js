/** @type {import('tailwindcss').Config} */
// const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
    content: [
        './src/**/*.{html,js,ts,jsx,tsx,vue}',
        './index.html',
        // './node_modules/vue-tailwind-datepicker/**/*.js',
    ],
    theme: {
        extend: {
            // colors: {
            //     'vtd-primary': colors.sky, // Light mode Datepicker color
            //     'vtd-secondary': colors.gray, // Dark mode Datepicker color
            // },
            fontFamily: {
                sans: [
                    'Mabry Pro',
                    'Verdana',
                    'Noto Sans TC',
                    'Noto Sans SC',
                    'Noto Sans JP',
                    'Microsoft JhengHei',
                    'Roboto',
                    ...defaultTheme.fontFamily.sans,
                ],
            },
        },
    },
    plugins: [
        // require('@tailwindcss/typography'),
        // require('@tailwindcss/forms'),
        // require('@tailwindcss/aspect-ratio'),
        // require('@tailwindcss/container-queries'),
        // require('tailwind-children'),
        // require('tw-elements/dist/plugin.cjs'),
    ],
    // darkMode: 'class',
};
