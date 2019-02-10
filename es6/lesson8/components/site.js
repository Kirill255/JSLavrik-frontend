import React from "react";

import Header from "./header";
import Content from "./content";

export default class extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <hr />
        <Content />
        <hr />
        <footer>footer</footer>
      </div>
    );
  }
}
