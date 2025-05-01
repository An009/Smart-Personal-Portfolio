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

const firstPostContent = await import("../posts/firstpost.md?raw").then(
  (m) => m.default
);
const secondPostContent = await import("../posts/secondpost.md?raw").then(
  (m) => m.default
);
const thirdPostContent = await import("../posts/thirdpost.md?raw").then(
  (m) => m.default
);

const blogPosts = [
  { id: "firstpost", content: firstPostContent },
  { id: "secondpost", content: secondPostContent },
  { id: "thirdpost", content: thirdPostContent },
];

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
    coverImage: defaultCoverImages[id as keyof typeof defaultCoverImages],
    date: data.date || new Date().toISOString(),
    readTime: calculateReadingTime(mainContent),
    tags: data.tags || [],
    author: data.author || "Anonymous",
    category: data.category || "Uncategorized",
    description: data.description || "",
  };
}

export async function getAllPosts(): Promise<Post[]> {
  return blogPosts.map((post) => processPost(post.id, post.content));
}

export async function getPostById(id: string): Promise<Post | null> {
  const post = blogPosts.find((p) => p.id === id);
  if (!post) return null;
  return processPost(post.id, post.content);
}
