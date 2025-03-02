import { env } from "@/env";
<<<<<<< HEAD
=======
import { adminClient } from "better-auth/client/plugins";
>>>>>>> main
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL ?? "http://localhost:3000",
<<<<<<< HEAD
})
=======
  plugins: [adminClient()],
});
>>>>>>> main
