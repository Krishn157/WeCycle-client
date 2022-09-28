import React, { useState } from "react";
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
import { cilLockLocked, cilPhone, cilText, cilUser } from "@coreui/icons";
import { useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const signUpMutation = gql`
  mutation register($wasteUser: WasteUserInput!) {
    usersignup(wasteUser: $wasteUser)
  }
`;

const createUserMutation = gql`
  mutation createUser($wasteUser: WasteUserInput!) {
    createwasteuser(wasteUser: $wasteUser) {
      id
      email
      org_Name
      org_Desc
      phone_No
      type
    }
  }
`;

const Register = () => {
  const [signUpUser] = useMutation(signUpMutation);
  const [createUser] = useMutation(createUserMutation);
  const { saveUserInfo, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(name, email, type, password, phone, desc);
    if (password !== cPassword) {
      alert("Password mismatch");
    }
    try {
      const result = await signUpUser({
        variables: {
          wasteUser: {
            email,
          },
        },
      });
      const isExist = result.data.usersignup;
      console.log(isExist);
      if (isExist) {
        alert("User with same email already exists! ");
      } else {
        const res = await createUser({
          variables: {
            wasteUser: {
              email: email,
              password: password,
              org_Name: name,
              org_Desc: desc,
              phone_No: phone,
              type: type,
            },
          },
        });
        const data = res.data.createwasteuser;
        console.log(data);
        saveUserInfo("userInfo", data);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("userInfo");
    }
  };

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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Organization Email"
                      autoComplete="email"
                      type="email" //humne daala hai
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Contact Number"
                      autoComplete="phone"
                      type="tel" //humne daala hai
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilText} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Description"
                      autoComplete="desc"
                      type="text" //humne daala hai
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
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
                      onClick={() => setType("Producer")}
                    />
                    <CFormCheck
                      inline
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineCheckbox2"
                      value="Consumer"
                      label="Consumer"
                      onClick={() => setType("Consumer")}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      value={cPassword}
                      onChange={(e) => setCPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={submitHandler}>
                      Create Account
                    </CButton>
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
