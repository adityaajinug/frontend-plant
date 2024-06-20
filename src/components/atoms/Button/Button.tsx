import React from "react";
interface ButtonType {
  text: string;
  disabled?: boolean;
  isLoading?: boolean;
}
interface ButtonProps {
  button: ButtonType;
}
export const Button: React.FC<ButtonProps> = ({ button }) => {
  return (
    <>
      <button
        type="submit"
        className={`py-[10px] px-8 ${
          button.isLoading
            ? "bg-divider-500 hover:bg-divider-500"
            : "bg-primary-800 hover:bg-primary-700"
        } rounded-[6px] w-full text-white font-semibold  active:scale-90 transition-all duration-300`}
        disabled={button.disabled}
      >
        {button.isLoading ? (
          <img
            src="/icon/loading.gif"
            alt="Loading"
            className="h-6 w-12 mx-auto"
          />
        ) : (
          button.text
        )}
      </button>
    </>
  );
};
