export interface Music {
  key: string;
  kind: "single" | "album";
  title: string;
  artist: string;
  cover: string;
  preview: string;
  soundcloud: string;
  youtube: string;
  applemusic: string;
  spotify: string;
  tidal: string;
  youtubemusic: string;
  deezer: string;
  amazonmusic: string;
}

export type MusicGrouped = {
  key: string;
  musics: Music[];
}[];
