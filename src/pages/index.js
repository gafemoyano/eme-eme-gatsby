import React from "react"
import Link from "gatsby-link"
import firebase from "../utils/firebase"
import styled from "styled-components"
import { tablet, desktop } from "../utils/style-variables"

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`
const Media = styled.div`
  min-width: 0;
  margin: 5px;
  margin: 1rem 1rem;
  width: 100%;
  height: auto;
  @media (min-width: ${tablet}px) {
    width: calc(100% / 4);
  }
  @media (min-width: ${desktop}px) {
    width: calc(100% / 6);
  }
`
const Image = styled.img`
  max-width: 100%;
  display: block;
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
        <Container>
          {podcastKeys.map(key => {
            const podcast = this.state.podcastsByKey[key]
            return (
              <Media>
                <Image
                  src={podcast.pictureDownloadURL}
                  alt={podcast.pictureFileName}
                />
                <h3>{podcast.title}</h3>
              </Media>
            )
          })}
        </Container>
      </div>
    )
  }
}
export default IndexPage
