import React from "react";
interface InputType {
  name: string;
  type: string;
  id: string;
  placeholder: string;
  value: string;
  error: string;
}
interface InputProps {
  input: InputType;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const InputTextAtoms: React.FC<InputProps> = ({ input, onChange }) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <input
          type={input.type}
          name={input.name}
          id={input.id}
          placeholder={input.placeholder}
          value={input.value}
          className="border border-solid border-divider-500 p-ten rounded-lg w-full focus:outline-none"
          onChange={onChange}
          required
        />
        {input.error && (
          <small className="text-accent-base-400">{input.error}</small>
        )}
      </div>
    </>
  );
};
