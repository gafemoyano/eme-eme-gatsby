import React from "react"
import Link from "gatsby-link"
import styled from "styled-components"

const NavBar = styled.header`
  display: flex;
  flex-direction: row;
  background-color: #121921;
  text-transform: uppercase;
  font-weight: bold;
  padding: 2rem 8rem;
  margin-bottom: 2rem;
`

const NavBarLeft = styled(Link)`
  flex: 1;
  font-size: 1rem;
  display: block;
  color: white;
`

const Navigation = styled.nav`
  flex-direction: row;
  font-size: 0.8rem;
  text-align: right;
  flex-grow: 1;
`
const NavLink = styled(Link)`
  cursor: pointer;
  margin: 0px 10px;
  width: 100px;
  color: white;
`

const Header = () => (
  <NavBar>
    <NavBarLeft to="/">Mucha Música</NavBarLeft>
    <Navigation>
      <NavLink to="/">Podcast</NavLink>
      <NavLink to="archive">Archivo</NavLink>
      <NavLink to="about">Acerca</NavLink>
      <NavLink to="playlist">Playlist</NavLink>
      <NavLink to="contact">Contacto</NavLink>
    </Navigation>
  </NavBar>
)

export default Header
