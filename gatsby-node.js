/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
 
const path = require('path')

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const thisTemplate = path.resolve("./src/templates/categories_list.js")
  const response = await graphql(`
    query {
      allMarkdownRemark(filter: {frontmatter: {template: {eq: "post"}}}) {
        edges {
          node {
            frontmatter {
              categories
            }
          }
        }
        distinct(field: frontmatter___categories)
      }
      site {
        siteMetadata {
          title
        }
      }
      allSitePage {
        nodes {
          path
        }
      }
    }
  `)

  let siteMetadata = response.data.site.siteMetadata;  // Layout component expects that to feed Helmet
  let pages = response.data.allSitePage.nodes.map(node => ({'url': node.path}));  // simply get all pages on the whole website, necessary for the utils.getPages() function to work (it will filter for the appropriate section, e.g., blog/)
  response.data.allMarkdownRemark.distinct.forEach(category => {
    // 1. Get path to template
    // 2. Get markdown data
    // 3. Create new pages

    createPage({
      component: thisTemplate,
      path: `/blog/categories2/${category}`,
      context: {
        slug: category,
        frontmatter: {
            title: category,
            template: `post`,
        },
        site: {
            siteMetadata: siteMetadata,
        },
        pages: pages,
      },
    })
  })
}