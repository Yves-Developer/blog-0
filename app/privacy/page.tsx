import fs from "fs";
import path from "path";
import Markdown from "react-markdown";

export default function PrivacyPolicy() {
  const filePath = path.join(process.cwd(), "PRIVACY_POLICY.md");
  const content = fs.readFileSync(filePath, "utf8");

  return (
    <div className="prose mx-auto py-10">
      <Markdown>{content}</Markdown>
    </div>
  );
}

