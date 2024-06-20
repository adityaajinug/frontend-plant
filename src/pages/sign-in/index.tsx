import { HeadPage } from "@/components/atoms/HeadPage";
import { SignInTemplates } from "@/components/templates/Layouts/SignInTemplates";
import React from "react";

const SignIn = () => {
  return (
    <>
      <HeadPage title="Sign In" />
      <SignInTemplates />
    </>
  );
};
export default SignIn;
