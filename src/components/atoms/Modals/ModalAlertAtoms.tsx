import Link from "next/link";
import React from "react";
interface ModalAlertAtomsProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
  link: string;
  isSuccess?: boolean;
}
export const ModalAlertAtoms: React.FC<ModalAlertAtomsProps> = ({
  isVisible,
  onClose,
  message,
  link,
  isSuccess,
}) => {
  if (!isVisible) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center backdrop-blur-sm">
        <div className="w-[300px] h-fit bg-white flex flex-col gap-[40px] items-center px-5 py-6 rounded-[18px]">
          <div>
            <img
              src={
                isSuccess ? "/icon/popup/checked.svg" : "/icon/popup/cancel.svg"
              }
              alt={isSuccess ? "success" : "error"}
            />
          </div>

          <h1 className="font-semibold text-lg text-center">{message}</h1>
          <Link
            href={link}
            className="py-[10px] px-8 bg-primary-800 rounded-[6px] w-full text-white font-semibold hover:bg-primary-700 active:scale-90 transition-all duration-300 text-base text-center"
            onClick={() => onClose()}
          >
            Got It
          </Link>
        </div>
      </div>
    </>
  );
};
