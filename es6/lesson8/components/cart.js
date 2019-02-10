import React from "react";
import { observer } from "mobx-react";
import cartStore from "../store/cart";

// export default @observer class extends React.Component{} // просто vscode так форматирует

export default
@observer
class extends React.Component {
  render() {
    return (
      <div>
        <input type="button" value="x" onClick={() => cartStore.clear()} />
        <div>In Cart: {cartStore.cnt}</div>
        <div>Total: {cartStore.total}</div>
      </div>
    );
  }
}
