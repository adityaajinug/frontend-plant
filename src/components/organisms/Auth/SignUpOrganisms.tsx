import { InputMolecules } from "@/components/molecules/Input/InputMolecules";
import React, { useState } from "react";
import { LabelType, InputType } from "@/types/Input/input";
import { Button } from "@/components/atoms/Button/Button";
import { TitleAuthAtoms } from "@/components/atoms/Auth/TitleAuthAtoms";
import axios from "axios";
import Link from "next/link";
import { ModalAlertAtoms } from "@/components/atoms/Modals/ModalAlertAtoms";

export const SignUpOrganisms = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    password: "",
    phone: "",
  });
  const [PasswordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fullnameError, setFullnameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Reset error message when user starts typing again
    if (name === "email") setEmailError("");
    if (name === "fullname") setFullnameError("");
    if (name === "phone") setPhoneError("");
    if (name === "password") setPasswordError("");
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!formData.email.trim()) {
      setEmailError("The field email is required");
      return;
    }
    if (!formData.fullname.trim()) {
      setFullnameError("The field full name is required.");
      return;
    }

    // Additional validation for password (if needed)
    if (formData.password.length < 8) {
      setPasswordError("Password harus memiliki minimal 8 karakter.");
      return;
    }
    if (!formData.password.trim()) {
      setPasswordError("The field password is required.");
      return;
    }
    const data = new URLSearchParams();
    data.append("email", formData.email);
    data.append("fullname", formData.fullname);
    data.append("password", formData.password);
    data.append("phone", formData.phone);
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}/auth/register`,
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.status === 200) {
        setModalMessage(response.data.message || "Successful Registration");
        setIsSuccess(true);
      } else {
        setModalMessage("Registration failed. Please try again.");
        setIsSuccess(false);
      }
      setShowModal(true);
    } catch (error) {
      setModalMessage("Registration failed. Please try again.");
      setIsSuccess(false);
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="mt-[90px] flex flex-col gap-9 md:px-[143px] sm:px-20 px-3">
        <TitleAuthAtoms
          titleAuth={{
            title: "Sign Up",
            description: "Fill this form to complete registration",
          }}
        />
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-fourtheen w-full">
            <InputMolecules
              labelVal={{ labelName: "Email", idFor: "email" }}
              inputVal={{
                name: "email",
                id: "email",
                placeholder: "Email",
                type: "email",
                value: formData.email,
                error: emailError,
              }}
              onChange={handleChange}
            />
            <InputMolecules
              labelVal={{ labelName: "FullName", idFor: "fullname" }}
              inputVal={{
                name: "fullname",
                id: "fullname",
                placeholder: "Full Name",
                type: "text",
                value: formData.fullname,
                error: fullnameError,
              }}
              onChange={handleChange}
            />
            <InputMolecules
              labelVal={{ labelName: "Telephone", idFor: "phone" }}
              inputVal={{
                name: "phone",
                id: "phone",
                placeholder: "Telephone",
                type: "number",
                value: formData.phone,
                error: phoneError,
              }}
              onChange={handleChange}
            />
            <InputMolecules
              labelVal={{ labelName: "Password", idFor: "password" }}
              inputVal={{
                name: "password",
                id: "password",
                placeholder: "Password",
                type: "password",
                value: formData.password,
                error: PasswordError,
              }}
              onChange={handleChange}
            />
            <Button
              button={{
                text: "Sign Up",
                disabled: isLoading,
                isLoading: isLoading,
              }}
            />
          </div>
        </form>
        <span className="text-center text-base">
          Already have an Account?{" "}
          <Link href="/sign-in" className="text-black font-bold">
            Sign In
          </Link>
        </span>
      </div>
      <ModalAlertAtoms
        message={modalMessage}
        link="/sign-in"
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        isSuccess={isSuccess}
      />
    </>
  );
};
