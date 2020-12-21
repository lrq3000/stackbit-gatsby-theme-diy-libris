import React from 'react';
import _ from 'lodash';

import {getData, Link, withPrefix} from '../utils';

export default class BlogPostCategories extends React.Component {
    render() {
        let categories = _.get(this.props, 'categories', null);
        let container_class = _.get(this.props, 'container_class', null);
        let category_len = _.size(categories);
        return (
            <span className={container_class}>
            	{
            	_.map(categories, (category, category_idx) => {
            	    return (
                		<React.Fragment key={category_idx + '.1'}>
                			<Link key={category_idx} to={'category/' + category}>{category}</Link>{(!(category_idx === category_len - 1)) && (', ')}
                		</React.Fragment>
                	)
            	})}
            </span>
        );
    }
}
