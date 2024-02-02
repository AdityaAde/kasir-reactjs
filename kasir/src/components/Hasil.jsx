import React, { Component } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/format";
import { TotalOrders, ModalCarts } from "./components";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      cartDetail: false,
      jumlah: 0,
      information: "",
    };
  }

  handleShow = (cart) => {
    this.setState({
      showModal: true,
      cartDetail: cart,
      jumlah: cart.jumlah,
      information: cart.information,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
    });
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
    }
    this.setState({
      jumlah: this.state.jumlah - 1,
    });
  };

  changeHandler = (event) => {
    this.setState({
      information: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    console.log("Hai" + this.state.information);
  };

  render() {
    const { carts } = this.props;
    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        {carts.length !== 0 && (
          <ListGroup variant="flush">
            {carts.map((cart) => (
              <ListGroup.Item
                key={cart.id}
                onClick={() => this.handleShow(cart)}
              >
                <Row>
                  <Col xs={2}>
                    <h4>
                      <Badge pill bg="success">
                        {cart.jumlah}
                      </Badge>
                    </h4>
                  </Col>
                  <Col>
                    <h5>{cart.product.nama}</h5>
                    <p></p>
                  </Col>
                  <Col>
                    <strong className="float-right">
                      <p>Rp.{numberWithCommas(cart.total_harga)}</p>
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}

            <ModalCarts
              {...this.state}
              handleClose={this.handleClose}
              tambah={this.tambah}
              kurang={this.kurang}
              changeHandler={this.changeHandler}
              handleSubmit={this.handleSubmit}
            />
          </ListGroup>
        )}

        <TotalOrders carts={carts}></TotalOrders>
      </Col>
    );
  }
}
