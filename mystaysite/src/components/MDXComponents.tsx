import type { MDXComponents as MDXComponentsType } from "mdx/types";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export const mdxComponents: MDXComponentsType = {
  h2: ({ children, ...props }) => (
    <h2
      id={typeof children === "string" ? slugify(children) : undefined}
      className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mt-12 mb-4 scroll-mt-24"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      id={typeof children === "string" ? slugify(children) : undefined}
      className="text-xl md:text-2xl font-semibold text-[#1a1a2e] mt-8 mb-3 scroll-mt-24"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="text-lg leading-[1.8] text-gray-700 mb-6" {...props}>
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
    <ul className="list-disc pl-6 space-y-2 mb-6 text-lg text-gray-700" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal pl-6 space-y-2 mb-6 text-lg text-gray-700" {...props}>
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
      className="border-l-4 border-[#f57c51] pl-6 my-8 italic text-gray-600 text-lg"
      {...props}
    >
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto mb-6 rounded-xl border border-gray-200">
      <table className="w-full text-left text-base" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-gray-50 text-gray-900 font-semibold" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th className="px-4 py-3 border-b border-gray-200" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-3 border-b border-gray-100" {...props}>
      {children}
    </td>
  ),
  tr: ({ children, ...props }) => (
    <tr className="even:bg-gray-50/50" {...props}>
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
        className="w-full rounded-xl shadow-sm"
        {...props}
      />
      {alt && (
        <figcaption className="text-sm text-gray-500 mt-2 text-center">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-bold text-[#1a1a2e]" {...props}>
      {children}
    </strong>
  ),
  hr: () => <hr className="my-10 border-gray-200" />,
};
