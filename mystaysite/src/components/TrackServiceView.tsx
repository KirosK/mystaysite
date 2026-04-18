"use client";

import { useEffect } from "react";
import { trackServiceView } from "@/lib/analytics";

export default function TrackServiceView({ name }: { name: string }) {
  useEffect(() => {
    trackServiceView(name);
  }, [name]);
  return null;
}
