import React from "react"
import Helmet from "react-helmet"
import styled from "styled-components"
import { db, storage } from "../../utils/firebase"

const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  & input, & textarea{
    flex:  1 1 auto;
    display: block;
    margin-bottom: 10px;
    margin-right: 8px;
    padding: 8px 4px;
    margin-top -8px;
  }
`
const Label = styled.div`
  flex: none;
  width: 125px;
  font-weight: bold;
  font-size: 1em;
`
const Button = styled.button`
  padding: 5px 15px;
  margin: 5px;
  min-width: 100px;
  cursor: pointer;
`
const ImageContainer = styled.div`
  display: flex;
  justify-content: center
  flex-wrap: wrap;
`
const MediaItem = styled.div`
  min-width: 0;
  margin: 5px;
`
const PreviewImage = styled.img`
  width: 450px;
  max-width: 100%;
  max-height: 450px;
`
const DeleteLink = styled.a`
  flex: 0.1 1 auto;
  text-decoration: underline;
  cursor: pointer;
`
const UploadedImage = props => (
  <ImageContainer>
    <MediaItem>
      <PreviewImage src={props.url} />
    </MediaItem>
  </ImageContainer>
)

class NewPodcastPage extends React.Component {
  state = {
    podcast: {
      title: "",
      description: "",
      audioFileName: "",
      audioDownloadURL: "",
      pictureFileName: "",
      pictureDownloadURL: "",
      tracks: [{ text: "" }]
    },
    pictureUploadMessage: "",
    audioUploadMessage: ""
  }

  handleAddTrack() {
    this.setState(prevState => ({
      ...prevState,
      podcast: {
        ...prevState.podcast,
        tracks: [...prevState.podcast.tracks, { text: "" }]
      }
    }))
  }
  handleRemoveTrack(idx) {
    this.setState(prevState => ({
      ...prevState,
      podcast: {
        ...prevState.podcast,
        tracks: prevState.podcast.tracks.filter((s, sidx) => idx !== sidx)
      }
    }))
  }
  handleTrackChange(idx, event) {
    const updatedTracks = this.state.podcast.tracks.map((item, tidx) => {
      if (idx !== tidx) {
        return item
      }
      return {
        ...item,
        text: event.target.value
      }
    })
    this.setState(prevState => ({
      ...prevState,
      podcast: {
        ...prevState.podcast,
        tracks: updatedTracks
      }
    }))
  }

  handleChange = event => {
    const name = event.target.name
    this.setState({
      podcast: {
        ...this.state.podcast,
        [name]: event.target.value
      }
    })
  }
  handleFormSubmit = event => {
    event.preventDefault()
    const podcastsRef = db.ref("podcasts")
    const podcast = { ...this.state.podcast }
    podcastsRef.push(podcast)
  }

  handleImageUpload = event => {
    event.preventDefault()
    const picture = this.pictureInput.files[0]
    const name = picture.name
    const ref = storage.ref()

    let uploadTask = ref.child(`img/${name}`).put(picture)

    uploadTask.on(
      "state_changed",
      snapshot => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100
        switch (snapshot.state) {
          case "paused": // or 'paused'
            this.setState(prevState => ({
              ...prevState,
              pictureUploadMessage: "Carga pausada al " + progress + " %"
            }))
            break
          case "running": // or 'running'
            this.setState(prevState => ({
              ...prevState,
              pictureUploadMessage: "Cargando " + progress + " %"
            }))
            break
        }
      },
      error => {
        this.setState(prevState => ({
          ...prevState,
          audioUploadMessage: "Ocurrió un error durante la carga de archivo."
        }))
        console.log(error)
      },
      () => {
        var downloadURL = uploadTask.snapshot.downloadURL
        var name = uploadTask.snapshot.metadata.name
        this.setState(prevState => ({
          ...prevState,
          podcast: {
            ...prevState.podcast,
            pictureDownloadURL: downloadURL
          },
          pictureUploadMessage: "Image uploaded successfully"
        }))
      }
    )
  }

  handleAudioUpload = event => {
    event.preventDefault()
    const audio = this.audioInput.files[0]
    const name = audio.name
    const ref = storage.ref()

    let uploadTask = ref.child(`audio/${name}`).put(audio)

    uploadTask.on(
      "state_changed",
      snapshot => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100
        switch (snapshot.state) {
          case "paused": // or 'paused'
            this.setState(prevState => ({
              ...prevState,
              audioUploadMessage: "Carga pausada al " + progress + " %"
            }))
            break
          case "running": // or 'running'
            this.setState(prevState => ({
              ...prevState,
              audioUploadMessage: "Cargando " + progress + " %"
            }))
            break
        }
      },
      error => {
        this.setState(prevState => ({
          ...prevState,
          podcast: {
            ...prevState.podcast,
            audioDownloadURL: downloadURL
          },
          audioUploadMessage: "Ocurrió un error durante la carga de archivo."
        }))
        console.log(error)
      },
      () => {
        var downloadURL = uploadTask.snapshot.downloadURL
        this.setState(prevState => ({
          ...prevState,
          podcast: {
            ...prevState.podcast,
            audioDownloadURL: downloadURL
          },
          audioUploadMessage: "Image uploaded successfully"
        }))
      }
    )
  }

  render() {
    const {
      title,
      description,
      pictureFileName,
      pictureDownloadURL,
      audioDownloadURL,
      audioFileName,
      tracks
    } = {
      ...this.state.podcast
    }
    const [audioUploadMessage, pictureUploadMessage] = [
      this.state.audioUploadMessage,
      this.state.pictureUploadMessage
    ]
    return (
      <div>
        <Helmet>
          <title>New Podcast</title>
        </Helmet>
        <h1>Crear Podcast</h1>
        <form onSubmit={this.handleFormSubmit}>
          <FormGroup>
            <Label>Título</Label>
            <input
              value={title}
              name="title"
              type="text"
              onChange={this.handleChange}
            />
          </FormGroup>
          <hr />
          <FormGroup>
            <Label>Descripción</Label>
            <textarea
              value={description}
              name="description"
              onChange={this.handleChange}
            />
          </FormGroup>
          <hr />
          {this.state.podcast.tracks.map((track, idx) => (
            <FormGroup key={idx}>
              <Label>Tracklist</Label>
              <span
                style={{ flex: "0.1 1 auto", fontWeight: "bold" }}
              >{`#${idx}`}</span>
              <input
                value={track.text}
                name="tracklist"
                placeholder="Artista - Canción"
                onChange={this.handleTrackChange.bind(this, idx)}
              />
              <DeleteLink onClick={this.handleRemoveTrack.bind(this, idx)}>
                Eliminar
              </DeleteLink>
            </FormGroup>
          ))}
          <FormGroup>
            <Button onClick={this.handleAddTrack.bind(this)}>Agregar</Button>
          </FormGroup>
          <hr />
          <FormGroup>
            <Label>Audio</Label>
            <input
              value={audioFileName}
              name="audioFileName"
              type="file"
              ref={input => {
                this.audioInput = input
              }}
              onChange={this.handleChange}
            />
            <Button onClick={this.handleAudioUpload}>Subir</Button>
          </FormGroup>
          {audioDownloadURL && (
            <audio controls src={audioDownloadURL} type="audio/mpeg" />
          )}
          <FormGroup>
            <div>{audioUploadMessage}</div>
          </FormGroup>
          <hr />
          <FormGroup>
            <Label>Foto</Label>
            <input
              value={pictureFileName}
              name="pictureFileName"
              type="file"
              ref={input => {
                this.pictureInput = input
              }}
              onChange={this.handleChange}
            />
            <Button onClick={this.handleImageUpload}>Subir</Button>
          </FormGroup>
          {pictureDownloadURL && <UploadedImage url={pictureDownloadURL} />}
          <FormGroup>
            <div>{pictureUploadMessage}</div>
          </FormGroup>
          <hr />
          <FormGroup>
            <Button>Guardar</Button>
            <Button>Cancelar</Button>
          </FormGroup>
        </form>
      </div>
    )
  }
}

export default NewPodcastPage
