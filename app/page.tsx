import { getBlocks } from "@/lib/notion"

export default async function Home() {
  const data = await getBlocks(process.env.NOTION_PAGE_ID!)

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Night Runner's space
      </h1>

      {data.results.map((block: any) => {
        // PARAGRAPH
        if (block.type === "paragraph") {
          return (
            <p key={block.id} className="mb-4">
              {block.paragraph.rich_text
                .map((text: any) => text.plain_text)
                .join("")}
            </p>
          )
        }

        // HEADING
        if (block.type === "heading_1") {
          return (
            <h1 key={block.id} className="text-2xl font-bold mb-4">
              {block.heading_1.rich_text
                .map((text: any) => text.plain_text)
                .join("")}
            </h1>
          )
        }

        // ✅ IMAGE (THIS WAS MISSING)
        if (block.type === "image") {
          let imageUrl = ""

          if (block.image.type === "external") {
            imageUrl = block.image.external.url
          } else if (block.image.type === "file") {
            imageUrl = block.image.file.url
          }

          if (!imageUrl) return null

          return (
            <img
              key={block.id}
              src={imageUrl}
              alt="Notion image"
              className="mb-6 rounded-lg"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )
        }

        return null
      })}
    </main>
  )
}
