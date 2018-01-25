import React from "react"
import { Switch, Route } from "react-router"
import ShowPodcast from "./show"
import NotFound from "../404"
import Index from "../index"

const index = () => (
  <Switch>
    <Route exact path="/podcasts/" component={Index} />
    <Route exact path="/podcasts/:slug" component={ShowPodcast} />
    <Route component={NotFound} />
  </Switch>
)

export default index
