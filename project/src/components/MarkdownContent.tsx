import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighterBase } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import { Components } from "react-markdown";

const SyntaxHighlighter = React.forwardRef((props, ref) => (
  <SyntaxHighlighterBase {...props} ref={ref} />
));

interface MarkdownContentProps {
  content: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  const components: Components = {
    code({ node, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const isInline =
        node &&
        node.type === "element" &&
        node.tagName === "code" &&
        node.properties?.className === undefined;

      return !isInline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          customStyle={{
            fontSize: "0.85rem",
            backgroundColor: "#1e1e1e",
            borderRadius: "0.5rem",
            margin: "1rem 0",
            border: "1px solid #3a3a3a",
          }}
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code
          className={`${className} bg-[#1e1e1e] text-[#d4d4d4] px-2 py-1 rounded-md border border-[#3a3a3a] font-mono text-sm`}
          {...props}
        >
          {children}
        </code>
      );
    },
    h1: ({ node, children, ...props }) => (
      <h1
        className="text-4xl font-bold my-6 text-gray-900 dark:text-gray-100"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ node, children, ...props }) => (
      <h2
        className="text-3xl font-semibold my-5 text-gray-800 dark:text-gray-200"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ node, children, ...props }) => (
      <h3
        className="text-2xl font-semibold my-4 text-gray-700 dark:text-gray-300"
        {...props}
      >
        {children}
      </h3>
    ),
    p: ({ node, children, ...props }) => (
      <p
        className="my-4 leading-relaxed text-gray-700 dark:text-gray-300"
        {...props}
      >
        {children}
      </p>
    ),
    ul: ({ node, children, ...props }) => (
      <ul
        className="list-disc list-inside my-4 space-y-1 text-gray-700 dark:text-gray-300"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ node, children, ...props }) => (
      <ol
        className="list-decimal list-inside my-4 space-y-1 text-gray-700 dark:text-gray-300"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ node, children, ...props }) => (
      <li className="my-1 pl-1 text-gray-700 dark:text-gray-300" {...props}>
        {children}
      </li>
    ),
    a: ({ node, children, ...props }) => (
      <a
        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors duration-200"
        {...props}
      >
        {children}
      </a>
    ),
    blockquote: ({ node, children, ...props }) => (
      <blockquote
        className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-r"
        {...props}
      >
        {children}
      </blockquote>
    ),
    table: ({ node, children, ...props }) => (
      <table
        className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 my-4"
        {...props}
      >
        {children}
      </table>
    ),
    thead: ({ node, children, ...props }) => (
      <thead className="bg-gray-50 dark:bg-gray-800" {...props}>
        {children}
      </thead>
    ),
    tbody: ({ node, children, ...props }) => (
      <tbody
        className="divide-y divide-gray-200 dark:divide-gray-700"
        {...props}
      >
        {children}
      </tbody>
    ),
    tr: ({ node, children, ...props }) => <tr {...props}>{children}</tr>,
    th: ({ node, children, ...props }) => (
      <th
        className="px-4 py-2 text-left text-gray-700 dark:text-gray-300 font-medium"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ node, children, ...props }) => (
      <td className="px-4 py-2 text-gray-700 dark:text-gray-300" {...props}>
        {children}
      </td>
    ),
    img: ({ node, children, ...props }) => (
      <img
        className="my-4 rounded-lg shadow-md max-w-full h-auto"
        {...props}
        alt={props.alt || ""}
      />
    ),
    hr: ({ node, children, ...props }) => (
      <hr className="my-6 border-gray-200 dark:border-gray-700" {...props} />
    ),
  };

  return (
    <div className="prose dark:prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;
