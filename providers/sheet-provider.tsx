"use client";

import { useMountedState } from "react-use";
import { ViewProductSheet } from "@/features/products/components/view-product-sheet";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;
  return (
    <>
      <ViewProductSheet />
    </>
  )
}