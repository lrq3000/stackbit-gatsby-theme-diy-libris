# ✨ Collaborative GatsbyJS+Stackbit+NetlifyCMS blog and docs theme ✨

[![Netlify Status](https://api.netlify.com/api/v1/badges/4cdabbc7-6c08-4d93-b66f-a930194cd871/deploy-status)](https://app.netlify.com/sites/stackbit-gatsby-theme-diy-libris/deploys)

<img src="https://themes.stackbit.com/images/diy-demo-1024x768.png" width="600">

This is a [Gatsby](https://gatsbyjs.com) theme using Git as a [CMS](https://en.wikipedia.org/wiki/Content_management_system) that can be imported in for [Stackbit Studio](https://www.stackbit.com?utm_source=project-readme&utm_medium=referral&utm_campaign=user_themes)'s visual editor.

It combines the [DIY theme](https://github.com/stackbithq/stackbit-theme-diy), which provides more extensive customization than other themes, and detailed blog posts with tags, categories, author and frontmatter image positioning, with the [Libris theme](https://github.com/stackbithq/stackbit-theme-libris)'s docs section, providing a MDX-based documentation that can also be edited in Stackbit Studio's visual editor.

This theme further includes additional plugins and edits to make the site collaborative and editable to external contributors through Git pull requests and optionally using NetlifyCMS as a visual editor for docs and blog posts for non-technical contributors.

It's a full Gatsby website, it can be used as a starter without Stackbit, or it can be imported into Stackbit to leverage Stackbit Studio's visual editor for the whole website.

## Preview

[Click here for a preview on Netlify](https://stackbit-gatsby-theme-diy-libris.netlify.app/).

## Install

### Locally
Install node.js (preferably version 14.15.1). Install git.

Then launch a git commandline, clone this repository somewhere, cd inside, and then type:

`npm install && npm run build && gatsby develop`

This will install gatsby, install the necessary plugins and build the gatsby website (and search index), and then launch a local development server (default port: 8000, hence open the address http://localhost:8000 to access the website locally once gatsby is running).

Note that both visual editors (Stackbit Studio and NetlifyCMS) only work when the website is deployed. Locally it's only possible to edit the raw files (but with instant feedback thanks to `gatsby develop`). All content and pages are in markdown format. Tools such as [MarkText](https://marktext.app/) may by useful to write drafts.

If you wish to edit the website both locally and through Stackbit (i.e., other editors use Stackbit Studio visual editor and you edit the raw files locally), do not forget to work on the `preview` branch (`git checkout preview`) and push your changes there first (`git push origin preview`) so that they get reflected in Stackbit Studio. You can then `git checkout master; git merge preview; git push origin master; git checkout preview` to push the same updates to master and then get back to the `preview` branch.

### Deployment online
You can create a site on Stackbit and import this repository to kickstart your own showcase+documentation website.

If you want to allow visitors to edit the website's docs and blogs posts, you will need to host your website on GitHub, although there are alternative ways through Identity and Git-Gateway (see [here](https://www.netlifycms.org/docs/open-authoring/) for the details about open_authoring and [here to enable Netlify Identity and Git-Gateway](https://docs.netlify.com/visitor-access/git-gateway/#setup-and-settings)).

## Additional features
* Automatic code syntax highlighting in MDX files using [gatsby-remark-highlight-code](https://www.gatsbyjs.com/plugins/gatsby-remark-highlight-code/) (Prism was disabled by default, and it required specifying the language).
* Local search engine using [gatsby-plugin-lunr](https://github.com/humanseelabs/gatsby-plugin-lunr).
* Easy collaborative editing of docs and blog posts via NetlifyCMS visual editor. If you want to disable, you can remove the netlifyCMS plugin (`gatsby-plugin-netlify-cms`) in `gatsby-config.js` and remove the "Edit this page" buttons in `src/templates/docs.js` and `src/templates/post.js`.

## Missing features

The SectionDocs component could not be included due to some weird errors. The component is still there but it's not working and won't show up in the Stackbit Studio's visual editor.

## License

All rights belong to Stackbit, this theme should be considered as under the same license as their DIY and Libris themes.

## Colophon

Generated at `2020-12-16T02:09:30.011Z` by Stackbit version `0.3.40`.
