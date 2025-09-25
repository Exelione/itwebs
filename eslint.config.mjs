import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        ignores: [
            "node_modules/**",
            ".next/**",
            "out/**",
            "build/**",
            "next-env.d.ts",
        ],
    },
    {
        rules: {
            "indent": "off",
            "semi": ["error", "always"],
            "space-before-blocks": "error",
            "no-trailing-spaces": "error",
            "no-multi-spaces": ["error", { ignoreEOLComments: false }],
            "quotes": ["error", "double", { avoidEscape: true }],
            "import/order": [
                "error",
                {
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        "parent",
                        "sibling",
                        "index",
                        "type",
                        "unknown",
                    ],
                    pathGroups: [
                        {
                            pattern: "**/*.css",
                            group: "unknown",
                            position: "after",
                        },
                        {
                            pattern: "**/*.scss",
                            group: "unknown",
                            position: "after",
                        },
                    ],
                    pathGroupsExcludedImportTypes: ["builtin"],
                    "newlines-between": "never",
                    alphabetize: { order: "asc", caseInsensitive: true },
                },
            ],
        }
    },
];

export default eslintConfig;
