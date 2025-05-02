// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { doc } from "@/lib/google-sheet";
import { Image } from "@/types/image";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Image[]>
) {
  await doc.loadInfo();
  const sheet = doc.sheetsById["121834622"];
  const rows = await sheet.getRows();

  const data = rows.map((row) => ({
    url: row["_rawData"][0] || null,
    section: row["_rawData"][1] || null,
  }));

  res.status(200).json(data);
}
