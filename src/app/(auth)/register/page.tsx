import Logo from "@/assets/images/logo.jpg";
import { type Metadata } from "next";
import Image from "next/image";
import RegisterForm from "./_components/form";
import { api } from "@/trpc/server";
import { PageRoutes } from "@/constants/page-routes";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Register",
};

const Page = async () => {
  const userCount = await api.auth.getAllUserCount();

  if (userCount === null || userCount === undefined) {
    console.error("Failed to fetch user count");
    return <div>Error occurred while fetching user count</div>;
  }

  if (userCount >= 1) {
    redirect(PageRoutes.LOGIN);
  }

  return (
    <div className="mx-auto w-full max-w-md rounded bg-white p-4">
      <div className="my-2 flex flex-col gap-2 rounded-sm bg-blue-gem-900 p-2">
        <Image
          src={Logo}
          alt="Logo"
          width={200}
          height={200}
          className="mx-auto size-20"
        />

        <h2 className="text-center text-xl font-bold leading-tight !text-blue-gem-100 text-foreground sm:text-2xl">
          SJDM Christian Ministry
        </h2>
      </div>

      <h3 className="text-center text-lg font-semibold text-foreground sm:text-xl">
        Please create an admin account
      </h3>

      <RegisterForm />
    </div>
  );
};

export default Page;
