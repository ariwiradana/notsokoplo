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
  const { data, isLoading, mutate } = useSWR(`/api/gallery`, fetcher);

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

      if (value?.length > 20) {
        toast.warning("Photos cannot be more than 20");
        document.getElementById("edit-image").value = "";
        setDetail({ ...detail, images: [] });
      } else {
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
      }
    } else {
      setDetail({ ...detail, [path]: value });
    }
  };

  const onChangeFormAdd = (e, value, path) => {
    if (path == "images" && value) {
      let imageLeft = [];
      let skipImage = 0;
      if (value?.length > 20) {
        toast.warning("Photos cannot be more than 20");
        document.getElementById("add-images").value = "";
        setValues({ ...values, images: [] });
      } else {
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
    await client.put(`/api/gallery/${detail?.path}`, newDetail);

    let newData = [];
    for (const img of detail?.images) {
      const path = detail?.title?.toLowerCase().replace(/[^a-z0-9]/gi, "");
      const alt = `alt-${detail?.title
        ?.toLowerCase()
        .replace(/[^a-z0-9]/gi, "")}`;
      const payload = {
        path,
        alt,
        title: detail?.title,
        date: detail?.date,
        image: img,
      };
      newData.push(payload);
    }

    await client
      .post(`/api/gallery/multi`, newData)
      .then(() => {
        setOpenModal(false);
        setLoading(false);
        setDetail(null);
        mutate();
        setCounter(0);
      })
      .catch((error) => toast.error(error?.message));
  };

  const handleSubmitAdd = async (event) => {
    setLoading(true);
    event.preventDefault();

    let newData = [];
    for (const img of values?.images) {
      const path = values?.title?.toLowerCase().replace(/[^a-z0-9]/gi, "");
      const alt = `alt-${values?.title
        ?.toLowerCase()
        .replace(/[^a-z0-9]/gi, "")}`;

      const payload = {
        path,
        alt,
        title: values?.title,
        date: values?.date,
        image: img,
      };
      newData.push(payload);
    }
    await client
      .post(`/api/gallery/multi`, newData)
      .then(() => {
        setOpenModalAdd(false);
        setLoading(false);
        setValues({
          title: "",
          images: [],
          date: moment().format("YYYY-MM-DD"),
        });
        mutate();
        setCounter(0);
      })
      .catch((error) => toast.error(error?.message));
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
