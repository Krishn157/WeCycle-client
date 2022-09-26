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

const AppSideBar = ({ sideBarShow }) => {
  return (
    <CSidebar position="fixed" visible={sideBarShow}>
      <CSidebarBrand>Sidebar Brand</CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
        {/* <CNavTitle>Nav Title</CNavTitle>
        <CNavItem href="/dashboard">
          <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
          DashBoard
        </CNavItem>
        <CNavItem href="/vendors">
          <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
          Vendor List
        </CNavItem>
        <CNavItem href="/new-order">
          <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
          Place Order
          <CBadge color="primary ms-auto">NEW</CBadge>
        </CNavItem>
        <CNavItem href="/order-list">
          <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
          Order List
        </CNavItem>
        <CNavGroup toggler="Nav dropdown">
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown
            item
          </CNavItem>
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown
            item
          </CNavItem>
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown
            item
          </CNavItem>
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown
            item
          </CNavItem>
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown
            item
          </CNavItem>
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown
            item
          </CNavItem>
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown
            item
          </CNavItem>
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown
            item
          </CNavItem>
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown
            item
          </CNavItem>
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown
            item
          </CNavItem>
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown
            item
          </CNavItem>
        </CNavGroup> */}
      </CSidebarNav>
      {/* <CSidebarToggler /> */}
    </CSidebar>
  );
};

export default AppSideBar;
