import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import styled from "styled-components"
import { tablet, desktop } from "../utils/style-variables"
import "./index.css"

import Header from "../components/Header"

const Main = styled.main`
  max-width: 100%;
  overflow-x: hidden;
  flex: 1 0 auto;
`

const Content = styled.div`
  margin: 0 auto;
  max-width: ${tablet}px;
  overflow: visible;
  padding: 0 1rem;
  @media (min-width: ${tablet}px) {
    padding: 0;
  }
  @media (min-width: ${desktop}px) {
    max-width: ${desktop}px;
  }
`

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Mucha Música"
      meta={[
        { name: "description", content: "Música. Mucha Música." },
        { name: "keywords", content: "sample, something" }
      ]}
    />
    <Header />

    <Main>
      <Content>{children()}</Content>
    </Main>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.any
}

export default TemplateWrapper
