import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import React, { useState, useCallback } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { fileSizeToHumanReadable } from "libs/fileSizeToHumanReadable";
import { ALL_ACCEPTED_TYPES } from "consts/AcceptedFileTypes";

interface MultiFileInputProps {
  label: string;
  registration: Partial<UseFormRegisterReturn>;
  reset: () => void;
  setValue: (value: FileList) => void;
  defaultFiles?: File[];
  error?: string;
}

export const MultiFileInput: React.FC<MultiFileInputProps> = ({
  label,
  registration,
  reset,
  setValue,
  defaultFiles,
  error,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>(defaultFiles || []);

  const handleFiles = useCallback(
    (newFileList: FileList) => {
      console.log(newFileList);
      const newFiles = [...files, ...Array.from(newFileList)];
      setFiles(newFiles);
    },
    [files]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.target.files && e.target.files.length > 0) {
        handleFiles(e.target.files);
      }
    },
    [handleFiles]
  );
  const handleDrag = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(e.type === "dragenter" || e.type === "dragover");
    },
    [setDragActive]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
        setValue(e.dataTransfer.files);
      }
    },
    [handleFiles, setValue]
  );

  return (
    <div>
      <input
        id={registration.name}
        type="file"
        className="sr-only"
        accept={ALL_ACCEPTED_TYPES.join(",")}
        multiple
        {...registration}
        onChange={handleChange}
      />
      <label
        className="block text-sm font-medium text-gray-50 mb-1"
        htmlFor={registration.name}
      >
        {label}
      </label>
      {files.length <= 0 ? (
        <div
          className={`mt-1 flex justify-center px-6 py-10 border-2 border-dashed rounded-md bg-gray-700 ${
            dragActive ? "border-emerald-500 bg-emerald-50" : "border-gray-300"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <DocumentArrowUpIcon className="h-6 mb-2 mx-auto text-white" />
            <label
              htmlFor={registration.name}
              className="flex text-sm justify-center relative cursor-pointer rounded-md font-medium text-emerald-400 hover:text-emerald-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-500"
            >
              <span>Select files or drag and drop</span>
            </label>

            <p className="text-xs text-gray-300">
              {"Videos, Images, Audio and Text Documents are accepted"}
            </p>
          </div>
        </div>
      ) : (
        <>
          <ul className="mt-2 divide-y divide-gray-500 border border-gray-500 rounded-md bg-gray-700">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between py-2 px-4"
              >
                <div className="flex items-center">
                  <span className="text-sm text-gray-50">{file.name}</span>
                  <span className="ml-2 text-xs text-gray-400">
                    {fileSizeToHumanReadable(file.size)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div>
            <button
              type="button"
              onClick={() => {
                reset();
                setFiles([]);
              }}
              className="px-4 py-1 mt-2 bg-red-700 text-gray-50 rounded-md hover:bg-red-700 text-sm"
            >
              Remove Files
            </button>
          </div>
        </>
      )}

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};
