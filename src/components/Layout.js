import React from 'react';
import {Helmet} from 'react-helmet';
import _ from 'lodash';

import '../sass/main.scss';
import Announcement from './Announcement';
import Header from './Header';
import Footer from './Footer';

export default class Body extends React.Component {
    render() {
        let style = _.get(this.props, 'pageContext.site.siteMetadata.style', null) || 'classic';
        let font = _.get(this.props, 'pageContext.site.siteMetadata.base_font', null) || 'sans-serif';
        return (
            <React.Fragment>
                <Helmet>
                    <title>{_.get(this.props, 'pageContext.frontmatter.title', null) && (_.get(this.props, 'pageContext.frontmatter.title', null) + ' | ')}{_.get(this.props, 'pageContext.site.siteMetadata.title', null)}</title>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initialScale=1.0" />
                    <meta name="google" content="notranslate" />
                    <meta name="description" content={_.get(this.props, 'pageContext.frontmatter.excerpt', null) || _.get(this.props, 'pageContext.site.siteMetadata.description', null)}/>
                    {(style === 'bold') ? (
                      (font === 'serif') ? (
                      <link href="https://fonts.googleapis.com/css2?family=Arvo:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"/> 
                      ) : 
                      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"/>
                    ) : ((style === 'classic') ? (
                      (font === 'serif') ? (
                      <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"/>
                      ) : 
                      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"/>
                    ) : 
                    	(font === 'serif') ? (
                    	<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"/>
                    	) : 
                    	<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"/>
                    )}
                    <body className={'layout-' + _.get(this.props, 'pageContext.site.siteMetadata.layout', null) + ' style-' + _.get(this.props, 'pageContext.site.siteMetadata.style', null) + ' palette-' + _.get(this.props, 'pageContext.site.siteMetadata.palette', null) + ' mode-' + _.get(this.props, 'pageContext.site.siteMetadata.mode', null) + ' font-' + _.get(this.props, 'pageContext.site.siteMetadata.base_font', null)} />
                </Helmet>
                <div id="site-wrap" className="site">
                	{(_.get(this.props, 'pageContext.site.siteMetadata.header.has_anncmnt', null) && _.get(this.props, 'pageContext.site.siteMetadata.header.anncmnt_content', null)) && (
                		_.get(this.props, 'pageContext.site.siteMetadata.header.anncmnt_is_home_only', null) ? (
                			(_.get(this.props, 'pageContext.url', null) === '/') && (
                				<Announcement {...this.props} site={this.props.pageContext.site} />
                			)
                		) : 
                			<Announcement {...this.props} site={this.props.pageContext.site} />
                	)}
                	<Header {...this.props} />
                	<main id="content" className="site-content">
                		{this.props.children}
                	</main>
                	<Footer {...this.props} />
                </div>
                {(_.get(this.props, 'pageContext.site.siteMetadata.header.has_primary_nav', null) || _.get(this.props, 'pageContext.site.siteMetadata.header.has_secondary_nav', null)) && (
                <div className="nav-overlay js-nav-toggle" />
                )}
            </React.Fragment>
        );
    }
}
