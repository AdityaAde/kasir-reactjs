import axios from "axios";
import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import swal from "sweetalert";
import "../App.css";
import {
    Hasil,
    ListCategories,
    Menus,
    NavbarComponent,
} from "../components/components";
import { API_URL } from "../utils/constants";


export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menus: [],
            chooseCategory: "Makanan",
            carts: [],
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

        axios
            .get(`${API_URL}/carts`)
            .then((res) => {
                const carts = res.data;
                this.setState({ carts });
            })
            .catch((err) => {
                console.log(err);
            });
    }


    componentDidUpdate(prevState) {
        if (this.state.carts !== prevState.carts) {
            axios
                .get(`${API_URL}/carts`)
                .then((res) => {
                    const carts = res.data;
                    this.setState({ carts });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
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

    addCart = (product) => {

   

        axios
            .get(`${API_URL}/carts?product.id=${product.id}`)
            .then((res) => {
                if (res.data.length === 0) {
                    const cart = {
                        jumlah: 1,
                        total_harga: product.harga,
                        product: product,
                    }
                    axios
                        .post(`${API_URL}/carts`, cart)
                        .then((res) => {
                            swal({
                                title: "Success Add to Cart!",
                                text: "Success Add to Cart!" + cart.product.nama,
                                icon: "success",
                                button: false,
                                timer: 1000,
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    const cart = {
                        jumlah: res.data[0].jumlah + 1,
                        total_harga: res.data[0].total_harga + product.harga,
                        product: product,
                    }
                    axios
                        .put(`${API_URL}/carts/${res.data[0].id}`, cart)
                        .then((_) => {
                            swal({
                                title: "Success Add to Cart!",
                                text: "Success Add to Cart!" + cart.product.nama,
                                icon: "success",
                                button: false,
                                timer: 1500,
                            });
                        })
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const { menus, chooseCategory, carts } = this.state;
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
                                                <Menus key={menu.id} menu={menu} addCart={this.addCart}></Menus>
                                            ))}
                                    </Row>
                                </h4>
                            </Col>
                            <Hasil carts={carts}></Hasil>
                        </Row>
                    </Container>
                </div>
            </div>

        );
    }
}
