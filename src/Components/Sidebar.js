import React from "react";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
import * as GrIcons from "react-icons/gr";

export const Sidebar = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome/>,
    cName: "nav-text",

  },
  {
    title: "Profile",
    path: "/Profile",
    icon: <AiIcons.AiFillProfile/>,
    cName: "nav-text ",

  },
  {
    title: "Channel",
    path: "/ChannelDemo",
    icon: <AiIcons.AiOutlineEye />,
    cName: "nav-text",
  },
   {
     title: "My Channel",
     path: "/DisplayChannel",
     icon: <BsIcons.BsDisplay />,
    cName: "nav-text",
   },




];