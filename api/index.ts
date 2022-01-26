import type { VercelRequest, VercelResponse } from '@vercel/node'
import 'dotenv/config'

const notionApiToken = process.env.NOTION_API_TOKEN

export default function (req: VercelRequest, res: VercelResponse) {
    const { name = 'World' } = req.query;
    res.send(`Hello ${name}!`);
}