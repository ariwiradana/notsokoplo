// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { doc } from "@/lib/google-sheet";
import { Client } from "@/types/clients";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Client[]>
) {
  await doc.loadInfo();
  const sheet = doc.sheetsById["214723879"];
  const rows = await sheet.getRows();

  const data = rows.map((row) => ({
    name: row["_rawData"][0] || null,
    image: row["_rawData"][1] || null,
  }));

  res.status(200).json(data);
}
