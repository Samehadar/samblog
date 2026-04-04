import { toString } from "mdast-util-to-string";

export default function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = Math.ceil(textOnPage.split(/\s+/).length / 200);
    data.astro.frontmatter.readingTime = readingTime;
  };
}
