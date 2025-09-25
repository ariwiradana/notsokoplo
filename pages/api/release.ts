// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { doc } from "@/lib/google-sheet";
import { Release } from "@/types/release";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Release[]>
) {
  await doc.loadInfo();
  const sheet = doc.sheetsById["1244060937"];
  const rows = await sheet.getRows();

  const data = rows.map((row) => ({
    url: row["_rawData"][0] || null,
    cover: row["_rawData"][1] || null,
    artist: row["_rawData"][2] || null,
    title: row["_rawData"][3] || null,
    caption: row["_rawData"][4] || null,
    video: row["_rawData"][5] || null,
    poster: row["_rawData"][6] || null,
    action_title: row["_rawData"][7] || null,
  }));

  res.status(200).json(data);
}
