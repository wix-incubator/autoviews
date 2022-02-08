const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const isDev = process.env.NODE_ENV !== 'production';

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
    title: 'AutoViews',
    tagline: 'Render stuff automatically, based on JSONSchema',
    url: 'https://localhost:3000',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'wix-incubator', // Usually your GitHub org/user name.
    projectName: 'auto-views-docs', // Usually your repo name.

    presets: [
        [
            '@docusaurus/preset-classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    editUrl: 'https://github.com/wix-incubator/autoviews/tree/master/packages/docs'
                },
                // blog: {
                //   showReadingTime: true,
                //   // Please change this to your repo.
                //   editUrl:
                //     'https://github.com/facebook/docusaurus/edit/main/website/blog/',
                // },
                theme: {
                    customCss: [
                        require.resolve('./src/css/custom.css'),
                        require.resolve('@codesandbox/sandpack-react/dist/index.css')
                    ]
                }
            })
        ]
    ],

    plugins: [
        require.resolve('./docusaurus-plugins/custom-webpack-plugin.ts'),

        isDev && [
            'docusaurus-plugin-module-alias',
            {
                alias: {
                    '@autoviews/core': require.resolve('../core/src/index.tsx')
                }
            }
        ]
    ],

    themes: ['@docusaurus/theme-live-codeblock'],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
        navbar: {
            title: 'AutoViews',
            logo: {
                alt: 'auto-views',
                src: 'img/logo.svg'
            },
            items: [
                {
                    type: 'doc',
                    docId: 'index',
                    position: 'left',
                    label: 'Docs'
                },
                // {to: '/blog', label: 'Blog', position: 'left'},
                {
                    href: 'https://github.com/wix-incubator/autoviews/tree/master/packages/core',
                    label: 'GitHub',
                    position: 'right'
                }
            ]
        },
        footer: {
            style: 'dark',
            links: [
                // {
                //   title: 'Docs',
                //   items: [
                //     {
                //       label: 'Tutorial',
                //       to: '/docs/intro',
                //     },
                //   ],
                // },
                // {
                //   title: 'Community',
                //   items: [
                //     {
                //       label: 'Stack Overflow',
                //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
                //     },
                //     {
                //       label: 'Discord',
                //       href: 'https://discordapp.com/invite/docusaurus',
                //     },
                //     {
                //       label: 'Twitter',
                //       href: 'https://twitter.com/docusaurus',
                //     },
                //   ],
                // },
                {
                    title: 'More',
                    items: [
                        // {
                        //   label: 'Blog',
                        //   to: '/blog',
                        // },
                        {
                            label: 'GitHub',
                            href: 'https://github.com/wix-incubator/autoviews/tree/master/packages/core'
                        }
                    ]
                }
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Wix, Inc. Built with Docusaurus.`
        },
        prism: {
            theme: lightCodeTheme,
            darkTheme: darkCodeTheme
        }
    })
});
