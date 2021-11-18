const path = require("path");
const withSass = require('@zeit/next-sass');
module.exports = withSass({

})

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles/")],
  },
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
  }
};
