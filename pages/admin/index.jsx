import Button from "@/components/elements/button";
import InputText from "@/components/elements/input";
import CustomModal from "@/components/elements/modal";
import Container from "@/components/molecules/container";
import Loading from "@/components/molecules/loading";
import Navbar from "@/components/molecules/navbar.admin";
import Seo from "@/components/partials/seo";
import useAdminSlideshow from "@/hooks/admin/useAdminSlideshow";
import Image from "next/image";
import React from "react";
import { HiTrash } from "react-icons/hi";

const Admin = () => {
  const {
    data,
    isLoading,
    openModal,
    values,
    setOpenModal,
    onChangeFormAdd,
    handleSubmitAdd,
    loading,
    handleDelete,
  } = useAdminSlideshow();
  return (
    <>
      <Navbar />
      <Loading isLoading={isLoading} />
      <Seo title="Notsokoplo | Admin" />
      <CustomModal
        title="Add Slideshow Image"
        open={openModal}
        onClose={setOpenModal}
      >
        <FormAddSlideshow
          onSubmit={handleSubmitAdd}
          loading={loading}
          onChangeFormAdd={onChangeFormAdd}
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
              Slideshow
            </h5>
            <div>
              <Button
                onClick={() => setOpenModal(true)}
                title="Upload Images"
              />
            </div>
          </div>

          {/* table */}
          {data?.length != 0 && (
            <div className="relative overflow-x-auto shadow-md shadow-slate-200 sm:rounded-lg min-w-[50vw]">
              <table className="w-full text-sm text-left text-gray-500 table table-fixed lg:table-auto">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="lg:px-6 px-4 py-3">
                      Image
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="grid grid-cols-2 gap-4 p-4 divide-y divide-gray-100">
                    {data?.map(({ _id, image }) => {
                      return (
                        <div className="relative" key={_id}>
                          <div className="bg-cover w-full h-44 md:h-56 rounded-lg overflow-hidden relative">
                            <Image
                              alt={_id}
                              fill
                              src={image}
                              className="object-cover h-full"
                            />
                          </div>
                          <div className="absolute bottom-4 right-4 lg:bottom-5 lg:right-5">
                            <button
                              onClick={() => handleDelete(_id)}
                              className="font-medium text-gray-700 border bg-white rounded-md p-1"
                            >
                              <HiTrash size={20} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default Admin;

const FormAddSlideshow = ({ onChangeFormAdd, values, loading, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-y-3">
      <InputText
        multiple
        onChange={(e) => onChangeFormAdd(e.target.files, "images")}
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
        <Button loading={loading} type="submit" title="Save" full />
      </div>
    </form>
  );
};
