import Seo from "@/components/partials/seo";
import React from "react";

const Admin = () => {
  return <Seo title="Notsokoplo | Admin"/>;
};

export default Admin;

export async function getServerSideProps() {
  return {
    redirect: {
      permanent: false,
      destination: "/admin/gallery",
    },
  };
}
