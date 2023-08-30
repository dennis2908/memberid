import { CBadge } from "@coreui/react";

// import { useHistory } from "react-router-dom";

const validURL = (data) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(data);
};

const formatNumber = (data) => {
  if (data) return data.toLocaleString("en-US");
  else return 0;
};

const capitalizeFirstLetter = (data) => {
  if (data)
    return data
      .toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
  else return "";
};

const primaryBadge = (data) => {
  if (data) return <CBadge color="primary">{data}</CBadge>;
  else return <CBadge color="primary">N/A</CBadge>;
};

const arrayRemove = (obj, value) => {
  let newToDo = { newToDo: (delete obj[value], obj) };
  return newToDo;
};
export {
  validURL,
  primaryBadge,
  arrayRemove,
  formatNumber,
  capitalizeFirstLetter,
};
