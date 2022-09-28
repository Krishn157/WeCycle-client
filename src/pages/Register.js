import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormCheck,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { saveUserInfo, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Organization Name"
                      autoComplete="username"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Organization Email"
                      autoComplete="email"
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CFormCheck
                      inline
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineCheckbox1"
                      value="Producer"
                      label="Producer"
                    />
                    <CFormCheck
                      inline
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineCheckbox2"
                      value="Consumer"
                      label="Consumer"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success">Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
