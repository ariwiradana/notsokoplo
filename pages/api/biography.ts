// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { doc } from "@/lib/google-sheet";
import { Biography } from "@/types/Biography";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Biography[]>
) {
  await doc.loadInfo();
  const sheet = doc.sheetsById["1934597268"];
  const rows = await sheet.getRows();

  const data = rows.map((row) => ({
    image: row["_rawData"][0] || null,
    title: row["_rawData"][1] || null,
    description: row["_rawData"][2] || null,
  }));

  res.status(200).json(data);
}
