import type { MDXComponents } from "mdx/types";

// Case-study styling comes from the .prose-case wrapper; per-project components
// (Architecture, Stack, ProjectLinks) are passed in by the page.
const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
