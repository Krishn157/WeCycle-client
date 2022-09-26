import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cibAddthis,
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilList,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilTruck,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "Vendor",
  },
  {
    component: CNavItem,
    name: "New Order",
    to: "new-order",
    icon: <CIcon icon={cibAddthis} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Vendor List",
    to: "/vendors",
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Order List",
    to: "/order-list",
    icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: "Docs",
    href: "https://coreui.io/react/docs/templates/installation/",
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
];

export default _nav;
