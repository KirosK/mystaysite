import type { MDXComponents as MDXComponentsType } from "mdx/types";

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function prefixLocale(href: string | undefined, locale: string): string | undefined {
  if (!href) return href;
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return href;
  if (href.startsWith("#")) return href;
  if (href.startsWith(`/${locale}/`) || href === `/${locale}`) return href;
  if (href.startsWith("/el/") || href === "/el" || href.startsWith("/en/") || href === "/en") return href;
  if (href.startsWith("/")) {
    if (href === "/") return `/${locale}`;
    return `/${locale}${href}`;
  }
  return href;
}

export function buildMdxComponents(locale: string): MDXComponentsType {
  return {
    ...mdxComponents,
    a: ({ children, href, ...props }) => {
      const localized = prefixLocale(href, locale);
      return (
        <a
          href={localized}
          className="text-[#f57c51] font-medium hover:underline transition-colors"
          {...(href?.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...props}
        >
          {children}
        </a>
      );
    },
  };
}

export const mdxComponents: MDXComponentsType = {
  h2: ({ children, ...props }) => (
    <h2
      id={typeof children === "string" ? slugify(children) : undefined}
      className="text-2xl md:text-3xl font-bold text-[#1a1a2e] dark:text-white mt-12 mb-4 scroll-mt-24"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      id={typeof children === "string" ? slugify(children) : undefined}
      className="text-xl md:text-2xl font-semibold text-[#1a1a2e] dark:text-white mt-8 mb-3 scroll-mt-24"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="text-lg leading-[1.8] text-gray-700 dark:text-gray-300 mb-6" {...props}>
      {children}
    </p>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-[#f57c51] font-medium hover:underline transition-colors"
      {...(href?.startsWith("http")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc pl-6 space-y-2 mb-6 text-lg text-gray-700 dark:text-gray-300 marker:text-gray-400 dark:marker:text-gray-500" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal pl-6 space-y-2 mb-6 text-lg text-gray-700 dark:text-gray-300 marker:text-gray-400 dark:marker:text-gray-500" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-[1.8]" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-[#f57c51] pl-6 my-8 italic text-gray-600 dark:text-gray-300 text-lg"
      {...props}
    >
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto mb-6 rounded-xl border border-gray-200 dark:border-white/10">
      <table className="w-full text-left text-base" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white font-semibold" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th className="px-4 py-3 border-b border-gray-200 dark:border-white/10" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-3 border-b border-gray-100 dark:border-white/5 text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </td>
  ),
  tr: ({ children, ...props }) => (
    <tr className="even:bg-gray-50/50 dark:even:bg-white/[0.03]" {...props}>
      {children}
    </tr>
  ),
  img: ({ src, alt, ...props }) => (
    <figure className="my-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt || ""}
        loading="lazy"
        className="w-full rounded-xl shadow-sm dark:shadow-black/30"
        {...props}
      />
      {alt && (
        <figcaption className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-bold text-[#1a1a2e] dark:text-white" {...props}>
      {children}
    </strong>
  ),
  hr: () => <hr className="my-10 border-gray-200 dark:border-white/10" />,
};
