# ✨ Stackbit DIY + Libris (docs) themes combined for Gatsbyjs ✨

<img src="https://themes.stackbit.com/images/diy-demo-1024x768.png" width="600">

This is a [Gatsby](https://gatsbyjs.com) site using Git as a [CMS](https://en.wikipedia.org/wiki/Content_management_system). It was created with [Stackbit](https://www.stackbit.com?utm_source=project-readme&utm_medium=referral&utm_campaign=user_themes) in under a minute.

It combines the [DIY theme](https://github.com/stackbithq/stackbit-theme-diy), which provides more extensive customization than other themes, and detailed blog posts with tags, categories, author and frontmatter image positioning, with the [Libris theme](https://github.com/stackbithq/stackbit-theme-libris)'s docs section, providing a MDX-based documentation that can also be edited in Stackbit Studio's visual editor.

## Preview

[Click here for a preview on Netlify](https://stackbit-gatsby-theme-diy-libris.netlify.app/).

## Install

### Locally
Install node.js (preferably version 14.15.1). Install git.

Then launch a git commandline, clone this repository somewhere, cd inside, and then type:

`npm install && npm run build && gatsby develop`

This will install gatsby, install the necessary plugins and build the gatsby website (and search index), and then launch a local development server (default port: 8000, hence open the address http://localhost:8000 to access the website locally once gatsby is running).

### Deployment online
You can create a site on Stackbit and import this repository to kickstart your own showcase+documentation website.

## Additional features
* Automatic code syntax highlighting in MDX files using [gatsby-remark-highlight-code](https://www.gatsbyjs.com/plugins/gatsby-remark-highlight-code/) (Prism was disabled by default, and it required specifying the language).
* Local search engine using [gatsby-plugin-lunr](https://github.com/humanseelabs/gatsby-plugin-lunr).

## Missing features

The SectionDocs component could not be included due to some weird errors. The component is still there but it's not working and won't show up in the Stackbit Studio's visual editor.

## License

All rights belong to Stackbit, this theme should be considered as under the same license as their DIY and Libris themes.

## Colophon

Generated at `2020-12-16T02:09:30.011Z` by Stackbit version `0.3.40`.
