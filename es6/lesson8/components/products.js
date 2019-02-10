import React from "react";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import { observer } from "mobx-react";
import productsStore from "../store/products";
import cartStore from "../store/cart";

// export default @observer class extends React.Component{} // просто vscode так форматирует

export default
@observer
class extends React.Component {
  render() {
    let products = productsStore.list.map((item) => {
      let cartBtn = !cartStore.inCart(item.id) ? (
        <Button variant="contained" color="primary" onClick={() => cartStore.add(item.id)}>
          Add to cart
        </Button>
      ) : (
        <Button variant="contained" color="secondary" onClick={() => cartStore.remove(item.id)}>
          Remove from cart
        </Button>
      );

      return (
        <Grid item xs={4} key={item.id}>
          <Card>
            <CardHeader title={item.title} />
            <CardContent>{item.price}</CardContent>
            <CardActions>{cartBtn}</CardActions>
          </Card>
        </Grid>
      );
    });

    return (
      <Grid container spacing={32}>
        {products}
      </Grid>
    );
  }
}
