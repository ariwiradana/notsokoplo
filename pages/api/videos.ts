// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { doc } from "@/lib/google-sheet";
import { Video } from "@/types/video";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Video[]>
) {
  await doc.loadInfo();
  const sheet = doc.sheetsById["100506234"];
  const rows = await sheet.getRows();

  const data = rows.map((row) => ({
    id: row["_rawData"][0] || null,
    source: row["_rawData"][1] || null,
  }));

  res.status(200).json(data);
}
