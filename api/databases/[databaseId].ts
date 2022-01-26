import type { VercelRequest, VercelResponse } from '@vercel/node'
import 'dotenv/config'
import { Client } from '@notionhq/client'

const Notion = new Client({ auth: process.env.NOTION_API_TOKEN })

async function getDataFromDatabase(req: VercelRequest, res: VercelResponse) {
    const databaseId = req.query.databaseId as string

    const response = await Notion.databases.query({
        database_id: databaseId,
    })

    const json = JSON.stringify(response, undefined, 2)

    res.send(json)
}

export default allowCors(getDataFromDatabase)

function allowCors<T>(fn: (req: VercelRequest, res: VercelResponse) => Promise<T>) {
    return async function (req: VercelRequest, res: VercelResponse): Promise<T> {
        res.setHeader('Access-Control-Allow-Credentials', 'true')
        res.setHeader('Access-Control-Allow-Origin', '*')
        // another common pattern
        // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        )

        if (req.method === 'OPTIONS') {
            res.status(200).end()
            return
        }

        return await fn(req, res)
    }
}