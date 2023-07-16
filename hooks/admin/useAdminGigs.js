import client from "@/lib/axios";
import fetcher from "@/lib/fetcher";
import moment from "moment";
import React, { useState } from "react";
import useSWR from "swr";

const useAdminGigs = () => {
  const initValues = {
    event: "",
    date: moment().format("YYYY-MM-DD"),
    palce: "",
  };
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initValues);
  const [id, setId] = useState(null);
  const [page, setPage] = useState(1);
  const [size] = useState(5);

  const { data, isLoading, mutate } = useSWR(
    `/api/gigs?page=${page}&size=${size}`,
    fetcher
  );

  const handlePagination = (event, value) => {
    setPage(value);
  };

  const onChange = (value, id) => {
    setValues({ ...values, [id]: value });
  };

  const handleSubmitAdd = async (event) => {
    setLoading(true);
    event.preventDefault();

    await client
      .post(`/api/gigs`, values)
      .then(() => {
        setOpenModal(false);
        setLoading(false);

        setPage(1);
      })
      .catch((error) => toast.error(error?.response?.data?.message))
      .finally(() => {
        mutate();
        setValues(initValues);
      });
  };

  const handleSubmitEdit = async (event) => {
    setLoading(true);
    event.preventDefault();

    await client
      .put(`/api/gigs/${id}`, values)
      .then(() => {
        setOpenModalEdit(false);
        setLoading(false);
      })
      .catch((error) => toast.error(error?.response?.data?.message))
      .finally(() => {
        mutate();
        setValues(initValues);
      });
  };

  const handleDelete = async (e, _id) => {
    setLoading(true);
    e.preventDefault();
    client
      .delete(`/api/gigs/${_id}`)
      .catch((error) => toast.error(error?.response?.data?.message))
      .finally(() => {
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
    page,
    size,
    openModalEdit,
    mutate,
    setOpenModal,
    setValues,
    onChange,
    handleSubmitAdd,
    handleDelete,
    setOpenModalDelete,
    setId,
    handlePagination,
    setOpenModalEdit,
    handleSubmitEdit,
  };
};

export default useAdminGigs;
