export function getExcerpt(content, length = 120) {
  if (!content) return "";
  if (typeof content === "string") return content.slice(0, length);

  const text = content
    .map((block) => {
      if (block.children && Array.isArray(block.children)) {
        return block.children
          .map((child) => (typeof child.text === "string" ? child.text : ""))
          .join("");
      }
      return "";
    })
    .join(" ");
  return text.slice(0, length);
}
