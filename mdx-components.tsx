import React, { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { highlight } from "sugar-high";

// --- Type Definitions ---
type HeadingProps = ComponentPropsWithoutRef<React.ElementType>;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul" | "ol">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;
type PreProps = ComponentPropsWithoutRef<"pre">;
type CodeProps = ComponentPropsWithoutRef<"code">;
type TableProps = ComponentPropsWithoutRef<"table">;
type TableCellProps = ComponentPropsWithoutRef<"td">;
type TableHeaderProps = ComponentPropsWithoutRef<"th">;
type TheadProps = ComponentPropsWithoutRef<"thead">;
type TbodyProps = ComponentPropsWithoutRef<"tbody">;
type EmProps = ComponentPropsWithoutRef<"em">;
type StrongProps = ComponentPropsWithoutRef<"strong">;
type HrProps = ComponentPropsWithoutRef<"hr">;

// Custom Table Component Prop Type (if you use the <Table data={...} /> component)
type CustomTableData = {
  headers: string[];
  rows: string[][];
};

// --- Base Styles (Assuming Dark Background) ---
// Use neutral-200 for slightly off-white, or text-white if preferred
const baseTextStyles = "text-neutral-200";
// Base heading style: white, semibold
const headingBaseStyles = "tracking-tight text-white font-semibold";

// --- Components Object ---
const components = {
  h1: (props: HeadingProps) => (
    <h1
      // Normal size, bold weight, standard margins, no border
      className={`${headingBaseStyles} mt-10 mb-6 text-3xl lg:text-4xl font-bold`}
      {...props}
    />
  ),
  h2: (props: HeadingProps) => (
    <h2
      // Normal size, semibold weight, standard margins, no border
      className={`${headingBaseStyles} mt-10 mb-4 text-2xl lg:text-3xl font-semibold`}
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      // Normal size, semibold weight, standard margins
      className={`${headingBaseStyles} mt-8 mb-3 text-xl lg:text-2xl font-semibold`}
      {...props}
    />
  ),
  h4: (props: HeadingProps) => (
    <h4
      // Normal size, semibold weight, standard margins
      className={`${headingBaseStyles} mt-6 mb-2 text-lg lg:text-xl font-semibold`}
      {...props}
    />
  ),
  h5: (props: HeadingProps) => (
    <h5
      // Normal size, semibold weight, standard margins
      className={`${headingBaseStyles} mt-5 mb-2 text-base lg:text-lg font-semibold`}
      {...props}
    />
  ),
  h6: (props: HeadingProps) => (
    <h6
      // Normal size, semibold weight, standard margins, slightly dimmer color
      className="tracking-tight text-neutral-400 mt-5 mb-2 text-base font-semibold"
      {...props}
    />
  ),
  p: (props: ParagraphProps) => (
    <p
      className={`${baseTextStyles} my-4 leading-relaxed text-base md:text-lg`}
      {...props}
    />
  ),
  ol: (props: ListProps) => (
    <ol
      className={`${baseTextStyles} list-decimal pl-6 my-4 space-y-1 md:text-lg`}
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className={`${baseTextStyles} list-disc pl-6 my-4 space-y-1 md:text-lg`}
      {...props}
    />
  ),
  li: (props: ListItemProps) => <li className="pl-1 mb-1" {...props} />,
  em: (props: EmProps) => <em className="italic" {...props} />,
  strong: (props: StrongProps) => (
    // Use bold for stronger emphasis if desired, or keep semibold
    <strong className="font-bold" {...props} />
  ),
  a: ({ href = "", children, ...props }: AnchorProps) => {
    // Adjusted link colors for dark background
    const baseLinkStyles = "font-medium text-blue-400 hover:text-blue-300";
    // Subtle underline decoration
    const underlineStyles =
      "underline underline-offset-4 decoration-blue-400/40 hover:decoration-blue-300/60";
    const className = `${baseLinkStyles} ${underlineStyles}`;

    if (href.startsWith("/")) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href.startsWith("#")) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    // External links
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
        {/* Optional: Add an external link icon */}
      </a>
    );
  },
  // Code blocks: ``` ```
  pre: (props: PreProps) => (
    <pre
      // Darker background for code blocks, no shadow
      className="bg-neutral-900 rounded-lg p-4 my-5 overflow-x-auto"
      {...props}
    />
  ),
  // Inline `code` and code within ``` ```
  code: ({ children, ...props }: CodeProps) => {
    const codeHTML = highlight(children as string);
    return (
      <code
        // Subtle background for inline code
        className="font-mono text-sm px-1.5 py-1 rounded bg-neutral-700/50"
        dangerouslySetInnerHTML={{ __html: codeHTML }}
        {...props}
      />
    );
  },
  // Standard Markdown tables: | Head | ... |
  table: (props: TableProps) => (
    <div className="my-5 overflow-x-auto">
      {/* Wrapper, no border or shadow */}
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  thead: (props: TheadProps) => (
    // Optional: Slight background difference for header row
    <thead className="bg-neutral-800/50" {...props} />
  ),
  tbody: (props: TbodyProps) => (
    // No dividing lines
    <tbody {...props} />
  ),
  th: (props: TableHeaderProps) => (
    <th
      // White text, semibold, padding, no border
      className="text-white px-4 py-3 text-left font-semibold"
      {...props}
    />
  ),
  td: (props: TableCellProps) => (
    // Base text color, padding, no border
    <td className={`${baseTextStyles} px-4 py-3 align-top`} {...props} />
  ),
  // Optional: Custom <Table data={...} /> component
  Table: ({ data }: { data: CustomTableData }) => (
    <div className="my-5 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-neutral-800/50">
          <tr>
            {data.headers.map((header, index) => (
              <th
                key={index}
                className="text-white px-4 py-3 text-left font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`${baseTextStyles} px-4 py-3 align-top`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      // Adjusted border color, background, text color for dark theme, no shadow
      className="my-5 border-l-4 border-neutral-600 bg-neutral-800/40 pl-4 pr-4 py-3 italic text-neutral-400"
      {...props}
    />
  ),
  hr: (props: HrProps) => (
    // Subtle horizontal line for separation
    <hr className="my-6 border-neutral-800" {...props} />
  ),
};

// --- Global Type Declaration & Hook ---
declare global {
  // eslint-disable-next-line no-unused-vars
  type MDXProvidedComponents = typeof components;
}

/**
 * Hook to provide styled components for use with MDX libraries
 * like `next-mdx-remote` or `@mdx-js/react`. Assumes a dark background.
 */
export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
