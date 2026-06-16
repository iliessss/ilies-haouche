import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github-dark.css";

/**
 * Rend du Markdown en HTML stylé.
 * Gère : titres, listes, tableaux (GFM), équations LaTeX ($...$ et $$...$$),
 * blocs de code colorés, liens, images, citations.
 */
export default function Markdown({ children }: { children: string }) {
  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex, rehypeHighlight]}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
