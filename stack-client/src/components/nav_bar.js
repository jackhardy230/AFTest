import React from 'react';
import '../App.css';
import { Navbar , Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class nav extends React.Component {
  
  Logout = () => {
    localStorage.clear();
    window.location.href = '/login'
  }

  render() {
    if(localStorage.getItem('email')){
      if(localStorage.getItem('type')==="admin"){
        return (
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">ONLINE SHOPPING STORE</Navbar.Brand>
      
            <Navbar.Collapse class="collapse navbar-collapse">
              <Nav class="navbar-nav ml-auto">
              <Nav.Link href="/usersList" ><img src="https://img.icons8.com/bubbles/50/000000/conference-call.png" title="Users"/></Nav.Link>
                <Nav.Link href="/product" ><img src="https://img.icons8.com/bubbles/50/000000/price-tag.png" title="Product"/></Nav.Link>
                <Nav.Link href="/category" ><img src="https://img.icons8.com/bubbles/50/000000/ingredients.png" title="Category"/></Nav.Link>
                <Nav.Link onClick={ this.Logout } ><img src="https://img.icons8.com/bubbles/50/000000/exit.png" title="Logout"/></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
      }else if(localStorage.getItem('type')==="sm"){
        return (
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">ONLINE SHOPPING STORE</Navbar.Brand>
      
            <Navbar.Collapse class="collapse navbar-collapse">
              <Nav class="navbar-nav ml-auto">
                <Nav.Link href="/product" ><img src="https://img.icons8.com/bubbles/50/000000/price-tag.png" title="Product"/></Nav.Link>
                <Nav.Link onClick={ this.Logout } ><img src="https://img.icons8.com/bubbles/50/000000/exit.png" title="Logout"/></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
      }else{
        return (
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">ONLINE SHOPPING STORE</Navbar.Brand>
      
            <Navbar.Collapse class="collapse navbar-collapse">
              <Nav class="navbar-nav ml-auto">
                <Nav.Link href="/cart" ><img src="https://img.icons8.com/bubbles/50/000000/shopping-cart.png" title="Cart"/></Nav.Link>
                <Nav.Link href="/order" ><img src="https://img.icons8.com/bubbles/50/000000/used-product.png" title="My Order"/></Nav.Link>
                <Nav.Link onClick={ this.Logout } ><img src="https://img.icons8.com/bubbles/50/000000/exit.png" title="Logout"/></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
      }
    }else{
      return (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">ONLINE SHOPPING STORE</Navbar.Brand>
    
          <Navbar.Collapse class="collapse navbar-collapse">
            <Nav class="navbar-nav ml-auto">
              <Nav.Link href="/login"><img src="https://img.icons8.com/bubbles/50/000000/login-rounded-right.png" title="Login"/></Nav.Link>
              <Nav.Link href="/register"><img src="https://img.icons8.com/bubbles/50/000000/add-file.png" title="Register"/></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }

  }
}

export default nav;