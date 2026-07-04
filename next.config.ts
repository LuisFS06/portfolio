import type { NextConfig } from "next";

// En GitHub Actions el sitio se sirve desde https://<usuario>.github.io/<repo>/,
// por lo que basePath/assetPrefix deben apuntar a la subruta del repositorio.
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isCI = !!process.env.GITHUB_ACTIONS;
const basePath = isCI && repoName ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: { unoptimized: true },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
