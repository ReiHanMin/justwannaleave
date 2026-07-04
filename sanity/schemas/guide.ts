import { defineField, defineType } from "sanity";

export default defineType({
  name: "guide",
  title: "Guide",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tag",
      title: "Tag",
      type: "string",
      options: {
        list: ["Italy", "Germany", "Japan", "Norway", "France", "Taiwan", "Guide"],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagColor",
      title: "Tag colour",
      type: "string",
      options: {
        list: [
          { title: "Green (Italy)", value: "green" },
          { title: "Amber (Germany)", value: "amber" },
          { title: "Dark (Japan)", value: "ink" },
          { title: "Terra (General)", value: "terra" },
        ],
      },
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "One or two sentences shown in the card and as meta description.",
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: "readTime",
      title: "Read time",
      type: "string",
      placeholder: "8 min",
    }),
    defineField({
      name: "publishedAt",
      title: "Published / updated",
      type: "datetime",
    }),
    defineField({
      name: "body",
      title: "Body",
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
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (r) =>
                      r.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: "object",
          name: "callout",
          title: "Callout box",
          fields: [
            { name: "tone", type: "string", options: { list: ["info", "warning", "tip"] } },
            { name: "text", type: "text" },
          ],
          preview: { select: { title: "text" } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "tag" },
  },
  orderings: [
    { title: "Newest first", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
});
