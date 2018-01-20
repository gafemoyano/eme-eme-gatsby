import React from "react"
import Link from "gatsby-link"
import { db } from "../utils/firebase"
import PostPreview from "../components/PostPreview"

class IndexPage extends React.Component {
  state = {
    posts: [],
    postsByKey: {},
    orderedPostKeys: [],
    prevPostKey: null,
    nextPostKey: null,
    isPlayerActive: false
  }
  componentDidMount() {
    const posts = db.ref("posts")

    posts
      .orderByChild("week")
      .startAt(1)
      .endAt(5)
      .on("value", snap => {
        const postsByKey = {}
        const orderedPostKeys = []

        snap.forEach(child => {
          postsByKey[child.key] = child.val()
          orderedPostKeys.push(child.key)
        })
        const result = snap.val()
        this.setState({
          posts: [...result].reverse(),
          orderedPostKeys: orderedPostKeys.reverse(),
          postsByKey
        })
      })
  }

  handlePlay = async key => {
    event.preventDefault()
    const { postsByKey, orderedPostKeys } = { ...this.state }
    const currentIndex = orderedPostKeys.indexOf(key)
    const nextPostKey =
      currentIndex < orderedPostKeys.length - 1
        ? orderedPostKeys[currentIndex + 1]
        : null
    const prevPostKey =
      currentIndex > 0 ? orderedPostKeys[currentIndex - 1] : null

    const post = postsByKey[key]

    const storage = firebase.storage()
    const audioReference = storage.refFromURL(post.audio)
    const artReference = storage.refFromURL(post.art)
    const [audio, art] = await Promise.all([
      audioReference.getDownloadURL(),
      artReference.getDownloadURL()
    ])
    this.setState({
      audioTitle: `${post.artist} - ${post.song}`,
      playerTitle: `#${post.week}`,
      audioUrl: audio,
      artUrl: art,
      nextPostKey,
      prevPostKey
    })
    this.player.play()
  }

  render() {
    const postKeys = this.state.orderedPostKeys
    const { prevPostKey, nextPostKey } = this.state
    const prevPostLabel = `#${prevPostKey}`
    const nextPostLabel = `#${nextPostKey}`

    return (
      <div>
        {postKeys.map(key => {
          const post = this.state.postsByKey[key]
          return (
            <PostPreview
              key={key}
              postKey={key}
              post={post}
              handlePlay={this.handlePlay}
            />
          )
        })}
      </div>
    )
  }
}
export default IndexPage
