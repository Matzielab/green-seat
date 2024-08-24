import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import React, { useState, useCallback } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FileInputProps {
  label: string;
  accept?: string;
  registration: Partial<UseFormRegisterReturn>;
  error?: string;
}

export const FileInput: React.FC<FileInputProps> = ({
  label,
  accept,
  registration,
  error,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDrag = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(e.type === "dragenter" || e.type === "dragover");
    },
    [setDragActive]
  );

  const handleFiles = useCallback(
    (files: FileList) => {
      setFileName(files[0].name);
      if (registration.onChange) {
        const event = {
          target: { files },
        } as React.ChangeEvent<HTMLInputElement>;
        registration.onChange(event);
      }
    },
    [registration]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFiles(e.target.files);
      }
    },
    [handleFiles]
  );

  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
        htmlFor={registration.name}
      >
        {label}
      </label>
      <div
        className={`mt-1 flex justify-center px-6 py-5 border-2 border-dashed rounded-md ${
          dragActive ? "border-emerald-500 bg-emerald-50" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <DocumentArrowUpIcon className="h-6 mb-2 mx-auto" />
          <label
            htmlFor={registration.name}
            className="flex text-sm justify-center relative cursor-pointer rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500"
          >
            {fileName ? (
              <span className="text-emerald-600">{fileName}</span>
            ) : (
              <span>Upload a file or drag and drop</span>
            )}
            <input
              id={registration.name}
              type="file"
              className="sr-only"
              accept={accept}
              {...registration}
              onChange={handleChange}
            />
          </label>
          {!fileName && (
            <p className="text-xs text-gray-500">
              {accept
                ? `Accepted file types: ${accept.split(",").join(", ")}`
                : "Any file type"}
            </p>
          )}
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};
