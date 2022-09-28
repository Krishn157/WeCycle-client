import { cilPuzzle, cilSpeedometer } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CBadge,
  CNavGroup,
  CNavItem,
  CNavTitle,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import React from "react";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { AppSidebarNav } from "./AppSideBarNav";
// sidebar nav config
import navigation from "../_nav";
import { useAuth } from "../contexts/authContext";

const AppSideBar = ({ sideBarShow }) => {
  const { user } = useAuth();
  return (
    <CSidebar position="fixed" visible={sideBarShow}>
      <CSidebarBrand>
        <h5>WECYCLE</h5>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler /> */}
    </CSidebar>
  );
};

export default AppSideBar;
