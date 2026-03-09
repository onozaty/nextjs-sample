// @ts-check
/** @type {import("@onozaty/prisma-schema-fixer").Config} */
const config = {
  rules: {
    "model-name": [
      {
        case: "pascal",
        form: "singular",
      },
    ],
    "model-map": [
      {
        case: "snake",
        form: "plural",
      },
    ],
    "field-name": [
      {
        case: "camel",
      },
    ],
    "field-map": [
      {
        case: "snake",
      },
    ],
    "enum-name": [
      {
        case: "pascal",
        form: "singular",
      },
    ],
    "enum-map": [
      {
        case: "snake",
        form: "plural",
      },
    ],
  },
};

export default config;
