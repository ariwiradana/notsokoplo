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
    const data: Music[] = rows.map((row) => ({
      key: row["_rawData"][0] || "",
      kind: row["_rawData"][1] || "",
      title: row["_rawData"][2] || "",
      artist: row["_rawData"][3] || "",
      cover: row["_rawData"][4] || "",
      preview: row["_rawData"][5] || "",
      soundcloud: row["_rawData"][6] || "",
      youtube: row["_rawData"][7] || "",
      applemusic: row["_rawData"][8] || "",
      spotify: row["_rawData"][9] || "",
      tidal: row["_rawData"][10] || "",
      youtubemusic: row["_rawData"][11] || "",
      deezer: row["_rawData"][12] || "",
      amazonmusic: row["_rawData"][13] || "",
    }));


    // Grouping berdasarkan key
    const groupedObj: Record<string, Music[]> = data.reduce((acc, item) => {
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
