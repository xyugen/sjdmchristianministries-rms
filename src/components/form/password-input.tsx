"use client";

import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";
import { Input, type InputProps } from "@/components/ui/input";

const PasswordInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="relative">
      <Input {...props} ref={ref} type={showPassword ? "text" : "password"} />

      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2"
        tabIndex={-1}
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <Eye className="h-5 w-5 text-primary transition-colors hover:text-primary/80" />
        ) : (
          <EyeOff className="h-5 w-5 text-primary transition-colors hover:text-primary/80" />
        )}
      </button>
    </div>
  );
});

PasswordInput.displayName = "Password Input";

export default PasswordInput;
