module.exports = {
  siteUrl: "https://yvesdc.site",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  additionalPaths: async () => {
    const additionalUrls = [];

    // Fetch all posts
    const postsRes = await fetch(
      `${process.env.STRAPI_API_URL}/posts?fields=Slug`,
      {
        headers: { authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      }
    );
    if (postsRes.ok) {
      const postsData = await postsRes.json();
      postsData.data.forEach((post) => {
        additionalUrls.push({ loc: `/${post.Slug}` });
      });
    }

    // Fetch all categories
    const categoriesRes = await fetch(
      `${process.env.STRAPI_API_URL}/categories?fields=Slug`,
      {
        headers: { authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      }
    );
    if (categoriesRes.ok) {
      const categoriesData = await categoriesRes.json();
      categoriesData.data.forEach((category) => {
        additionalUrls.push({ loc: `/category/${category.Slug}` });
      });
    }

    return additionalUrls;
  },
};
