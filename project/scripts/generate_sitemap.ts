import * as path from "@std/path";

const BASE_URL = "https://anouarcodes.tech";
const PUBLIC_DIR = "public";
const POSTS_DIR = path.join("src", "posts");
const SITEMAP_PATH = path.join(PUBLIC_DIR, "sitemap.xml");
const ROBOTS_PATH = path.join(PUBLIC_DIR, "robots.txt");

async function generateSitemapAndRobots() {
  const staticRoutes = [
    { loc: "/", priority: "1.0" },
    { loc: "/resume", priority: "0.8" },
    { loc: "/blog", priority: "0.8" },
  ];

  const blogPostRoutes: { loc: string; lastmod: string; priority: string }[] =
    [];
  const now = new Date().toISOString().split("T")[0];

  try {
    for await (const dirEntry of Deno.readDir(POSTS_DIR)) {
      if (dirEntry.isFile && dirEntry.name.endsWith(".md")) {
        const postId = dirEntry.name.replace(/\.md$/, "");
        blogPostRoutes.push({
          loc: `/blog/${postId}`,
          lastmod: now,
          priority: "0.7",
        });
      }
    }
  } catch (error) {
    console.error(`Error reading blog posts directory: ${error}`);
    console.warn("Sitemap will be generated without dynamic blog post URLs.");
  }

  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  for (const route of staticRoutes) {
    sitemapContent += `
  <url>
    <loc>${BASE_URL}${route.loc}</loc>
    <lastmod>${now}</lastmod>
    <priority>${route.priority}</priority>
  </url>`;
  }

  for (const route of blogPostRoutes) {
    sitemapContent += `
  <url>
    <loc>${BASE_URL}${route.loc}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <priority>${route.priority}</priority>
  </url>`;
  }

  sitemapContent += `
</urlset>`;

  // Construct robots.txt content
  const robotsContent = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml`;

  try {
    await Deno.mkdir(PUBLIC_DIR, { recursive: true });
  } catch (error) {
    if (error instanceof Deno.errors.AlreadyExists) {
      // Directory already exists, no problem
    } else {
      console.error(`Error creating public directory: ${error}`);
      return;
    }
  }

  // Write sitemap.xml
  try {
    await Deno.writeTextFile(SITEMAP_PATH, sitemapContent);
    console.log(`sitemap.xml generated at ${SITEMAP_PATH}`);
  } catch (error) {
    console.error(`Error writing sitemap.xml: ${error}`);
  }

  // Write robots.txt
  try {
    await Deno.writeTextFile(ROBOTS_PATH, robotsContent);
    console.log(`robots.txt generated at ${ROBOTS_PATH}`);
  } catch (error) {
    console.error(`Error writing robots.txt: ${error}`);
  }
}

// Run the generation function when the script is executed
generateSitemapAndRobots();
