import type { VercelRequest, VercelResponse } from '@vercel/node'
import 'dotenv/config'
import { Client } from '@notionhq/client'

const Notion = new Client({ auth: process.env.NOTION_API_TOKEN })

export default async function (req: VercelRequest, res: VercelResponse) {
    const databaseId = req.query.databaseId as string

    const response = await Notion.databases.query({
        database_id: databaseId,
    })

    const json = JSON.stringify(response, undefined, 2)

    res.send(json)
}