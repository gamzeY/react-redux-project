import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav
} from 'reactstrap';
import CartSummery from '../cart/CartSummery';


const Navi = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);


  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/" className="mr-auto">Heyoo!</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Nav navbar>
          <CartSummery></CartSummery>
          </Nav>
      </Navbar>
    </div>
  );
}
export default Navi;