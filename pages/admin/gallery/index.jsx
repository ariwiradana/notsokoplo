import Button from "@/components/elements/button";
import InputText from "@/components/elements/input";
import CustomModal from "@/components/elements/modal";
import Container from "@/components/molecules/container";
import Loading from "@/components/molecules/loading";
import useAdminGallery from "@/hooks/admin/useAdminGallery";
import { formatBytes } from "@/lib/bytesConvert";
import { Pagination } from "@mui/material";
import moment from "moment";
import Image from "next/image";
import React from "react";
import { FiDelete, FiEdit, FiTrash } from "react-icons/fi";

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
      <div className="bg-white min-h-screen w-full flex items-center">
        <Container>
          <div className="flex items-center gap-x-4 py-8 mb-4">
            <h5 className="text-center text-gray-800 font-semibold text-5xl font-montserrat">
              Gallery
            </h5>
            <div>
              <Button onClick={() => setOpenModalAdd(true)} title="Add" />
            </div>
          </div>

          {data?.total != 0 && (
            <div className="relative overflow-x-auto shadow-md shadow-slate-200 sm:rounded-lg min-w-[50vw]">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Event
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.map((col) => (
                    <tr className="bg-white border-b" key={col?._id}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {col?.title}
                      </th>
                      <td className="px-6 py-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden relative">
                          <Image
                            alt={col?.title}
                            fill
                            src={col?.src}
                            className="object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {moment(col?.date).format("dddd, D MMMM YYYY")}
                      </td>
                      <td className="px-6 py-4 flex items-center gap-x-2">
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
                          className="font-medium text-gray-600 hover:underline"
                        >
                          <FiEdit size={16} />
                        </button>
                        <button className="font-medium text-red-600 hover:underline">
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
      {values?.src && (
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
              src={values?.src}
            />
          </div>
        </div>
      )}
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
          <Button
            disabled={!values?.title || !values?.date || !values?.src}
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
