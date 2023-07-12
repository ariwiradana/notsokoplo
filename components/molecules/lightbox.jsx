import FsLightbox from "fslightbox-react";
import React, { useState } from "react";

const Lightbox = ({ sources, open, slide }) => {
  return (
    <>
      <FsLightbox slide={slide} toggler={open} sources={sources} />
    </>
  );
};

export default Lightbox;
