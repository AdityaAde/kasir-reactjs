import axios from "axios";
import React, { Component } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import swal from "sweetalert";
import { API_URL } from "../utils/constants";
import { numberWithCommas } from "../utils/format";
import { ModalCarts, TotalOrders } from "./components";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      cartDetail: false,
      jumlah: 0,
      information: "",
      totalPrice: 0,
    };
  }

  handleShow = (cart) => {
    this.setState({
      showModal: true,
      cartDetail: cart,
      jumlah: cart.jumlah,
      information: cart.information,
      totalPrice: cart.total_harga,
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
      totalPrice: this.state.cartDetail.product.harga * (this.state.jumlah + 1),
    });
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
    }
    this.setState({
      jumlah: this.state.jumlah - 1,
      totalPrice: this.state.cartDetail.product.harga * (this.state.jumlah - 1),
    });
  };

  changeHandler = (event) => {
    this.setState({
      information: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleClose();

    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalPrice,
      product: this.state.cartDetail.product,
      information: this.state.information,
    };
    axios
      .put(`${API_URL}/carts/${this.state.cartDetail.id}`, data)
      .then((_) => {
        swal({
          title: "Update pesanan",
          text: "Success Update pesanan" + data.product.nama,
          icon: "success",
          button: false,
          timer: 1000,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteOrder = (id) => {
    this.handleClose();

    axios
      .delete(`${API_URL}/carts/${id}`)
      .then((_) => {
        swal({
          title: "Hapus pesanan",
          text: "Success Hapus pesanan" + this.state.cartDetail.product.nama,
          icon: "error",
          button: false,
          timer: 1000,
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
                onClick={() => this.handleShow(cart)}>
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
              deleteOrder={this.deleteOrder}
            />
          </ListGroup>
        )}

        <TotalOrders carts={carts}></TotalOrders>
      </Col>
    );
  }
}
