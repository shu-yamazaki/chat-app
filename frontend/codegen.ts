import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../backend/src/schema.gql", // backendのgqlを参照
  documents: ["./src/**/*.{ts,tsx,graphql}", "!./src/gql/**"], // front側のクエリを参照する範囲
  generates: {
    "./src/gql/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: "getFragmentData" },
      },
    },
  },
  // Date系を文字列にしてanyを避ける
  config: { scalars: { DateTime: "string" } },
};
export default config;
