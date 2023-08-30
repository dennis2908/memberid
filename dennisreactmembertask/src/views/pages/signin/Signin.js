import React, { useState } from "react";

import { useHistory } from "react-router-dom";

//import { useHistory } from 'react-router-dom'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const Signin = () => {
  const history = useHistory();
  const [email, SetEmail] = useState("");
  const ChangeForm = (e) => {
    e.preventDefault();
    if (e.target.name === "email") SetEmail(e.target.value);
    e.preventDefault();
  };
  const SubmitForm = (e) => {
    fetch("http://localhost:8000/user/doLogin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then(async (result) => {
        if (result !== false) {
          await localStorage.setItem("myData", JSON.stringify(result));
          history.push("/award/listaward");
        }
      });

    e.preventDefault();
  };
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol xl={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm
                    onChange={(e) => {
                      ChangeForm(e);
                    }}
                  >
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" name="email" placeholder="Email" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          color="success"
                          onClick={(e) => {
                            SubmitForm(e);
                          }}
                          className="px-4"
                        >
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Signin;
