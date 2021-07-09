/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// Trick to implement ESM6 import format in gatsby-node.js
// See: https://github.com/gatsbyjs/gatsby/issues/7810#issuecomment-449741977
//require = require('esm')(module)
//module.exports = require('./gatsby-node.esm.js')

// import {getData, withPrefix} from './src/utils'; // we need ESM6 import style but they do not work yet in gatsby-node.js so we'll do without getData, see https://github.com/gatsbyjs/gatsby/issues/7810#issuecomment-449741977

const path = require('path')

module.exports.createPages = async ({ graphql, actions }) => {
  
  // Auto-generate category listing pages
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
  response.data.allMarkdownRemark.distinct.forEach(categoryURL => {
    // 0. Using GraphQL distinct, we extract the unique list of categories URLs from blog posts markdown files directly
    // 1. Get category data from categoryURL (for the moment we just infer from URL without getting the data)
    // 2. Get markdown data
    // 3. Create new pages
    // 4. Pass as context the category URL as defined in the markdown post and categoryPseudoID so that the template can handle it

    // Fetch infos about the linked category from its .yaml file
    // Since we cannot import utils.getData(), we simplify by getting the last segment of the URL (and remove file extension) as the category id, which holds true since the category id == slug == filename (as set in NetlifyCMS)
    //let category_data = getData(null, categoryURL);
    let categoryPseudoID = categoryURL.match(/([^\/]*)\/*$/)[1].split('.')[0];
    //console.log('/blog/category2/' + categoryPseudoID);  // debug

    createPage({
      component: thisTemplate,
      path: '/blog/category2/' + categoryPseudoID,  // `${category}`
      context: {
        slug: categoryPseudoID,
        categoryURL: categoryURL,
        categoryPseudoID: categoryPseudoID,
        frontmatter: {
            title: categoryPseudoID,
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
