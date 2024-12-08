// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { doc } from "@/lib/google-sheet";
import { Show } from "@/types/show";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Show[]>
) {
  await doc.loadInfo();
  const sheet = doc.sheetsById[0];
  const rows = await sheet.getRows();

  const data = rows.map((row) => ({
    event: row["_rawData"][0] || null,
    date: row["_rawData"][1] || null,
    address: row["_rawData"][2] || "-",
    link: row["_rawData"][3] || null,
    category: row["_rawData"][4] || null,
  }));

  res.status(200).json(data);
}
