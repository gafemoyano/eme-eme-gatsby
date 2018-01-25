import React from "react"
import Link from "gatsby-link"
import firebase from "../utils/firebase"
import styled from "styled-components"
import { smartphone, tablet, desktop, black } from "../utils/style-variables"

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  @media (min-width: ${tablet}px) {
    width: calc(100% / 4);
  }
  @media (min-width: ${desktop}px) {
    width: calc(100% / 6);
  }
`

const Grid = styled.div`
  display: block;
  margin: 8rem 0;
  height: auto;
  text-align: center;
  @media (min-width: ${smartphone}px) {
    display: flex;
    flex-wrap: wrap;
    flexd-irection: row;
  }
`
const Cell = styled(Link)`
  padding: 0 1rem;
  height: 280px;
  @media (min-width: ${smartphone}px) {
    width: 100%;
  }
  @media (min-width: ${tablet}px) {
    width: calc(100% / 2);
  }
  @media (min-width: ${desktop}px) {
    width: calc(100% / 3);
  }
`
const TitleContainer = styled.div`
  display: flex;
  background: ${black};
  color: white;
  width: "100%";
  padding: 0.5rem 1rem;
  min-height: 4rem;
  line-height: 1.5rem;
  align-items: center;
`
const ImageTitle = styled.h3`
  flex: 1;
  padding: 0;
  margin: 0;
`

const Image = styled.img`
  min-width: 320px;
  min-height: 320px;
  display: block;
  margin-bottom: 0;
`
class IndexPage extends React.Component {
  state = {
    podcasts: [],
    podcastsByKey: {},
    orderedPodcastKeys: [],
    isPlayerActive: false
  }
  componentDidMount() {
    const podcasts = firebase.database().ref("podcasts")

    podcasts.on("value", snap => {
      const podcastsByKey = {}
      const orderedPodcastKeys = []

      snap.forEach(child => {
        podcastsByKey[child.key] = child.val()
        orderedPodcastKeys.push(child.key)
      })
      const result = snap.val()
      this.setState({
        podcasts: [...result].reverse(),
        orderedPodcastKeys: orderedPodcastKeys.reverse(),
        podcastsByKey
      })
    })
  }

  render() {
    const podcastKeys = this.state.orderedPodcastKeys

    return (
      <div>
        <h1>Podcast</h1>
        <hr />
        <p>
          Cada semana Juliana se pone a hablar de música y blah blah lorem ipsum
          dolorem Cada semana Juliana se pone a hablar de música y blah blah
          lorem ipsum dolorem Cada semana Juliana se pone a hablar de música y
          blah blah lorem ipsum dolorem Cada semana Juliana se pone a hablar de
          música y blah blah lorem ipsum dolorem Cada semana Juliana se pone a
          hablar de música y blah blah lorem ipsum dolorem{" "}
        </p>
        <Grid>
          {podcastKeys.map(key => {
            const podcast = this.state.podcastsByKey[key]
            return (
              <Cell to={`podcasts/${key}`} key={key}>
                <Image
                  src={podcast.pictureDownloadURL}
                  alt={podcast.pictureFileName}
                />
                <TitleContainer>
                  <ImageTitle>{podcast.title}</ImageTitle>{" "}
                </TitleContainer>
              </Cell>
            )
          })}
        </Grid>
      </div>
    )
  }
}
export default IndexPage
