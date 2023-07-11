import client from "@/lib/axios";
import fetcher from "@/lib/fetcher";
import { toBase64 } from "@/lib/toBase64";
import moment from "moment";
import React, { useRef, useState } from "react";
import useSWR from "swr";

const useAdminGallery = () => {
  const formRef = useRef("");

  const [values, setValues] = useState({
    title: "",
    src: "",
    date: moment().format("YYYY-MM-DD"),
  });
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

  const onChangeForm = (value, id) => {
    if (id == "image") {
      toBase64(value).then((base64) => {
        setDetail({ ...detail, src: base64 });
      });
    } else {
      setDetail({ ...detail, [id]: value });
    }
  };

  const onChangeFormAdd = (value, id) => {
    if (id == "image") {
      toBase64(value).then((base64) => {
        setValues({ ...values, src: base64 });
      });
    } else {
      setValues({ ...values, [id]: value });
    }
  };

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    client
      .put(`/api/gallery/${detail?.path}`, detail)
      .then((res) => mutate())
      .finally(() => {
        setOpenModal(false);
        setLoading(false);
      });
  };

  const handleSubmitAdd = (event) => {
    setLoading(true);
    event.preventDefault();
    client
      .post(`/api/gallery`, values)
      .then((res) => mutate())
      .finally(() => {
        setOpenModalAdd(false);
        formRef.current.reset();
        setLoading(false);
      });
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
    handleChange,
    setOpenModal,
    setDetail,
    handleSubmit,
    onChangeForm,
    onChangeFormAdd,
    handleSubmitAdd,
    setOpenModalAdd,
  };
};

export default useAdminGallery;
