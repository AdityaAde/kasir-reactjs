import "./App.css";
import React, { Component } from "react";
import { Col, Row, Container } from "react-bootstrap";
import {
  Hasil,
  ListCategories,
  NavbarComponent,
  Menus,
} from "./components/components";
import { API_URL } from "./utils/constants";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      chooseCategory: "Makanan",
    };
  }

  componentDidMount() {
    axios
      .get(`${API_URL}/products?category.nama=${this.state.chooseCategory}`)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  changeCategory = (value) => {
    this.setState({
      chooseCategory: value,
      menus: [],
    });

    axios
      .get(`${API_URL}/products?category.nama=${value}`)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { menus, chooseCategory } = this.state;
    return (
      <div className="App">
        <NavbarComponent></NavbarComponent>
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategories
                changeCategory={this.changeCategory}
                chooseCategory={chooseCategory}
              ></ListCategories>
              <Col>
                <h4>
                  <strong>Daftar Produk</strong>
                  <hr></hr>
                  <Row>
                    {menus &&
                      menus.map((menu) => (
                        <Menus menu={menu} key={menu.id}></Menus>
                      ))}
                  </Row>
                </h4>
              </Col>
              <Hasil></Hasil>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
