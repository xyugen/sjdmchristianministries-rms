import { type Metadata } from "next";
import LoginForm from "./_components/form";

export const metadata: Metadata = {
  title: "Login",
};

const Page = () => {
  return (
    <div className="mx-auto w-full max-w-md">
      <h2 className="text-3xl font-bold text-center leading-tight text-foreground sm:text-4xl mb-4">
        Login to your account!
      </h2>

      <LoginForm />
    </div>
  );
};

export default Page;
