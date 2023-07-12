import client from "@/lib/axios";
import fetcher from "@/lib/fetcher";
import { toBase64 } from "@/lib/toBase64";
import moment from "moment";
import { useRef, useState } from "react";
import useSWR from "swr";

const useAdminGallery = () => {
  const [counter, setCounter] = useState(0);
  const formRef = useRef("");
  const [values, setValues] = useState({
    title: "",
    images: [],
    date: moment().format("YYYY-MM-DD"),
  });

  const [imageSize, setImageSize] = useState(0);
  const [detail, setDetail] = useState(null);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [size] = useState(5);
  const [loading, setLoading] = useState(false);
  const { data, isLoading, mutate } = useSWR(
    `/api/gallery?page=${page}&size=${size}`,
    fetcher
  );

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = async (path) => {
    client.delete(`/api/gallery/${path}`).finally(() => mutate());
  };

  const onChangeForm = (value, id) => {
    if (id == "images" && value) {
      let imageLeft = [];
      let skipImage = 0;

      Array.from(value).forEach(async (image) => {
        console.log({ image });
        if (image?.size < 500000) {
          toBase64(image)
            .then((base64Img) => imageLeft.push(base64Img))
            .finally(() => setDetail({ ...detail, images: imageLeft }));
        } else {
          skipImage += 1;
        }
      });
      if (skipImage != 0) {
        alert(`(${skipImage}) Image size too big`);
        setDetail({ ...detail, images: [] });
      }
    } else {
      setDetail({ ...detail, [id]: value });
    }
  };

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
        setValues({ ...values, images: [] });
      }
    } else {
      setValues({ ...values, [id]: value });
    }
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const newDetail = { ...detail };
    delete newDetail["images"];
    await client.put(`/api/gallery/${detail?.path}`, newDetail);

    let uploaded = 0;
    for (const img of detail?.images) {
      const payload = {
        image: img,
        title: detail?.title,
        date: detail?.date,
      };
      await client.post(`/api/gallery`, payload);
      uploaded += 1;
      setCounter(uploaded + 1);
    }
    if (uploaded === detail?.images?.length) {
      setOpenModal(false);
      setLoading(false);
      setDetail(null);
      mutate();
    }
  };

  const handleSubmitAdd = async (event) => {
    setLoading(true);
    event.preventDefault();

    let uploaded = 0;
    for (const img of values?.images) {
      const payload = {
        title: values?.title,
        date: values?.date,
        image: img,
      };
      await client.post(`/api/gallery`, payload);
      uploaded += 1;
      setCounter(uploaded + 1);
    }

    if (uploaded === values?.images?.length) {
      setOpenModalAdd(false);
      setLoading(false);
      setValues({
        title: "",
        images: [],
        date: moment().format("YYYY-MM-DD"),
      });
      mutate();
    }
  };

  return {
    data,
    page,
    size,
    isLoading,
    openModal,
    detail,
    formRef,
    values,
    openModalAdd,
    loading,
    imageSize,
    handleChange,
    setOpenModal,
    setDetail,
    handleSubmit,
    onChangeForm,
    onChangeFormAdd,
    handleSubmitAdd,
    setOpenModalAdd,
    setImageSize,
    handleDelete,
  };
};

export default useAdminGallery;
