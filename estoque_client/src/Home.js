import React, { Component } from 'react';
import './App.css';
import AppNavbar from './components/AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <Button color="link"><Link to="/produtos">Produtos</Link></Button>
          <Button color="link"><Link to="/">Saídas</Link></Button>
          <Button color="link"><Link to="/">Entradas</Link></Button>
        </Container>
      </div>
    );
  }
}

export default Home;