import fm from "front-matter";

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  readTime: string;
  tags: string[];
  author: string;
  category: string;
  description: string;
}

// Vercel-compatible markdown loading solution
const postModules = import.meta.glob("../posts/*.md", {
  as: "raw",
  eager: true,
});

const blogPosts = [
  {
    id: "firstpost",
    content: postModules["../posts/firstpost.md"],
  },
  {
    id: "secondpost",
    content: postModules["../posts/secondpost.md"],
  },
  {
    id: "thirdpost",
    content: postModules["../posts/thirdpost.md"],
  },
].filter((post) => post.content); // Filter out any missing posts

const defaultCoverImages = {
  firstpost:
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop",
  secondpost:
    "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=1964&auto=format&fit=crop",
  thirdpost:
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1470&auto=format&fit=crop",
};

function extractFrontMatter(content: string) {
  const parsed = fm(content);
  return {
    data: parsed.attributes as Record<string, any>,
    content: parsed.body.trim(),
  };
}

function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

function processPost(id: string, content: string): Post {
  const { data, content: mainContent } = extractFrontMatter(content);

  return {
    id,
    title: data.title || "Untitled Post",
    excerpt: data.description || mainContent.slice(0, 150) + "...",
    content: mainContent,
    coverImage:
      data.coverImage ||
      defaultCoverImages[id as keyof typeof defaultCoverImages],
    date: data.date || new Date().toISOString(),
    readTime: calculateReadingTime(mainContent),
    tags: data.tags || [],
    author: data.author || "Anonymous",
    category: data.category || "Uncategorized",
    description: data.description || "",
  };
}

export function getAllPosts(): Post[] {
  return blogPosts.map((post) => processPost(post.id, post.content));
}

export function getPostById(id: string): Post | null {
  const post = blogPosts.find((p) => p.id === id);
  if (!post) return null;
  return processPost(post.id, post.content);
}
