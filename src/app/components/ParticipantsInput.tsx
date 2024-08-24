import React, { useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface ParticipantsInputProps {
  label: string;
  registration: Partial<UseFormRegisterReturn>;
  defaultValue?: string[];
  error?: string;
}

export const ParticipantsInput: React.FC<ParticipantsInputProps> = ({
  label,
  registration,
  defaultValue,
  error,
}) => {
  const [participants, setParticipants] = useState<string[]>(
    defaultValue || []
  );
  const [inputValue, setInputValue] = useState("");

  const addParticipant = () => {
    if (inputValue.trim()) {
      const newParticipants = [...participants, inputValue.trim()];
      setParticipants(newParticipants);
      setInputValue("");
    }
  };

  const removeParticipant = (index: number) => {
    const newParticipants = participants.filter((_, i) => i !== index);
    setParticipants(newParticipants);
  };

  useEffect(() => {
    if (registration.onChange) {
      registration.onChange({
        target: { value: participants, name: registration.name },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  }, [registration, participants]);

  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-50 mb-1"
        htmlFor={registration.name}
      >
        {label}
      </label>
      <div className="flex mb-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={(e) => (e.target.value ? addParticipant() : null)}
          className="bg-gray-700 flex-grow mt-1 block w-full rounded-l-md border-gray-500 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm text-white"
          placeholder="Enter participant name"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addParticipant();
            }
          }}
        />
        <button
          type="button"
          onClick={addParticipant}
          className="mt-1 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-r-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <input
        type="hidden"
        {...registration}
        value={JSON.stringify(participants)}
      />
      {participants.length > 0 && (
        <ul className="mt-2 divide-y divide-gray-500 border border-gray-500 rounded-md bg-gray-700">
          {participants.map((participant, index) => (
            <li
              key={index}
              className="flex items-center justify-between py-2 px-4"
            >
              <span className="text-sm text-gray-50">{participant}</span>
              <button
                type="button"
                onClick={() => removeParticipant(index)}
                className="text-red-600 hover:text-red-500"
              >
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};
