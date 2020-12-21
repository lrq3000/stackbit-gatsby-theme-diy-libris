import React from 'react';
import _ from 'lodash';
import {graphql} from 'gatsby';

import {Layout, HeroSection, BlogFeedSection} from '../components/index';

// this minimal GraphQL query ensures that when 'gatsby develop' is running,
// any changes to content files are reflected in browser
export const query = graphql`
  query($url: String) {
    sitePage(path: {eq: $url}) {
      id
    }
  }
`;

/*
            <span>{JSON.stringify(this.props)}</span>
            <div>{_.get(this.props, 'pageContext.frontmatter.title', null)}</div>
            */

export default class Categories_List extends React.Component {
    render() {
        let category = _.get(this.props, 'pageContext.slug');
        return (
            <Layout {...this.props}>
            <HeroSection section={
                    {
                        title: category,
                        subtitle: 'All posts related to '+category,
                        align: "center",
                        padding_top: "medium",
                        padding_bottom: "none",
                        background_color: "none"
                    }
                }
            />
            <BlogFeedSection section={
                    {
                        blog_feed_cols:"three",
                        enable_cards:true,
                        show_recent:false,
                        category:'src/data/categories/'+category+'.yaml',
                        show_date:true,
                        show_categories:true,
                        show_author:true,
                        show_excerpt:true,
                        show_image:true,
                        padding_top:"small",
                        padding_bottom:"large",
                        has_border:true,
                    }
                }
                {...this.props}
            />
            </Layout>
        );
    }
}
