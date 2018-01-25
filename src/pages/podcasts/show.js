import React from "react"

import Link from "gatsby-link"
import firebase from "../../utils/firebase"
import styled from "styled-components"
import { tablet, desktop, mediumGrey } from "../../utils/style-variables"

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`

const Image = styled.img`
  display: block;
  text-align: center;
  height: 270px;
  width: 270px;
`

const Description = styled.div`
  padding-bottom: 1rem;
`
const Published = styled.div`
  color: ${mediumGrey};
  padding-bottom: 2rem;
`
const AudioContainer = styled.div`
  padding: 2rem 0rem;
`

const TrackListContainer = styled.div`
  padding: 2rem 0rem;
`
class PodcastPage extends React.Component {
  state = {
    podcast: {}
  }
  createIboxAudio() {
    return {
      __html: `<iframe id="audio_23324083" frameborder="0" allowfullscreen="" scrolling="no" height="200" style="border:1px solid #EEE; box-sizing:border-box; width:100%;" src="https://www.ivoox.com/player_ej_23324083_4_1.html?c1=ff6600" />`
    }
  }
  componentDidMount() {
    // const podcasts = firebase.database().ref("podcasts")
    const slug = this.props.match.params.slug
    firebase
      .database()
      .ref(`podcasts/${slug}`)
      .once("value")
      .then(snap => {
        const podcast = snap.val()
        this.setState({ podcast: podcast })
      })
  }

  render() {
    const podcast = this.state.podcast

    return (
      <div>
        <h1>{podcast.title}</h1>
        <hr />
        <ImageContainer>
          <Image src={podcast.pictureDownloadURL} />
        </ImageContainer>
        <Description>{podcast.description}</Description>
        <Published>Published Jan 19, 2018</Published>
        <AudioContainer>
          <h2>Escuchar</h2>
          <audio
            controls
            src={podcast.audioDownloadURL}
            type="audio/mpeg"
            style={{ paddingBottom: "5rem" }}
          />
          <div dangerouslySetInnerHTML={this.createIboxAudio()} />
        </AudioContainer>
        <TrackListContainer>
          <h2>Lista de canciones</h2>
          <ul>
            {podcast.tracks &&
              podcast.tracks.map(track => {
                return <li>{track.text}</li>
              })}
          </ul>
        </TrackListContainer>
      </div>
    )
  }
}
export default PodcastPage
