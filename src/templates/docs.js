import React from 'react';  // Layout for the docs section, this comes from StackBit's Libris theme: https://github.com/stackbithq/stackbit-theme-libris
import _ from 'lodash';
import {graphql} from 'gatsby';

import {Layout, DocsMenu} from '../components/index';
import {htmlToReact, getPages, Link, withPrefix} from '../utils';

// Code syntax highlighter
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
deckDeckGoHighlightElement();

// this minimal GraphQL query ensures that when 'gatsby develop' is running,
// any changes to content files are reflected in browser
export const query = graphql`
  query($url: String) {
    sitePage(path: {eq: $url}) {
      id
    }
  }
`;

export default class Docs extends React.Component {
    render() {
        let root_docs_path = _.trim(_.get(this.props, 'pageContext.site.data.doc_sections.root_docs_path', null), '/');
        let current_page_url = _.trim(_.get(this.props, 'pageContext.url', null), '/');
        //let netlifycms_url = "/admin/#/edit/" + _.trim(_.get(this.props, 'pageContext.relativePath', null), '/');  // build path to edit this page with NetlifyCMS, cannot use Gatsby's Link component since NetlifyCMS is not present at build time but only after building static so Link fails, need to use <a> instead - FIXME: in the future when nested collections will be updated to play well with the edit API, uncomment this line and delete the next one, see https://github.com/netlify/netlify-cms/issues/4753
        let netlifycms_url = "/admin/#/collections/docs/entries/" + _.trim(_.get(this.props, 'pageContext.relativePath', null).slice(4), '/');  // build path to edit this page with NetlifyCMS, cannot use Gatsby's Link component since NetlifyCMS is not present at build time but only after building static so Link fails, need to use <a> instead
        netlifycms_url = netlifycms_url.substring(0, netlifycms_url.lastIndexOf('.'));  // remove the file extension if present
        let excerpt = _.get(this.props, 'pageContext.frontmatter.excerpt');
        return (
            <Layout {...this.props}>
                {
            // use docs-css style to isolate the docs.scss stylesheet just for the docs section, thanks to https://github.com/gatsbyjs/gatsby/issues/3446#issuecomment-604115237
                }
            <div className="inner outer docs-css">
              <div className="docs-content">
                <DocsMenu {...this.props} page={this.props.pageContext} site={this.props.pageContext.site} />
                <article className="post type-docs">
                  <div className="post-inside">
                    <header className="post-header">
                      <h1 className="post-title line-left">{_.get(this.props, 'pageContext.frontmatter.title', null)}</h1>
                    </header>
                    <div className="post-content">
                      {excerpt && (
                          <p>{_.get(this.props, 'pageContext.frontmatter.excerpt')}</p>
                      )}
                      {htmlToReact(_.get(this.props, 'pageContext.html', null))}
                      {(root_docs_path !== current_page_url) && ((() => {
                          let child_pages = _.orderBy(getPages(this.props.pageContext.pages, current_page_url), 'frontmatter.weight');
                          let child_count = _.size(child_pages);
                          let has_children = (child_count > 0) ? (true) : false;
                          return (<React.Fragment>
                            {has_children && (
                              <ul className="docs-section-items">
                                {_.map(child_pages, (child_page, child_page_idx) => (
                                <li key={child_page_idx} className="docs-section-item"><Link to={withPrefix(_.get(child_page, 'url', null))} className="docs-item-link">{_.get(child_page, 'frontmatter.title', null)}<span className="icon-angle-right" aria-hidden="true" /></Link></li>
                                ))}
                              </ul>
                            )}
                          </React.Fragment>);
                      })())}
                    </div>
                  </div>
                  <div class="center-content">
                    <a href={netlifycms_url} class="button">Edit this page</a>
                  </div>
                </article>
                <nav id="page-nav" className="page-nav">
                  <div id="page-nav-inside" className="page-nav-inside sticky">
                    <h2 className="page-nav-title">Jump to Section</h2>
                    <div id="page-nav-link-container" />
                  </div>
                </nav>
              </div>
            </div>
            </Layout>
        );
    }
}
