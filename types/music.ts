export interface Music {
  key: string;
  title: string;
  artist: string;
  cover: string;
  preview: string;
  soundcloud: string;
  youtube: string;
  url: string;
  caption?: string;
}


export type MusicGrouped = {
  key: string;
  musics: Music[];
}[];
