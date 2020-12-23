import React from 'react';
import _ from 'lodash';

import {MarkdownContent} from '../components/index';

import {getData, Link, withPrefix, classNames} from '../utils';

export default class BlogPostAuthorCard extends React.Component {
    render() {
        let author = _.get(this.props, 'author', null);
        let container_class = _.get(this.props, 'container_class', null);
        let avatar_size = _.get(this.props, 'avatar_size', null);
        let author_data = getData(this.props.pageContext.site.data, author);
        return (
            <div className={container_class}>
                {author_data.photo && (
                    <div className="authorcard_image">
                        {author_data.link ? (
                        <Link className="flex items-center" to={withPrefix(author_data.link)}>
                            <figure className={classNames('avatar', 'mr-1', {'avatar--small': avatar_size === 'small'}, {'avatar--big': avatar_size === 'big'})}>
                                <img className="avatar__img" src={withPrefix(author_data.photo)} alt={author_data.first_name + (author_data.last_name ? (' ' + author_data.last_name) : '') + ' Photo'} />
                            </figure>
                        </Link>
                        ) : (
                        <div className="flex items-center">
                            <figure className={classNames('avatar', 'mr-2', {'avatar--small': avatar_size === 'small'}, {'avatar--big': avatar_size === 'big'})}>
                                <img className="avatar__img" src={withPrefix(author_data.photo)} alt={author_data.first_name + (author_data.last_name ? (' ' + author_data.last_name) : '') + ' Photo'} />
                            </figure>
                        </div>
                        )}
                    </div>
                )}

                <p className="authorcard_authorheader">Author</p>
                <p className="authorcard_name">
                    {author_data.link ? (
                        <Link to={withPrefix(author_data.link)}>{author_data.first_name} {author_data.last_name}</Link>
                    ) : 
                        <span>{author_data.first_name} {author_data.last_name}</span>
                    }
                </p>

                <MarkdownContent className='authorcard_short_bio' content={author_data.short_bio} />
            </div>
        );
    }
}
