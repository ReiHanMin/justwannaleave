import { defineField, defineType } from "sanity";

export default defineType({
  name: "country",
  title: "Country",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "code", title: "ISO code (2-letter)", type: "string", validation: (r) => r.required().max(2) }),
    defineField({ name: "hook", title: "Hook (short)", type: "string", description: 'e.g. "pays your rent"' }),
    defineField({ name: "tier", title: "Tier label", type: "string", description: 'e.g. "The famous one"' }),
    defineField({ name: "blurb", title: "Card blurb (1–2 sentences)", type: "text", rows: 2 }),
    defineField({ name: "headline", title: "Headline figure", type: "string", description: 'e.g. "Up to €6,600/yr stipend"' }),
    defineField({ name: "catch", title: "The catch", type: "string" }),
    defineField({
      name: "body",
      title: "Full country guide",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "relatedGuides",
      title: "Related guides",
      type: "array",
      of: [{ type: "reference", to: [{ type: "guide" }] }],
    }),
  ],
  preview: { select: { title: "name", subtitle: "code" } },
});
