import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 40px;
  text-decoration: none;
  font-size: 14px;
  transition: 0.5s ease;

  &:hover {
    background: #252831;
    border-left: 4px solid #c70039;
    cursor: pointer;
    color:#ffff;
    text-decoration:none;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #252831;
  height: 40px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 14px;
  transition: 0.5s ease;

  &:hover {
    
    background: #f1c40fe6;
    cursor: pointer;
    color:#ffff;
    text-decoration:none;
  }
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => {
    setSubnav(!subnav);
  };

  const hideSubnav = () => {
    setSubnav(false);
  };


  return (
    <div  >
      <SidebarLink
        to={item.path}
        onClick={item.subNav && showSubnav}
       
      >
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      <div
        style={{
          maxHeight: subnav ? "100%" : "0",
          transition: "max-height 0.5s ease",
          overflow: "hidden",
        }}
      >
        {subnav &&
          item.subNav.map((item, index) => {
            return (
              
              <DropdownLink to={item.path} key={index}>
                {item.icon}
                <SidebarLabel>{item.title}</SidebarLabel>
              </DropdownLink>

            );
          })}
      </div>
    </div>
  );
};

export default SubMenu;
