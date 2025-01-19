"use client";

import { NextUIProvider } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();

  return (
    <NextUIProvider>
      {children}
      <Toaster
        position="top-center"
        reverseOrder={true}
      />
    </NextUIProvider>
  );
}