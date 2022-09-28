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

const AppHeader = ({ toggleSideBar }) => {
  const [visible, setVisible] = useState(false);

  const logOutHandler = () => {
    localStorage.removeItem("userInfo");
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
          <CHeaderNav className="d-none d-md-flex me-auto">
            {/* <CNavItem>
              <CNavLink to="/dashboard" component={NavLink}>
                Dashboard
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">Users</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">Settings</CNavLink>
            </CNavItem> */}
          </CHeaderNav>
          <CHeaderNav>
            <CIcon
              icon={cilExitToApp}
              className="log-out"
              size="lg"
              title="Log Out"
              onClick={logOutHandler}
            />

            {/* <CNavItem>
              <CNavLink href="#">
                <CIcon icon={cilList} size="lg" />
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">
                <CIcon icon={cilEnvelopeOpen} size="lg" />
              </CNavLink>
            </CNavItem> */}
          </CHeaderNav>
        </CContainer>
      </CHeader>
    </>
  );
};

export default AppHeader;
