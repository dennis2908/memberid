import React from "react";
// import { useHistory } from "react-router-dom";

const ListAwards = React.lazy(() =>
  import("./views/awardmanagement/list-award/Awards")
);

const Signin = React.lazy(() => {
  localStorage.removeItem("myData");

  window.location.reload();
});

const routes = [
  {
    path: "/award/listaward",
    name: "List Awards",
    component: ListAwards,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
];

export default routes;
