import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: process.env.CLIENT_ID, // Get this from tina.io
  token: process.env.CONTENT_TOKEN, // Get this from tina.io

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "chapter",
        label: "Chapters",
        path: "src/content/chapters",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "synopsis",
            label: "Synopsis",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "Illustration",
                label: "Illustration",
                fields: [
                  {
                    name: "src",
                    label: "src",
                    type: "string",
                  },
                  {
                    name: "alt",
                    label: "alt",
                    type: "string"
                  },
                  {
                    name: "float",
                    lable: "float",
                    type: "string"
                  }
                ]
              }
            ]
          }
        ],
        ui: {
          // This is an DEMO router. You can remove this to fit your site
          router: ({ document }) => `/demo/blog/${document._sys.filename}`,
        },
      },
    ],
  },
});
