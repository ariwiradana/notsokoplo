import GalleryPathComponent from "@/components/partials/gallery.path";
import React from "react";

const GalleryPath = ({ params }) => {
  return <GalleryPathComponent params={params?.path} />;
};

export default GalleryPath;

export async function getServerSideProps({ params }) {
  return {
    props: {
      params,
    },
  };
}
