import React from "react";
import { Modal, Button, Form, FormGroup, FormLabel } from "react-bootstrap";
import { numberWithCommas } from "../utils/format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const ModalCarts = ({
  showModal,
  handleClose,
  cartDetail,
  jumlah,
  information,
  tambah,
  kurang,
  changeHandler,
  handleSubmit,
}) => {
  if (cartDetail) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{cartDetail.product.nama} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <strong>Total Harga</strong>{" "}
              </Form.Label>
              <p>Rp. {numberWithCommas(cartDetail.product.harga)}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <strong>Jumlah: </strong>
              </Form.Label>
              <br />
              <Button variant="primary" size="sm" onClick={() => kurang()}>
                <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
              </Button>
              <strong> {jumlah} </strong>
              <Button variant="primary" size="sm" onClick={() => tambah()}>
                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
              </Button>
            </Form.Group>
            <FormGroup>
              <FormLabel>
                {" "}
                <strong>Keterangan</strong>{" "}
              </FormLabel>
              <Form.Control
                as="textarea"
                placeholder="Contoh: Pedas, Nasi setengah"
                style={{ height: "100px" }}
                value={information}
                onChange={(event) => changeHandler(event)}
              />
            </FormGroup>
            <br />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Hapus Pesanan
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default ModalCarts;
