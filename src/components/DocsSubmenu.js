import React from 'react';
import _ from 'lodash';

import {classNames, Link, withPrefix} from '../utils';

export default class DocsSubmenu extends React.Component {
    render() {
        let child_pages = _.get(this.props, 'child_pages', null);
        let page = _.get(this.props, 'page', null);
        return (
            <ul className="docs-submenu">
              {_.map(child_pages, (child_page, child_page_idx) => (
                // FIXME: the style is a hacky way of signalling nesting, but it doesn't work well since the nodes are reordered by frontmatter.weight, so the subpages can be placed under another parent... Check DocsMenu.js and getPage.js to implement proper recursively nested menu layout
                <li key={child_page_idx} className={classNames('docs-menu-item', {'current': _.get(page, 'url', null) === _.get(child_page, 'url', null)})} style={{marginLeft: ((_.get(child_page, 'url', null)).split("/").length - 5) + 'em'}}>
                  <Link to={withPrefix(_.get(child_page, 'url', null))}>{_.get(child_page, 'frontmatter.title', null)}</Link>
                </li>
              ))}
            </ul>
        );
    }
}
