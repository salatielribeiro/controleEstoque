import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return  <Navbar color="dark" dark expand="lg">
    <div class="d-flex justify-content-center">
      <NavbarBrand tag={Link} to="/"><i class="fa fa-home"></i></NavbarBrand>
      <p class="text-light bg-dark">Controle de Estoque</p>
    </div>
  </Navbar>;
    
  }
}