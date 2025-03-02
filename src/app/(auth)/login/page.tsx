import { type Metadata } from "next";
import LoginForm from "./_components/form";
import Image from "next/image";

import Logo from "@/assets/images/logo.jpg";

export const metadata: Metadata = {
  title: "Login",
};

const Page = () => {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="my-2 flex flex-col gap-2 rounded bg-blue-gem-900 p-2">
        <Image
          src={Logo}
          alt="Logo"
          width={200}
          height={200}
          className="mx-auto size-20 rounded-sm"
        />

        <h2 className="text-center text-xl font-bold leading-tight text-foreground !text-blue-gem-100 sm:text-2xl">
          SJDM Christian Ministries
        </h2>
      </div>

      <h3 className="text-center text-lg sm:text-xl font-semibold text-foreground">
        Please sign in to your account
      </h3>

      <LoginForm />
    </div>
  );
};

export default Page;
