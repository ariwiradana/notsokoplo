import Button from "@/components/elements/button";
import InputText from "@/components/elements/input";
import CustomModal from "@/components/elements/modal";
import Container from "@/components/elements/container";
import Loading from "@/components/elements/loading";
import Navbar from "@/components/molecules/navbar.admin";
import Seo from "@/components/partials/seo";
import useAdminGallery from "@/hooks/admin/useAdminGallery";
import moment from "moment";
import Image from "next/image";
import React from "react";
import { HiPencil, HiTrash } from "react-icons/hi";

const AdminGallery = () => {
  const {
    data,
    isLoading,
    openModal,
    detail,
    formRef,
    openModalAdd,
    loading,
    values,
    imageSize,
    openModalDelete,
    path,
    handleSubmit,
    setOpenModal,
    setDetail,
    onChangeForm,
    onChangeFormAdd,
    handleSubmitAdd,
    setOpenModalAdd,
    setImageSize,
    handleDelete,
    setOpenModalDelete,
    setPath,
  } = useAdminGallery();

  return (
    <>
      <Navbar />
      <Seo title="Notsokoplo | Gallery" />

      {/* Modal Delete Gallery */}
      <CustomModal
        title="Delete Gallery"
        open={openModalDelete}
        onClose={() => {
          if (!loading) {
            setOpenModalDelete(false);
          }
        }}
      >
        <FormDeleteGallery
          path={path}
          loading={loading}
          onSubmit={handleDelete}
        />
      </CustomModal>

      {/* Modal Add Gallery */}
      <CustomModal
        title="Add Gallery"
        open={openModalAdd}
        onClose={() => {
          if (!loading) {
            setOpenModalAdd(false);
          }
        }}
      >
        <FormAddGallery
          imageSize={imageSize}
          loading={loading}
          onChangeForm={onChangeFormAdd}
          handleSubmit={handleSubmitAdd}
          formRef={formRef}
          values={values}
        />
      </CustomModal>

      {/* Modal Edit Gallery */}
      <CustomModal
        title="Edit Gallery"
        open={openModal}
        onClose={() => {
          if (!loading) {
            setOpenModal(false);
          }
        }}
      >
        <FormEditGallery
          imageSize={imageSize}
          loading={loading}
          onChangeForm={onChangeForm}
          handleSubmit={handleSubmit}
          values={detail}
        />
      </CustomModal>
      <Loading isLoading={isLoading} />

      <div className="bg-white min-h-screen w-full flex items-center lg:px-6 px-4 md:px-8 xl:px-0 py-8">
        <Container className="md:mt-24 mt-16">
          <div className="flex items-center gap-x-4 py-8 mb-4">
            <h5 className="text-center text-gray-800 font-semibold text-5xl font-montserrat">
              Gallery
            </h5>
            <div>
              <Button
                onClick={() => setOpenModalAdd(true)}
                title="Upload Images"
              />
            </div>
          </div>

          {data?.total != 0 && (
            <div className="relative overflow-x-auto shadow-md shadow-slate-200 sm:rounded-lg min-w-[50vw]">
              <table className="w-full text-sm text-left text-gray-500 table-auto">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="lg:px-6 px-4 py-3">
                      Event
                    </th>
                    <th
                      scope="col"
                      className="lg:px-6 px-4 py-3 hidden md:block"
                    >
                      Thumbnail
                    </th>
                    <th scope="col" className="lg:px-6 px-4 py-3">
                      Date
                    </th>
                    <th scope="col" className="lg:px-6 px-4 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.map((col) => {
                    return (
                      <tr className="bg-white border-b" key={col?.data?._id}>
                        <th scope="row" className="lg:px-6 px-4 py-4">
                          <div className="flex flex-col">
                            <p className="font-medium text-gray-900 min-w-[50px] leading-5">
                              {col?.data?.title}
                            </p>
                            <p className="font-normal text-xs">
                              ({col?.total}) images
                            </p>
                          </div>
                        </th>
                        <td className="lg:px-6 px-4 py-4 hidden md:block">
                          <div className="md:w-16 md:h-16 h-12 w-12 rounded-lg overflow-hidden relative">
                            <Image
                              alt={col?.data?.title}
                              fill
                              src={col?.data?.image}
                              className="object-cover"
                            />
                          </div>
                        </td>
                        <td className="lg:px-6 px-4 py-4">
                          {moment(col?.data?.date).format("dddd, D MMMM YYYY")}
                        </td>
                        <td className="lg:px-6 px-4 py-4">
                          <div className="flex flex-col md:flex-row gap-2 items-center md:items-start">
                            <div>
                              <button
                                onClick={() => {
                                  setDetail({
                                    path: col?.data?.path,
                                    title: col?.data?.title,
                                    date: col?.data?.date,
                                    images: [],
                                  });
                                  setImageSize(0);
                                  setOpenModal(true);
                                }}
                                className="font-medium text-gray-700 border border-gray-200 rounded-md bg-white p-1"
                              >
                                <HiPencil size={20} />
                              </button>
                            </div>
                            <div>
                              <button
                                onClick={() => {
                                  setOpenModalDelete(true);
                                  setPath(col?.data?.path);
                                }}
                                className="font-medium text-gray-700 border border-gray-200 rounded-md bg-white p-1"
                              >
                                <HiTrash size={20} />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {/* {data?.total != 0 && (
            <div className="flex justify-center mt-8">
              <Pagination
                page={page}
                onChange={handleChange}
                count={data ? Math.ceil(data?.total / size) : 0}
                variant="outlined"
              />
            </div>
          )} */}
        </Container>
      </div>
    </>
  );
};

export default AdminGallery;

const FormEditGallery = ({
  formRef,
  loading,
  onChangeForm,
  values,
  handleSubmit,
  imageSize,
}) => {
  return (
    <>
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="mt-4 flex flex-col gap-y-3"
      >
        <InputText
          onChange={(e) => onChangeForm(e, e.target.value, "title")}
          label="Event"
          id="edit-title"
          disabled
          full
          value={values?.title}
        />
        <InputText
          multiple
          onChange={(e) => onChangeForm(e, e.target.files, "images")}
          label="Add More Image"
          type="file"
          id="edit-image"
          full
        />

        {values?.images && values?.images?.length != 0 ? (
          <div className="grid grid-cols-6 gap-1">
            {values?.images?.map((img, idx) => (
              <div
                className="w-full h-16 rounded overflow-hidden aspect-square relative"
                key={`image-${idx}`}
              >
                <Image
                  alt="add-image"
                  fill
                  className="object-cover"
                  src={img}
                />
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}

        <InputText
          onChange={(e) => onChangeForm(e, e.target.value, "date")}
          label="Date"
          type="date"
          id="edit-date"
          full
          value={moment(values?.date).format("YYYY-MM-DD")}
        />
        <div className="mt-2 w-full">
          <Button type="submit" title="Update" full />
        </div>
      </form>
    </>
  );
};

const FormDeleteGallery = ({ loading, onSubmit, path }) => {
  return (
    <form onSubmit={(e) => onSubmit(e, path)}>
      <p className="text-sm font-montserrat text-gray-500">
        Apakah gak salah pencet delete event ini ?
      </p>
      <div className="mt-6 w-full">
        <Button type="submit" loading={loading} title="Delete" full />
      </div>
    </form>
  );
};

const FormAddGallery = ({
  formRef,
  onChangeForm,
  loading,
  values,
  handleSubmit,
  imageSize,
}) => {
  return (
    <>
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="mt-4 flex flex-col gap-y-3"
      >
        <InputText
          onChange={(e) => onChangeForm(e, e.target.value, "title")}
          label="Event"
          id="add-title"
          full
          value={values?.title}
        />
        <InputText
          onChange={(e) => onChangeForm(e, e.target.value, "date")}
          label="Date"
          type="date"
          id="add-date"
          full
          value={moment(values?.date).format("YYYY-MM-DD")}
        />

        <InputText
          multiple
          onChange={(e) => onChangeForm(e, e.target.files, "images")}
          label="Images"
          type="file"
          id="add-images"
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
          <Button
            disabled={
              !values?.title || !values?.date || values?.images?.length == 0
            }
            type="submit"
            loading={loading}
            title="Save"
            full
          />
        </div>
      </form>
    </>
  );
};
