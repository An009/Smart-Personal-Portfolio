import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { getPostById } from "../lib/posts";
import type { Post } from "../lib/posts";
import MarkdownContent from "../components/MarkdownContent";
import { ProfileImage } from "../components/ProfileImage";

export function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        if (!id) {
          throw new Error("Post ID is required");
        }

        const postData = await getPostById(id);
        if (!postData) {
          throw new Error("Post not found");
        }

        setPost(postData);
        setError(null);
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch blog post"
        );
        setPost(null);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 transition-colors duration-300">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 transition-colors duration-300">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            {error || "Blog post not found"}
          </h1>
          <Link
            to="/blog"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
          >
            Return to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 transition-colors duration-300">
      <div className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/70">
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <Link
            to="/blog"
            className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          <article className="prose prose-lg dark:prose-invert max-w-none">
            {post.coverImage && (
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-64 object-cover rounded-xl mb-8 shadow-lg"
              />
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {format(new Date(post.date), "MMMM d, yyyy")}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {post.readTime}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-colors duration-300">
              <MarkdownContent content={post.content} />
            </div>

            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
                About the Author
              </h3>
              <div className="flex flex-col sm:flex-row items-start gap-6 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg transition-colors duration-300">
                <ProfileImage
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
                  alt="Profile"
                  size="w-32 h-32 rounded-full"
                />
                <div className="flex-1">
                  <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    Tizgui Anouar
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    A passionate Software Developer and technologist exploring
                    the intersections of code and creativity.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
