import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';
import {graphql} from 'gatsby';

import {Layout} from '../components/index';
import {classNames, withPrefix, htmlToReact} from '../utils';
import BlogPostCategories from '../components/BlogPostCategories';
import BlogPostAuthor from '../components/BlogPostAuthor';
import BlogPostTags from '../components/BlogPostTags';

// this minimal GraphQL query ensures that when 'gatsby develop' is running,
// any changes to content files are reflected in browser
export const query = graphql`
  query($url: String) {
    sitePage(path: {eq: $url}) {
      id
    }
  }
`;

export default class Post extends React.Component {
    render() {
        let has_image = false;
        let image_pos = _.get(this.props, 'pageContext.frontmatter.image_position', null) || 'top';
        if (_.get(this.props, 'pageContext.frontmatter.image', null)) {
             has_image = true;
        }
        let netlifycms_url = "/admin/#/collections/blog/new";  // create a new blog post instead of editing a pre-existent one
        let netlifycms_url2 = "/admin/#/edit/" + _.trim(_.get(this.props, 'pageContext.relativePath', null), '/');  // build path to edit this page with NetlifyCMS, cannot use Gatsby's Link component since NetlifyCMS is not present at build time but only after building static so Link fails, need to use <a> instead
        netlifycms_url2 = netlifycms_url2.substring(0, netlifycms_url2.lastIndexOf('.'));  // remove the file extension if present
        return (
            <Layout {...this.props}>
            <article className="post py-5 py-sm-6 py-md-7">
            	<div className={classNames('post__hero', 'container', {'container--medium': (image_pos === 'top') || (has_image === false)})}>
            		<div className={classNames('mb-4', {'mb-md-5': image_pos !== 'top', 'mb-md-6': image_pos !== 'top', 'grid': image_pos !== 'top', 'items-center': has_image && (image_pos !== 'top')})}>
            			{has_image && (
            			<div className={classNames('post__image', 'mb-3', {'cell-12': image_pos !== 'top', 'cell-lg-7': image_pos !== 'top', 'mb-lg-0': image_pos !== 'top'})}>
            				<img src={withPrefix(_.get(this.props, 'pageContext.frontmatter.image', null))} alt={_.get(this.props, 'pageContext.frontmatter.title', null)} />
            			</div>
            			)}
            			<header className={classNames('post__header', {'cell-12': image_pos !== 'top', 'cell-lg-5': image_pos !== 'top', 'order-lg-first': has_image && (image_pos === 'right')})}>
            				<div className="post__meta mb-2">
            					{_.get(this.props, 'pageContext.frontmatter.categories', null) && (<React.Fragment>
            						<BlogPostCategories {...this.props} categories={_.get(this.props, 'pageContext.frontmatter.categories', null)} container_class={'post__cat'} />
            						<span className="post__meta-sep"> &middot; </span>
            					</React.Fragment>)}
            					<span className="post__date"><time dateTime={moment(_.get(this.props, 'pageContext.frontmatter.date', null)).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(this.props, 'pageContext.frontmatter.date', null)).strftime('%B %d, %Y')}</time></span>
            				</div>
            				<h1 className="post__title mt-0">{_.get(this.props, 'pageContext.frontmatter.title', null)}</h1>
            				{_.get(this.props, 'pageContext.frontmatter.subtitle', null) && (
            					<p className="post__subtitle">{_.get(this.props, 'pageContext.frontmatter.subtitle', null)}</p>
            				)}
            				{_.get(this.props, 'pageContext.frontmatter.author', null) && (
            					<BlogPostAuthor {...this.props} author={_.get(this.props, 'pageContext.frontmatter.author', null)} container_class={'post__byline'} avatar_size={'medium'} />
            				)}
            			</header>
            		</div>
            	</div>
            	<div className="container container--medium">
            		<div className="post__body text-block">
            			{htmlToReact(_.get(this.props, 'pageContext.html', null))}
            		</div>
            		{_.get(this.props, 'pageContext.frontmatter.tags', null) && (
            		<footer className="post__footer mt-4 mt-md-5">
            			<BlogPostTags {...this.props} tags={_.get(this.props, 'pageContext.frontmatter.tags', null)} />
            		</footer>
            		)}
                    <hr />
                    <div class="center-content">
                        <span>Got an idea to communicate? Want to share your story?</span>
                        <br />
                        <a href={netlifycms_url} class="button">Create your own post here!</a>
                        <br />
                        <a href={netlifycms_url2}>(or have a look at how this post was edited)</a>
                    </div>
            	</div>
            </article>
            </Layout>
        );
    }
}
