import * as React from "react";

import WebSceneView from "./websceneview";
import Menu from "./menu";

interface State {
  currentScene: string | null;
}

export default class App extends React.Component<any, State> {

  constructor(props: any) {
    super(props);

    const queryString = window.location.search.slice(1);
    if (queryString) {
      const searchKeyValue = queryString.split("=");
      if (searchKeyValue[0] === "scene") {
        const scene = searchKeyValue[1];
        this.state = {
          currentScene: scene
        };
      }
    }
    else {
      this.state = {
        currentScene: null
      };
    }
  }

  changeScene(type: string) {
    this.setState({
      currentScene: type
    });
    if (history.pushState) {
      let newurl = `${window.location.protocol}//${window.location.host + window.location.pathname}`;
      if (type) {
        newurl += `?scene=${type}`;
      }
      window.history.pushState({ path : newurl }, "", newurl);
    }

  }

  render() {
    return (
      <div id="container">
        <WebSceneView webscene = { this.state.currentScene }/>
        <Menu handleSceneChange = { this.changeScene.bind(this) } webscene = { this.state.currentScene }/>
      </div>
    );
  }
}
