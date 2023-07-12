import React, { useState } from "react";

const useLightbox = () => {
  const [open, setOpen] = useState(false);
  const [indexImg, setIndexImg] = useState(0);

  return { open, setOpen, setIndexImg, indexImg };
};

export default useLightbox;
