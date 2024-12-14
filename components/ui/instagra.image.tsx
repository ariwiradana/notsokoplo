import React from "react";

interface InstagramImageProps {
  url: string;
}

const InstagramImage = ({ url }: InstagramImageProps) => {
  return (
    <div>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={`https://www.instagram.com/p/${url}/`}
        data-instgrm-version="12"
      ></blockquote>
    </div>
  );
};

export default InstagramImage;
