import React from 'react';
import _ from 'lodash';

import {Link, withPrefix} from '../utils';
import Icon from './Icon';
import HeaderMenu from './HeaderMenu';

export default class Header extends React.Component {
    render() {
        return (
            <header className="site-header py-2">
            	<div className="container">
            		<nav className="navbar flex items-center" aria-label="Main Navigation">
            			<Link className="sr-only" to="#content">Skip to main content</Link>
            			<div className="navbar__branding mr-2">
            				{_.get(this.props, 'pageContext.site.siteMetadata.header.logo', null) ? (
            				<Link className="navbar__logo m-0" to={withPrefix('/')}><img src={withPrefix(_.get(this.props, 'pageContext.site.siteMetadata.header.logo', null))} alt={_.get(this.props, 'pageContext.site.siteMetadata.header.title', null)} /></Link>
            				) : 
            				<Link className="navbar__title h4 m-0" to={withPrefix('/')}>{_.get(this.props, 'pageContext.site.siteMetadata.header.title', null)}</Link>
            				}
            			</div>
            			{(_.get(this.props, 'pageContext.site.siteMetadata.header.has_primary_nav', null) || _.get(this.props, 'pageContext.site.siteMetadata.header.has_secondary_nav', null)) && (<React.Fragment>
            			<div className="navbar__container flex-md-auto">
            				<div className="navbar__scroller">
            					<div className="navbar__inner">
            						<button aria-label="Close" className="btn btn--icon btn--clear navbar__close-btn js-nav-toggle">
            							<Icon {...this.props} icon={'close'} />
            							<span className="sr-only">Close</span>
            						</button>
            						<div className="navbar__menu flex-md">
            							{(_.get(this.props, 'pageContext.site.siteMetadata.header.has_primary_nav', null) && _.get(this.props, 'pageContext.site.siteMetadata.header.primary_nav_links', null)) && (
            								<HeaderMenu {...this.props} header_menu={_.get(this.props, 'pageContext.site.siteMetadata.header.primary_nav_links', null)} page={this.props.pageContext} />
            							)}
            							{(_.get(this.props, 'pageContext.site.siteMetadata.header.has_secondary_nav', null) && _.get(this.props, 'pageContext.site.siteMetadata.header.secondary_nav_links', null)) && (
            								<HeaderMenu {...this.props} header_menu={_.get(this.props, 'pageContext.site.siteMetadata.header.secondary_nav_links', null)} page={this.props.pageContext} />
            							)}
            						</div>
            					</div>
            				</div>
            			</div>
            			<button aria-label="Menu" className="btn btn--icon btn--clear navbar__menu-btn js-nav-toggle ml-auto">
            				<Icon {...this.props} icon={'menu'} />
            				<span className="sr-only">Menu</span>
            			</button>
            			</React.Fragment>)}
            		</nav>
            	</div>
            </header>
        );
    }
}
