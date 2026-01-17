import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";

interface PageProps {
  params: {
    slug: string[];
  };
}

function getMarkdownContent(slug: string[]): { content: string; data: any } | null {
  try {
    const docsPath = path.join(process.cwd(), "content", "library", ...slug);
    const mdPath = `${docsPath}.md`;

    if (fs.existsSync(mdPath)) {
      const fileContents = fs.readFileSync(mdPath, "utf8");
      const { data, content } = matter(fileContents);
      return { content, data };
    }
  } catch (error) {
    console.error("Error reading markdown file:", error);
  }

  return null;
}

export default function LibraryPage({ params }: PageProps) {
  const markdownData = getMarkdownContent(params.slug);

  if (!markdownData) {
    notFound();
  }

  const { content, data } = markdownData;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {data.title && (
        <h1
          className="text-4xl font-bold mb-6"
          style={{
            fontFamily: "var(--font-cormorant)",
            color: "var(--makra-foreground-dark)",
          }}
        >
          {data.title}
        </h1>
      )}
      {data.description && (
        <p
          className="text-lg mb-8 text-opacity-80"
          style={{
            fontFamily: "var(--font-open-sans)",
            color: "var(--makra-foreground-dark-100)",
          }}
        >
          {data.description}
        </p>
      )}
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  const basePath = path.join(process.cwd(), "content", "library");
  const params: { slug: string[] }[] = [];

  function traverseDir(dir: string, currentSlug: string[] = []) {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          traverseDir(fullPath, [...currentSlug, entry.name]);
        } else if (entry.name.endsWith(".md")) {
          const slug = entry.name.replace(/\.md$/, "");
          params.push({ slug: [...currentSlug, slug] });
        }
      }
    } catch (error) {
      console.error("Error traversing directory:", error);
    }
  }

  if (fs.existsSync(basePath)) {
    traverseDir(basePath);
  }

  return params;
}

