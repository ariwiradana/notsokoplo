import FsLightbox from "fslightbox-react";
import React from "react";

const LightboxComponent = ({ sources, open, slide }) => {
  return (
    <>
      <FsLightbox
        slide={slide}
        key={sources?.length}
        toggler={open}
        sources={sources}
      />
    </>
  );
};

export default LightboxComponent;
