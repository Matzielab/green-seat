import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "app/styles/MarkdownStyles.module.css";

export const GeneratedEnviromentalReport = ({ report }: { report: string }) => {
  return (
    <div className="border-t border-gray-600 px-4 py-6 sm:col-span-2 sm:px-0">
      <dt className="text-md font-extrabold leading-6 text-gray-50 mb-6">
        Generated report
      </dt>
      <dd
        className={`mt-1 text-sm leading-6 text-gray-100 border-solid border shadow-sm py-4 px-8 rounded-md border-gray-600 sm:mt-2 ${styles.markdownWrapper}`}
      >
        <Markdown remarkPlugins={[remarkGfm]}>{report}</Markdown>
      </dd>
    </div>
  );
};
