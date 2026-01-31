import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function LoadingButton({
  children,
  onClick,
  className = "",
  variant,
  size,
  type = "button",
}: {
  children: React.ReactNode;
  onClick: () => Promise<any> | void;
  className?: string;
  variant?: any;
  size?: any;
  type?: "button" | "submit" | "reset";
}) {
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    try {
      setLoading(true);
      await onClick();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type={type}
      size={size}
      variant={variant}
      onClick={handle}
      disabled={loading}
      className={`${className}`}
    >
      {loading ? "..." : children}
    </Button>
  );
}
