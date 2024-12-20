export interface Video {
  url: string;
  orientation: "landscape" | "potrait" | null;
  type: "youtube" | "cloudinary" | null;
}
