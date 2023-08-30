import React, { useState, useEffect, useCallback } from "react";
//import { useHistory } from 'react-router-dom'
import {
  primaryBadge,
  formatNumber,
  capitalizeFirstLetter,
} from "../../genFunctions/genFunctions";
import { store } from "../../redux/store";
import { connect } from "react-redux";
import {
  CBadge,
  CAlert,
  CCard,
  CModal,
  CForm,
  CFormGroup,
  //CFormText,
  // CValidFeedback,
  // CInvalidFeedback,
  //CTextarea,
  // CInput,
  //CInputFile,
  //CInputCheckbox,
  //CInputRadio,
  //CInputGroup,
  //CInputGroupAppend,
  //CInputGroupPrepend,
  //CDropdown,
  //CInputGroupText,
  CLabel,
  CSelect,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CInputCheckbox,
  CButton,
  CPagination,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import AwardsData from "./AwardsData";

const Users = ({ match }) => {
  const [modalData, setModalData] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [userlist, setuserlist] = useState(AwardsData.AwardsData);

  const [data, setData] = useState("");
  const [token, setToken] = useState("");
  const [newPage, setNewPage] = useState(1);

  const filterPage = () => {
    store.dispatch({
      type: "CHANGE_STATE",
      payload: {
        modulState: "Filter",
        HeadModal: "Filter",
        ShowHideAl: "d-none",
      },
    });
    toggleData();
  };

  const toggleData = () => {
    store.dispatch({ type: "CHANGE_STATE", payload: { Spinner: " " } });
    setModalData(!modalData);
  };

  const filterData = async (e) => {
    await setNewPage(1);
    let dataData = "?point=" + e.target.point.value;

    if (e.target.alltype.checked)
      dataData += "&alltype=" + e.target.alltype.value;

    if (e.target.vouchers.checked)
      dataData += "&vouchers=" + e.target.vouchers.value;

    if (e.target.others.checked) dataData += "&others=" + e.target.others.value;

    if (e.target.products.checked)
      dataData += "&products=" + e.target.products.value;

    setData(dataData);

    MyfetchData(dataData);
    e.preventDefault();
    return false;
  };

  async function MyfetchData(data = "") {
    let token;
    await setNewPage(1);
    if (localStorage.getItem("myData") !== null) {
      if (Object.keys(JSON.parse(localStorage.getItem("myData"))).length > 0) {
        token = "Bearer " + JSON.parse(localStorage.getItem("myData"))["token"];
      }
    }
    await setToken(token);
    await fetch("http://localhost:8000/award/get_all_data/5/0" + data, {
      method: "GET",
      withCredentials: true,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        let Datalist = [];
        let j = 0;
        for (var i = 0; i < 5; i++) {
          if (result[j]) Datalist[i] = result[j];
          j++;
        }
        setuserlist(Datalist);
        setLoading(false);
        //return
      });
  }

  const indexChange = (index) => {
    if (newPage > 1) return index - 4 - 5 * (newPage - 2);
    else return index + 1;
  };

  const pageChange = useCallback(
    async (newPage) => {
      await setLoading(true);
      await setNewPage(newPage);
      console.log(1212, newPage);
      await fetch(
        "http://localhost:8000/award/get_all_data/5/" +
          parseInt((newPage - 1) * 5) +
          "/" +
          data,
        {
          method: "GET",
          withCredentials: true,
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((result) => {
          let numb = 10 * (parseInt(newPage) - 1);
          let Datalist = [];
          let j = 0;
          for (var i = numb; i < numb + 5; i++) {
            if (result[j]) Datalist[i] = result[j];
            j++;
          }
          setuserlist(Datalist);
          setPage(newPage);
          setLoading(false);
        });
    },
    [data, token]
  );

  useEffect(() => {
    MyfetchData();
  }, [setNewPage, pageChange]);

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Awards{" "}
            <CButton size="sm" color="success" onClick={filterPage}>
              <svg
                width="14"
                height="22"
                fill="currentColor"
                className="bi bi-person-plus-fill"
                viewBox="0 0 16 16"
              >
                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                <path
                  fillRule="evenodd"
                  d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                />
              </svg>{" "}
              List
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CModal show={modalData} onClose={toggleData}>
              <CModalHeader closeButton>
                {store.getState().HeadModal}
              </CModalHeader>
              <CModalBody>
                <CAlert color="success" className={store.getState().ShowHideAl}>
                  {store.getState().AlertMsg}
                </CAlert>
                <CForm
                  onSubmit={async (e) => {
                    e.preventDefault();
                    filterData(e);
                  }}
                  className="was-validated"
                >
                  <CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="ccmonth">Point Needed</CLabel>
                      <CSelect custom name="point" id="point">
                        <option value="10000">0 - IDR 10,000</option>
                        <option value="250000">0 - IDR 250,000</option>
                        <option value="500000">0 - IDR 500,000</option>
                      </CSelect>
                    </CFormGroup>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Award Type</CLabel>
                    </CCol>
                    <CCol md="9">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="alltype"
                          name="alltype"
                          value="alltype"
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="alltype"
                        >
                          All Type
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="vouchers"
                          name="vouchers"
                          value="vouchers"
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="vouchers"
                        >
                          Vouchers
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="products"
                          name="products"
                          value="products"
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="products"
                        >
                          Products
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="others"
                          name="others"
                          value="others"
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="others"
                        >
                          Others
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup>
                    <CButton
                      type="submit"
                      className="btn btn-primary d-grid col-12"
                      color="primary"
                    >
                      <CIcon name="cil-check" /> {store.getState().modulState}
                    </CButton>{" "}
                    {store.getState().Spinner}
                  </CFormGroup>
                </CForm>
              </CModalBody>
              <CModalFooter>
                {" "}
                <CButton color="secondary" onClick={toggleData}>
                  Close
                </CButton>
              </CModalFooter>
            </CModal>
            <CDataTable
              items={userlist}
              fields={AwardsData.fields}
              hover
              striped
              activePage={page}
              //clickableRows
              loading={loading}
              //onRowClick={(item) => history.push(`/usermanagement/listusers/${item.id}/`+page)}
              scopedSlots={{
                index: (item, index) => (
                  <td>
                    <CBadge color="info">{indexChange(index)}</CBadge>
                  </td>
                ),
                type: (item) => (
                  <td style={{ fontSize: 16 }}>
                    {capitalizeFirstLetter(item.type)}
                  </td>
                ),
                point: (item) => (
                  <td style={{ fontSize: 16, textAlign: "right" }}>
                    {formatNumber(item.point)}
                  </td>
                ),
                name: (item) => (
                  <td style={{ fontSize: 16 }}>
                    {primaryBadge(capitalizeFirstLetter(item.name))}
                  </td>
                ),
                image: (item) => (
                  <td>
                    <img
                      src={"/images/" + item.image}
                      alt={item.image}
                      width={50}
                    />
                  </td>
                ),
              }}
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              doubleArrows={true}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

const mapStateToProps = (state, action) => {
  return { state: action.history.location.pathname };
};

export default connect(mapStateToProps, { store: store })(Users);
