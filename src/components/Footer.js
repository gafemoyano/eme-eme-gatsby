import React from "react"
import { white, black } from "../utils/style-variables"
import styled from "styled-components"

const Footer = styled.footer`
  color: hsl(0, 0%, 100%);
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  background-color: ${black};
`

const Copyright = styled.div`
  padding: 15px 0;
  font-size: 0.9rem;
  background-color: #121213;
  text-align: center;
`
const FooterLink = styled.a`
  color: hsl(0, 0%, 100%);
  font-weight: bold;
`

const SocialList = styled.div`
  margin: 40px 0;
  text-align: center;
`
const SocialLink = styled.a`
  color: #eeeeee;
  background-color: ${black};

  margin-left: 20px;
  margin-right: 20px;
  transition: all 0.3s ease-in-out;
`
const FooterSection = () => (
  <Footer>
    <SocialList>
      <SocialLink href="#">
        <i className="fa fa-facebook fa-2x" />
      </SocialLink>
      <SocialLink href="http://www.ivoox.com/podcast-eme-eme_sq_f1494339_1.html">
        <i className="fa fa-podcast fa-2x" />
      </SocialLink>
      <SocialLink href="#">
        <i className="fa fa-envelope-o fa-2x" />
      </SocialLink>
    </SocialList>
    <Copyright>
      <span>© 2018 Todos los Derechos Reservados</span>{" "}
      <strong>Juliana Ramírez</strong>.
    </Copyright>
  </Footer>
)

export default FooterSection
