import client from "@/lib/axios";
import fetcher from "@/lib/fetcher";
import { toBase64 } from "@/lib/toBase64";
import React, { useState } from "react";
import useSWR from "swr";

const useAdminSlideshow = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(null);
  const [id, setId] = useState(null);

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

    const payload = values?.images?.map((image) => {
      return { image };
    });

    await client
      .post(`/api/slideshow`, payload)
      .then(() => {
        setOpenModal(false);
        setLoading(false);
        setValues(null);
      })
      .finally(() => mutate());
  };

  const handleDelete = async (e, _id) => {
    setLoading(true);
    e.preventDefault();
    client.delete(`/api/slideshow/${_id}`).finally(() => {
      mutate();
      setOpenModalDelete(false);
      setLoading(false);
    });
  };

  return {
    data,
    isLoading,
    values,
    openModal,
    loading,
    openModalDelete,
    id,
    mutate,
    setOpenModal,
    setValues,
    onChangeFormAdd,
    handleSubmitAdd,
    handleDelete,
    setOpenModalDelete,
    setId,
  };
};

export default useAdminSlideshow;
