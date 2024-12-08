"use client";

import UseQueryProvider from "./UseQuery";
import { ReduxProviders } from "@/store/provider";
import { Toaster } from "@/components/ui/toaster";
import { HOCLayout } from "./HOCLayout";
import { useInitialRender } from "@/hooks";

export function Providers({ children }: { children: React.ReactNode }) {
  const isInitialRenderComplete = useInitialRender();

  if (!isInitialRenderComplete) return null;

  return (
    <UseQueryProvider>
      <ReduxProviders>
        <HOCLayout>{children}</HOCLayout>
      </ReduxProviders>
      <Toaster />
    </UseQueryProvider>
  );
}
