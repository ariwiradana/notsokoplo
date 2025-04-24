// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { doc } from "@/lib/google-sheet";
import { Popup } from "@/types/popup";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Popup[]>
) {
  await doc.loadInfo();
  const sheet = doc.sheetsById["1244060937"];
  const rows = await sheet.getRows();

  const data = rows.map((row) => ({
    url: row["_rawData"][0] || null,
  }));

  res.status(200).json(data);
}
