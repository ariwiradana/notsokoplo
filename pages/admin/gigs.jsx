import Button from "@/components/elements/button";
import InputText from "@/components/elements/input";
import CustomModal from "@/components/elements/modal";
import Container from "@/components/elements/container";
import Loading from "@/components/elements/loading";
import Navbar from "@/components/molecules/navbar.admin";
import Seo from "@/components/partials/seo";
import Image from "next/image";
import React from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import moment from "moment";
import useAdminGigs from "@/hooks/admin/useAdminGigs";
import { Pagination } from "@mui/material";
import { RotatingLines } from "react-loader-spinner";

const AdminGigs = () => {
  const {
    data: gigs,
    isLoading,
    openModal,
    values,
    page,
    size,
    loading,
    id,
    openModalDelete,
    openModalEdit,
    setOpenModal,
    onChange,
    handleSubmitAdd,
    handleDelete,
    setId,
    setOpenModalDelete,
    handlePagination,
    setOpenModalEdit,
    setValues,
    handleSubmitEdit,
  } = useAdminGigs();

  return (
    <>
      <Navbar />
      {/* <Loading isLoading={isLoading} /> */}
      <Seo title="Notsokoplo | Gigs" />

      <CustomModal
        title="Delete Gigs"
        open={openModalDelete}
        onClose={() => {
          if (!loading) {
            setOpenModalDelete(false);
          }
        }}
      >
        <FormDeleteGigs id={id} onSubmit={handleDelete} loading={loading} />
      </CustomModal>

      <CustomModal
        title="Add Gigs"
        open={openModal}
        onClose={() => {
          if (!loading) {
            setOpenModal(false);
          }
        }}
      >
        <FormAddGigs
          onSubmit={handleSubmitAdd}
          loading={loading}
          onChange={onChange}
          values={values}
        />
      </CustomModal>

      <CustomModal
        title="Edit Gigs"
        open={openModalEdit}
        onClose={() => {
          if (!loading) {
            setOpenModalEdit(false);
          }
        }}
      >
        <FormEditGigs
          onSubmit={handleSubmitEdit}
          loading={loading}
          onChange={onChange}
          values={values}
        />
      </CustomModal>
      <div
        className={`bg-white min-h-screen w-full flex items-center lg:px-6 px-4 md:px-8 xl:px-0 py-8`}
      >
        <Container className="md:mt-24 mt-16">
          {/* title */}
          <div className="flex items-center gap-x-4 py-8 mb-4">
            <h5 className="text-center text-gray-800 font-semibold text-2xl lg:text-5xl font-montserrat">
              Gigs
            </h5>
            <div>
              <Button onClick={() => setOpenModal(true)} title="Add Gigs" />
            </div>
          </div>

          {/* table */}
          {gigs?.total != 0 && (
            <div className="relative overflow-x-auto shadow-md shadow-slate-200 sm:rounded-lg min-w-[50vw]">
              <table className="w-full text-sm text-left text-gray-500 table table-fixed lg:table-auto">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="lg:px-6 px-4 py-3">
                      Event
                    </th>
                    <th scope="col" className="lg:px-6 px-4 py-3">
                      Date
                    </th>
                    <th scope="col" className="lg:px-6 px-4 py-3">
                      Place
                    </th>
                    <th scope="col" className="lg:px-6 px-4 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {gigs?.data?.map((gig) => (
                    <tr className="bg-white border-b" key={gig?._id}>
                      <th scope="row" className="lg:px-6 px-4 py-4">
                        <p className="font-medium text-gray-900 min-w-[50px] leading-5">
                          {gig?.event}
                        </p>
                      </th>
                      <td className="lg:px-6 px-4 py-4">
                        {moment(gig?.date).format("dddd, D MMMM YYYY")}
                      </td>
                      <td className="lg:px-6 px-4 py-4">{gig?.place}</td>
                      <td className="lg:px-6 px-4 py-4">
                        <div className="flex flex-col md:flex-row gap-2 items-center md:items-start">
                          <div>
                            <button
                              aria-label={`action-edit-${gig?._id}`}
                              onClick={() => {
                                setOpenModalEdit(true);
                                setValues({
                                  event: gig?.event,
                                  date: moment(gig?.date).format("YYYY-MM-DD"),
                                  place: gig?.place,
                                });
                                setId(gig?._id);
                              }}
                              className="font-medium text-gray-700 border border-gray-200 rounded-md bg-white p-1"
                            >
                              <HiPencil size={20} />
                            </button>
                          </div>
                          <div>
                            <button
                              aria-label={`action-delete-${gig?._id}`}
                              onClick={() => {
                                setId(gig?._id);
                                setOpenModalDelete(true);
                              }}
                              className="font-medium text-gray-700 border border-gray-200 rounded-md bg-white p-1"
                            >
                              <HiTrash size={20} />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {isLoading && (
            <div className="flex justify-center mt-6">
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="20"
                visible={true}
              />
            </div>
          )}

          {/* pagination */}
          {gigs?.total > size && (
            <div className="flex justify-center mt-8">
              <Pagination
                page={page}
                onChange={(e, value) => handlePagination(e, value)}
                count={gigs ? Math.ceil(gigs?.total / size) : 0}
                variant="outlined"
              />
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default AdminGigs;

const FormDeleteGigs = ({ loading, onSubmit, id }) => {
  return (
    <form onSubmit={(e) => onSubmit(e, id)}>
      <p className="text-sm font-montserrat text-gray-500">
        Apakah gak salah pencet delete gigs ini ?
      </p>
      <div className="mt-6 w-full">
        <Button type="submit" loading={loading} title="Delete" full />
      </div>
    </form>
  );
};

const FormAddGigs = ({ onChange, values, loading, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-y-3">
      <InputText
        value={values?.event}
        onChange={(e) => onChange(e.target.value, "event")}
        label="Event"
        id="add-event"
        full
      />
      <InputText
        value={values?.date}
        type="date"
        onChange={(e) => onChange(e.target.value, "date")}
        label="Date"
        id="add-date"
        full
      />
      <InputText
        value={values?.place}
        onChange={(e) => onChange(e.target.value, "place")}
        label="Place"
        id="add-place"
        full
      />
      <div className="grid grid-cols-6 gap-1">
        {values?.images?.map((img, idx) => (
          <div
            className="w-full h-16 rounded overflow-hidden aspect-square relative"
            key={`image-${idx}`}
          >
            <Image alt="add-image" fill className="object-cover" src={img} />
          </div>
        ))}
      </div>
      <div className="mt-2 w-full">
        <Button loading={loading} type="submit" title="Save" full />
      </div>
    </form>
  );
};

const FormEditGigs = ({ onChange, values, loading, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-y-3">
      <InputText
        value={values?.event}
        onChange={(e) => onChange(e.target.value, "event")}
        label="Event"
        id="add-event"
        full
      />
      <InputText
        value={values?.date}
        type="date"
        onChange={(e) => onChange(e.target.value, "date")}
        label="Date"
        id="add-date"
        full
      />
      <InputText
        value={values?.place}
        onChange={(e) => onChange(e.target.value, "place")}
        label="Place"
        id="add-place"
        full
      />
      <div className="grid grid-cols-6 gap-1">
        {values?.images?.map((img, idx) => (
          <div
            className="w-full h-16 rounded overflow-hidden aspect-square relative"
            key={`image-${idx}`}
          >
            <Image alt="add-image" fill className="object-cover" src={img} />
          </div>
        ))}
      </div>
      <div className="mt-2 w-full">
        <Button loading={loading} type="submit" title="Save" full />
      </div>
    </form>
  );
};
