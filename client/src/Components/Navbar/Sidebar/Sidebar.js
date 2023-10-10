import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import studentContext from "../../../context/studentContext";

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 280px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
  overflow-y:auto;
  
  &::-webkit-scrollbar {
    width: 0.4em;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.9);
  }

  &::-webkit-scrollbar-thumb {
    background-color: #575c5ad9;
    outline: 1px solid slategrey;
  }
  
  
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const {sidebar, setSidebar}=useContext(studentContext)

  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  // Effect to handle sub-menu opening with a delay
  useEffect(() => {
    if (subMenuOpen) {
      const timer = setTimeout(() => {
        setSubMenuOpen(false);
      }, 300); // Adjust the delay duration as needed

      return () => clearTimeout(timer);
    }
  }, [subMenuOpen]);

  const handleSubMenuClick = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
      
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return (
                <SubMenu
                  key={index}
                  item={item}
                  subMenuOpen={subMenuOpen}
                  handleSubMenuClick={handleSubMenuClick}
                />
              );
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
