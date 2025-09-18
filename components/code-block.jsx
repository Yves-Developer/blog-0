import { useState } from "react";
import hljs from "highlight.js";

export default function CodeBlock({ codeText }) {
  const [copied, setCopied] = useState(false);

  const highlighted = hljs.highlightAuto(codeText).value;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <code
      dangerouslySetInnerHTML={{ __html: highlighted }}
      className="hljs text-sm"
    />
  );
}
