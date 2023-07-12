import Button from "@/components/elements/button";
import InputText from "@/components/elements/input";
import CustomModal from "@/components/elements/modal";
import Container from "@/components/molecules/container";
import Loading from "@/components/molecules/loading";
import Seo from "@/components/partials/seo";
import useAdminGallery from "@/hooks/admin/useAdminGallery";
import { formatBytes } from "@/lib/bytesConvert";
import { Pagination } from "@mui/material";
import moment from "moment";
import Image from "next/image";
import React from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

const AdminGallery = () => {
  const {
    data,
    page,
    size,
    isLoading,
    openModal,
    detail,
    formRef,
    openModalAdd,
    loading,
    values,
    imageSize,
    handleChange,
    handleSubmit,
    setOpenModal,
    setDetail,
    onChangeForm,
    onChangeFormAdd,
    handleSubmitAdd,
    setOpenModalAdd,
    setImageSize,
  } = useAdminGallery();

  return (
    <>
      <Seo title="Notsokoplo | Admin" />
      <CustomModal
        title="Add Gallery"
        open={openModalAdd}
        onClose={() => setOpenModalAdd(false)}
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
      <CustomModal
        title="Edit Gallery"
        open={openModal}
        onClose={() => setOpenModal(false)}
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
        <Container>
          <div className="flex items-center gap-x-4 py-8 mb-4">
            <h5 className="text-center text-gray-800 font-semibold text-5xl font-montserrat">
              Gallery
            </h5>
            <div>
              <Button onClick={() => setOpenModalAdd(true)} title="Upload Images" />
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
                    <th scope="col" className="lg:px-6 px-4 py-3">
                      Image
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
                  {data?.data?.map((col) => (
                    <tr className="bg-white border-b" key={col?._id}>
                      <th
                        scope="row"
                        className="lg:px-6 px-4 py-4 font-medium text-gray-900"
                      >
                        {col?.title}
                      </th>
                      <td className="lg:px-6 px-4 py-4">
                        <div className="md:w-16 md:h-16 h-12 w-12 rounded-lg overflow-hidden relative">
                          <Image
                            alt={col?.title}
                            fill
                            src={col?.image}
                            className="object-cover"
                          />
                        </div>
                      </td>
                      <td className="lg:px-6 px-4 py-4">
                        {moment(col?.date).format("dddd, D MMMM YYYY")}
                      </td>
                      <td className="lg:px-6 px-4 py-4">
                        <button
                          onClick={() => {
                            setDetail({
                              path: col?.path,
                              title: col?.title,
                              src: col?.src,
                              date: col?.date,
                            });
                            setImageSize(0);
                            setOpenModal(true);
                          }}
                          className="font-medium text-gray-600 hover:underline mr-1"
                        >
                          <FiEdit size={16} />
                        </button>
                        <button className="font-medium text-red-600 hover:underline ml-1">
                          <FiTrash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {data?.total != 0 && (
            <div className="flex justify-center mt-8">
              <Pagination
                page={page}
                onChange={handleChange}
                count={data ? Math.ceil(data?.total / size) : 0}
                variant="outlined"
              />
            </div>
          )}
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
      <div className="mt-4 w-full flex justify-center">
        <div className="relative w-full h-56 rounded-lg overflow-hidden">
          {imageSize != 0 && (
            <p className="absolute bottom-2 px-2 py-1 rounded right-2 z-30 text-white bg-black bg-opacity-50 text-xs font-montserrat">
              {formatBytes(imageSize)}
            </p>
          )}
          <Image
            alt="edit-images"
            fill
            className="object-cover"
            src={values?.src}
          />
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="mt-4 flex flex-col gap-y-3"
      >
        <InputText
          onChange={(e) => onChangeForm(e.target.value, "title")}
          label="Event"
          id="edit-title"
          full
          value={values?.title}
        />
        <InputText
          onChange={(e) => onChangeForm(e.target.files[0], "image")}
          label="Image"
          type="file"
          id="edit-image"
          full
        />
        <InputText
          onChange={(e) => onChangeForm(e.target.value, "date")}
          label="Date"
          type="date"
          id="edit-date"
          full
          value={moment(values?.date).format("YYYY-MM-DD")}
        />
        <div className="mt-2 w-full">
          <Button loading={loading} type="submit" title="Update" full />
        </div>
      </form>
    </>
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
      {/* {values?.thumbnail && (
        <div className="mt-4 w-full flex justify-center">
          <div className="relative w-full h-56 rounded-lg overflow-hidden">
            {imageSize != 0 && (
              <p className="absolute bottom-2 px-2 py-1 rounded right-2 z-30 text-white bg-black bg-opacity-50 text-xs font-montserrat">
                {formatBytes(imageSize)}
              </p>
            )}
            <Image
              alt="add-image"
              fill
              className="object-cover"
              src={values?.thumbnail}
            />
          </div>
        </div>
      )} */}
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="mt-4 flex flex-col gap-y-3"
      >
        {/* <InputText
          onChange={(e) => onChangeForm(e.target.files[0], "thumbnail")}
          label="Thumbnail"
          type="file"
          id="edit-thumbnail"
          full
        /> */}
        <InputText
          onChange={(e) => onChangeForm(e.target.value, "title")}
          label="Event"
          id="edit-title"
          full
          value={values?.title}
        />
        <InputText
          onChange={(e) => onChangeForm(e.target.value, "date")}
          label="Date"
          type="date"
          id="edit-date"
          full
          value={moment(values?.date).format("YYYY-MM-DD")}
        />

        <InputText
          multiple
          onChange={(e) => onChangeForm(e.target.files, "images")}
          label="Images"
          type="file"
          id="edit-images"
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
            disabled={!values?.title || !values?.date || values?.images?.length == 0}
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
