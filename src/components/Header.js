import React from "react"
import Link from "gatsby-link"
import styled from "styled-components"
import logo from "./logo.png"

const NavBar = styled.nav`
  background-color: #121921;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 2rem;
  min-height: 80px;
  z-index: 2;
  height: 3.5rem;
`
const FluidContainer = styled.div`
  display: flex;
  align-items: stretch;
  flex-flow: row wrap;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`
const NavBarBrand = styled.div`
  align-items: stretch;
  display: flex;
  flex-shrink: 0;
  min-height: 3.25rem;
`
const NavBarItem = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
`
const NavBarLeft = styled(Link)`
  display: flex;
  font-size: 1rem;
  text-decoration: none;
  color: white;
  height: 80px;
  max-width: 200px;
  line-height: 120px;
  align-items: center;
`
const Logo = styled.img`
  margin: 0;
  height: 58px;
  width: 200px;
  line-height: 80px;
`
const NavBarRight = styled.div`
  flex-direction: row;
  font-size: 0.8rem;
  text-align: right;
  flex-grow: 1;
  height: 100%;
`
const NavLink = styled(Link)`
  cursor: pointer;
  margin: 0px 10px;
  width: 100px;
  color: white;
  height: 70px;
  line-height: 80px;
  padding: 1rem;
`
const Title = styled.h1`
  color: white;
  display: block;
  font-size: 1.31951rem;
  line-height: 2.1rem;
`
const Header = () => (
  <NavBar>
    <FluidContainer>
      <NavBarLeft to="/">
        <Logo src={logo} alt="" />
      </NavBarLeft>
      <NavBarRight>
        <NavLink to="/">Podcast</NavLink>
        <NavLink to="/archive">Archivo</NavLink>
        <NavLink to="/about">Acerca</NavLink>
        <NavLink to="/playlist">Playlist</NavLink>
        <NavLink to="/contact">Contacto</NavLink>
      </NavBarRight>
    </FluidContainer>
  </NavBar>
)

export default Header
