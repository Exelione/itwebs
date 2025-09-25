import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { title } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
        const id = Math.floor(Math.random() * 1000000).toString();

        return res.status(200).json({ id, title });
    } catch (e) {
        return res.status(400).json({ message: "Bad Request", error: e });
    }
}
