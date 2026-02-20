import { getBlocks } from "@/lib/notion"

export default async function Home() {
  const data = await getBlocks(process.env.NOTION_PAGE_ID!)

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        My Notion Website
      </h1>

      {data.results.map((block: any) => {
        if (block.type === "paragraph") {
          return (
            <p key={block.id} className="mb-4">
              {block.paragraph.rich_text
                .map((text: any) => text.plain_text)
                .join("")}
            </p>
          )
        }

        if (block.type === "heading_1") {
          return (
            <h1 key={block.id} className="text-2xl font-bold mb-4">
              {block.heading_1.rich_text
                .map((text: any) => text.plain_text)
                .join("")}
            </h1>
          )
        }

        return null
      })}
    </main>
  )
}