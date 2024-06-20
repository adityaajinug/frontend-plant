import { InputMolecules } from "@/components/molecules/Input/InputMolecules";
import React, { useState } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { TitleAuthAtoms } from "@/components/atoms/Auth/TitleAuthAtoms";
import axios from "axios";
import Link from "next/link";
import { ModalAlertAtoms } from "@/components/atoms/Modals/ModalAlertAtoms";
import { useAuth } from "@/utils/AuthContext";
export const SignInOrganisms = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [PasswordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Reset error message when user starts typing again
    if (name === "email") setEmailError("");
    if (name === "password") setPasswordError("");
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!formData.email.trim()) {
      setEmailError("The field email is required");
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
    data.append("password", formData.password);
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}/auth/login`,
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.status === 200) {
        login(response.data.data.email, response.data.data.token);
        setModalMessage(response.data.message || "Successful Login");
        setIsSuccess(true);
      } else {
        setModalMessage("Login failed. Please try again.");
        setIsSuccess(false);
      }
      setShowModal(true);
    } catch (error) {
      setModalMessage("Login failed. Please try again.");
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
            title: "Sign In",
            description: "Fill this form to login this website",
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
                text: "Sign In",
                disabled: isLoading,
                isLoading: isLoading,
              }}
            />
          </div>
          <div className="text-center text-base w-full mt-2">
            Lost Your Password?{" "}
            <Link href="/sign-up" className="text-black font-bold">
              Forgot Password
            </Link>
          </div>
        </form>
        <span className="text-center text-base">
          Do not have an account?{" "}
          <Link href="/sign-up" className="text-black font-bold">
            Sign Up
          </Link>
        </span>
      </div>
      <ModalAlertAtoms
        message={modalMessage}
        link="/"
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        isSuccess={isSuccess}
      />
    </>
  );
};
