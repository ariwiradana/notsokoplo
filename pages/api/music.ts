// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { doc } from "@/lib/google-sheet";
import { Music } from "@/types/music";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Music[]>
) {
  await doc.loadInfo();
  const sheet = doc.sheetsById["1509457795"];
  const rows = await sheet.getRows();

  const data = rows.map((row) => ({
    title: row["_rawData"][0] || null,
    artist: row["_rawData"][1] || null,
    cover: row["_rawData"][2] || "",
    url: row["_rawData"][3] || null,
  }));

  res.status(200).json(data);
}
