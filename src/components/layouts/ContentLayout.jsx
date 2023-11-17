import React from "react";
import { Outlet } from "react-router-dom";

const ContentLayout = () => {
  return (
    <section className="md:grid xl:grid-cols-[minmax(0,_1fr)_450px] gap-5 p-2 md:p-10 ">
      <Outlet />
    </section>
  );
};

export default ContentLayout;
