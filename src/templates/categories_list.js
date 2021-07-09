import React from 'react';
import _ from 'lodash';
import {graphql} from 'gatsby';

import {Layout, HeroSection, BlogFeedSection} from '../components/index';
import {withPrefix} from '../utils';

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
        let categoryURL = withPrefix(_.get(this.props, 'pageContext.categoryURL'));
        let category_data = _.get(this.props, 'pageContext.frontmatter.categories', null); //getDataYAML(categoryURL);

        return (
            <Layout {...this.props}>
                {JSON.stringify(category_data)}
                <HeroSection section={
                        {
                            title: category_data.title,
                            subtitle: (category_data.description ? category_data.description : 'All posts related to '+category),
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
                            category:categoryURL,  // 'src/data/categories/'+category_data.id+'.yaml',
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
