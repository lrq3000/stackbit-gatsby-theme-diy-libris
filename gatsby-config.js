const siteMetadata = require('./site-metadata.json')

// for lunr plugin
const { isNil } = require('lodash')

module.exports = {
    pathPrefix: '/',
    siteMetadata: siteMetadata,
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-source-data`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                      resolve: `gatsby-remark-highlight-code`
                    },
                ],
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pages`,
                path: `${__dirname}/src/pages`
            }
        },
        {
            resolve: `gatsby-plugin-sass`,
            options: {}
        },
        {
            resolve: `gatsby-remark-page-creator`,
            options: {}
        },
        {
            resolve: `@stackbit/gatsby-plugin-menus`,
            options: {
                sourceUrlPath: `fields.url`,
                pageContextProperty: `menus`,
            }
        },
        {
          resolve: 'gatsby-plugin-lunr',
          // IMPORTANT: do not forget to `gatsby build` to rebuild the search index! Then you can use `gatsby develop` to test the search.
          options: {
            // ISO 639-1 language codes. See https://lunrjs.com/guides/language_support.html for details
            languages: [{
                name: 'en',
                // A function for filtering nodes. () => true by default
                filterNodes: (node) => !isNil(node.frontmatter)
            }],
            // Fields to index. If store === true value will be stored in index file. 
            // Attributes for custom indexing logic. See https://lunrjs.com/docs/lunr.Builder.html for details
            fields: [
              { name: 'title', store: true, attributes: { boost: 20 } },
              { name: 'content', store: true },
              { name: 'url', store: true },
            ],
            // How to resolve each field's value for a supported node type 
            resolvers: {
              // For any node of type MarkdownRemark, list how to resolve the fields' values
              MarkdownRemark: {
                title: (node) => node.frontmatter.title,
                content: (node) => node.rawMarkdownBody,
                url: (node) => node.fields.url,
              },
            },
          },
        },
        `gatsby-plugin-netlify-cms`, // comment this out if you don't want to use NetlifyCMS to offer a visual editor for the blog and docs content (Stackbit Studio will still be able to edit the whole website)
    ]
};
