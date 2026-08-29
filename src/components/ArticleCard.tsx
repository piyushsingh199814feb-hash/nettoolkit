import Link from "next/link";
import { Icon } from "./Icon";
import type { BlogPost } from "@/lib/blog";

interface ArticleCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function ArticleCard({ post, featured = false }: ArticleCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={[
        "group flex h-full flex-col rounded-xl border border-ink-200 bg-white p-5 transition-colors hover:border-brand-300 hover:bg-brand-50/40",
        featured ? "sm:p-7" : "",
      ].join(" ")}
    >
      <div className="flex items-center gap-2 text-xs">
        <span className="rounded-full bg-brand-50 px-2 py-0.5 font-medium text-brand-700">
          {post.category}
        </span>
        <span className="text-ink-500">{post.readTime} min read</span>
      </div>
      <h3
        className={[
          "mt-3 font-semibold tracking-tight text-ink-900 group-hover:text-brand-700",
          featured ? "text-2xl" : "text-lg",
        ].join(" ")}
      >
        {post.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm text-ink-600">{post.description}</p>
      <div className="mt-auto flex items-center justify-between pt-4 text-xs text-ink-500">
        <span>
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
        <span className="inline-flex items-center gap-1 text-brand-700 opacity-0 transition-opacity group-hover:opacity-100">
          Read
          <Icon name="arrow-right" size={14} />
        </span>
      </div>
    </Link>
  );
}
