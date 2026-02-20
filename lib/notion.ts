import { Client } from "@notionhq/client"

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export async function getBlocks(pageId: string) {
  return await notion.blocks.children.list({
    block_id: pageId,
  })
}