import './App.css';
import { Col, Row, Container } from 'react-bootstrap';
import { Hasil, ListCategories, NavbarComponent } from './components/components';

function App() {
  return (
    <div className="App">
      <NavbarComponent></NavbarComponent>
      <div className='mt-3'>
        <Container fluid>
          <Row>
            <ListCategories></ListCategories>
            <Col>
              <h4>
                <strong>Daftar Produk</strong>
                <hr></hr>
              </h4>
            </Col>
            <Hasil></Hasil>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
