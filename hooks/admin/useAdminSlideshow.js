import client from "@/lib/axios";
import fetcher from "@/lib/fetcher";
import { toBase64 } from "@/lib/toBase64";
import React, { useState } from "react";
import useSWR from "swr";

const useAdminSlideshow = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(null);

  const { data, isLoading, mutate } = useSWR("/api/slideshow", fetcher);

  const onChangeFormAdd = (value, id) => {
    if (id == "images" && value) {
      let imageLeft = [];
      let skipImage = 0;
      Array.from(value).forEach(async (image) => {
        if (image?.size < 500000) {
          toBase64(image)
            .then((base64Img) => imageLeft.push(base64Img))
            .finally(() => setValues({ ...values, images: imageLeft }));
        } else {
          skipImage += 1;
        }
      });
      if (skipImage != 0) {
        alert(`(${skipImage}) Image size too big`);
        setValues(null);
      }
    } else {
      setValues({ ...values, [id]: value });
    }
  };

  const handleSubmitAdd = async (event) => {
    setLoading(true);
    event.preventDefault();

    let uploaded = 0;
    for (const img of values?.images) {
      const payload = {
        image: img,
      };
      console.log({ payload });
      await client.post(`/api/slideshow`, payload);
      uploaded += 1;
    }

    if (uploaded === values?.images?.length) {
      setOpenModal(false);
      setLoading(false);
      setValues(null);
      mutate();
    }
  };

  const handleDelete = async (_id) => {
    client.delete(`/api/slideshow/${_id}`).finally(() => mutate());
  };

  return {
    data,
    isLoading,
    values,
    mutate,
    openModal,
    loading,
    setOpenModal,
    setValues,
    onChangeFormAdd,
    handleSubmitAdd,
    handleDelete,
  };
};

export default useAdminSlideshow;
