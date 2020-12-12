const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

// console.log(process.env.SANITY_TOKEN);

module.exports = {
  // tes: {
  //   ha: 'asdfasd',
  // },
  siteMetadata: {
    title: 'Slicks Slices',
    // siteUrl: 'scrcpyscrcpy',
    description: 'Blazing fast modern site generator for React',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '09zbv5p5',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
