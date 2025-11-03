// pages/api/music.ts
import { doc } from "@/lib/google-sheet";
import { Music, MusicGrouped } from "@/types/music";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MusicGrouped>
) {
  try {
    // Load Google Sheet
    await doc.loadInfo();
    const sheet = doc.sheetsById["1509457795"];
    const rows = await sheet.getRows();

    // Mapping row ke Music
    const musics: Music[] = rows.map((row) => ({
      key: row["_rawData"][0] || "",
      title: row["_rawData"][1] || "",
      artist: row["_rawData"][2] || "",
      cover: row["_rawData"][3] || "",
      preview: row["_rawData"][4] || "",
      soundcloud: row["_rawData"][5] || "",
      youtube: row["_rawData"][6] || "",
      url: row["_rawData"][7] || "",
      caption: row["_rawData"][8] || "",
    }));

    // Grouping berdasarkan key
    const groupedObj: Record<string, Music[]> = musics.reduce((acc, item) => {
      if (!item.key) return acc;
      if (!acc[item.key]) acc[item.key] = [];
      acc[item.key].push(item);
      return acc;
    }, {} as Record<string, Music[]>);

    // Convert ke array of grouped musics
    const groupedArray: MusicGrouped = Object.entries(groupedObj).map(
      ([key, musics]) => ({ key, musics })
    );

    res.status(200).json(groupedArray);
  } catch (error) {
    console.error("Error fetching musics:", error);
    res.status(500).json([]);
  }
}
