import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

let eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

if (process.env.NODE_ENV === "production") {
  eslintConfig = [
    ...eslintConfig,
    {
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "react-hooks/exhaustive-deps": "off",
        "@next/next/no-img-element": "off",
      },
    },
  ];
}

export default eslintConfig;
