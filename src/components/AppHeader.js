import {
  cilBell,
  cilEnvelopeOpen,
  cilExitToApp,
  cilList,
  cilMenu,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCollapse,
  CContainer,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CFormInput,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const AppHeader = ({ toggleSideBar }) => {
  const [visible, setVisible] = useState(false);
  const { deleteUserInfo } = useAuth();

  const logOutHandler = () => {
    deleteUserInfo("userInfo");
    window.location.reload();
  };

  return (
    <>
      <CHeader position="sticky" className="mb-4">
        <CContainer fluid>
          <CHeaderToggler onClick={toggleSideBar}>
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>

          <CHeaderBrand className="mx-auto d-md-none" to="/">
            {/* <CIcon icon={logo} height={48} alt="Logo" /> */}
          </CHeaderBrand>
          <CHeaderNav className="d-none d-md-flex me-auto"></CHeaderNav>
          <CHeaderNav>
            <CIcon
              icon={cilExitToApp}
              className="log-out"
              size="lg"
              title="Log Out"
              onClick={logOutHandler}
            />
          </CHeaderNav>
        </CContainer>
      </CHeader>
    </>
  );
};

export default AppHeader;
