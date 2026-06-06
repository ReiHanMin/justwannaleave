import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Workaround for Next.js 16.1.6 regression: generateBuildId is called without a
  // null-check, so it must be explicitly set. Returning null causes the framework
  // to fall back to its built-in nanoid generator (the default behaviour).
  generateBuildId: async () => null,
  // Workaround for Next.js 16.1.6 regression: findRootDirAndLockFiles walks up
  // the directory tree and may find a spurious lock file in an ancestor directory,
  // causing Turbopack to set rootPath outside the project and fail validation.
  // Pinning outputFileTracingRoot to the project dir bypasses that lookup entirely.
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
