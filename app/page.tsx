import { getBlocks } from "@/lib/notion"

export default async function Home() {
  const data = await getBlocks(process.env.NOTION_PAGE_ID!)

  const renderedBlocks = await Promise.all(
    data.results.map(async (block: any) => {

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

      // IMAGE
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

      // ✅ TABLE
      if (block.type === "table") {
        const tableRows = await getBlocks(block.id)

        return (
          <table
            key={block.id}
            className="table-auto border-collapse border border-gray-400 mb-6"
          >
            <tbody>
              {tableRows.results.map((row: any) => (
                <tr key={row.id}>
                  {row.table_row.cells.map((cell: any, i: number) => (
                    <td
                      key={i}
                      className="border border-gray-400 px-4 py-2"
                    >
                      {cell.map((text: any) => text.plain_text).join("")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )
      }

      return null
    })
  )

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        My Notion Website
      </h1>

      {renderedBlocks}
    </main>
  )
}
