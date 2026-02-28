"use client";

import { usePathname } from "next/navigation";
import FloatingActions from "@/components/floating/FloatingActions";

export default function FloatingMount() {
  const pathname = usePathname();

  // Optional: hide floating actions on /contact
  const hideOnContact =
    pathname === "/contact" || pathname.startsWith("/contact/");

  if (hideOnContact) return null;

  return <FloatingActions />;
}