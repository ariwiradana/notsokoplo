import client from "@/lib/axios";
import fetcher from "@/lib/fetcher";
import { toBase64 } from "@/lib/toBase64";
import moment from "moment";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

const useAdminGallery = () => {
  const [counter, setCounter] = useState(0);
  const [path, setPath] = useState(null);
  const formRef = useRef("");
  const [values, setValues] = useState({
    title: "",
    images: [],
    filenames: "",
    date: moment().format("YYYY-MM-DD"),
  });

  const [imageSize, setImageSize] = useState(0);
  const [detail, setDetail] = useState(null);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [page, setPage] = useState(1);
  const [size] = useState(5);
  const [loading, setLoading] = useState(false);
  const { data, isLoading, mutate } = useSWR(
    `/api/gallery/thumbnail?page=${page}&size=${size}`,
    fetcher
  );

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = async (e, path) => {
    setLoading(true);
    e.preventDefault();
    client
      .delete(`/api/gallery/${path}`)
      .catch((error) => toast.error(error?.response?.data?.message))
      .finally(() => {
        setOpenModalDelete(false);
        mutate();
        setLoading(false);
      });
  };

  const onChangeForm = (e, value, path) => {
    if (path == "images" && value) {
      let imageLeft = [];
      let skipImage = 0;

      Array.from(value).forEach(async (image) => {
        if (image?.size < 500000) {
          toBase64(image)
            .then((base64Img) => imageLeft.push(base64Img))
            .finally(() => setDetail({ ...detail, images: imageLeft }));
        } else {
          skipImage += 1;
        }
      });
      if (skipImage != 0) {
        toast.warning(`(${skipImage}) Image size too big`);
        setDetail({ ...detail, images: [] });
      }
    } else {
      setDetail({ ...detail, [path]: value });
    }
  };

  const onChangeFormAdd = (e, value, path) => {
    if (path == "images" && value) {
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
        toast.warning(`(${skipImage}) Image size too big`);
        document.getElementById("add-images").value = "";
      }
    } else {
      setValues({ ...values, [path]: value });
    }
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const newDetail = { ...detail };
    delete newDetail["images"];
    await client.put(`/api/gallery/thumbnail/${detail?.path}`, newDetail);

    const path = detail?.title?.toLowerCase().replace(/[^a-z0-9]/gi, "");
    const alt = `alt-${detail?.title
      ?.toLowerCase()
      .replace(/[^a-z0-9]/gi, "")}`;

    if (detail?.images?.length != 0) {
      for (const [index, img] of detail?.images.entries()) {
        const payload = {
          path,
          alt,
          title: detail?.title,
          date: detail?.date,
          image: img,
        };

        await client
          .post(`/api/gallery`, payload)
          .then(() => {
            setCounter(index + 1);
          })
          .catch((error) => {
            toast.error(error?.message);
            setLoading(false);
          });
      }
    }

    setOpenModal(false);
    setLoading(false);
    setDetail(null);
    mutate();
  };

  const handleSubmitAdd = async (event) => {
    setLoading(true);
    event.preventDefault();

    const path = values?.title?.toLowerCase().replace(/[^a-z0-9]/gi, "");
    const alt = `alt-${values?.title
      ?.toLowerCase()
      .replace(/[^a-z0-9]/gi, "")}`;

    const ThumbnailPayload = {
      path,
      alt,
      title: values?.title,
      date: values?.date,
      image: values?.images[0],
    };

    try {
      await client.post(`/api/gallery/thumbnail`, ThumbnailPayload);
    } catch (error) {
      toast.error(error?.message);
      setLoading(false);
    }

    for (const [index, img] of values?.images.entries()) {
      const payload = {
        path,
        alt,
        title: values?.title,
        date: values?.date,
        image: img,
      };

      await client
        .post(`/api/gallery`, payload)
        .then(() => {
          setCounter(index + 1);
        })
        .catch((error) => {
          toast.error(error?.message);
          setLoading(false);
        });
    }
    mutate();
    setOpenModalAdd(false);
    setLoading(false);
    setValues({
      title: "",
      images: [],
      date: moment().format("YYYY-MM-DD"),
    });
    setCounter(0);
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
    counter,
    openModalDelete,
    path,
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
    setOpenModalDelete,
    setPath,
  };
};

export default useAdminGallery;
