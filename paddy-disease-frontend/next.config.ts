import type { NextConfig } from "next";
import { withHydrationOverlay } from "@builder.io/react-hydration-overlay/next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default withHydrationOverlay({
  appRootSelector: "main",
})(nextConfig);
