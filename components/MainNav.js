import { Container, Nav, Navbar, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import Link from 'next/link'; 
import { useRouter } from 'next/router';
import { useState } from 'react'; 
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';

const MainNav = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchField = event.target.search.value;
    
    // Compute the queryString
    const queryString = `title=true&q=${searchField}`;
  
    // Add the computed queryString to the searchHistory array
    setSearchHistory(current => [...current, queryString]);
  
    // Navigate to the search results page
    router.push(`/artwork?${queryString}`);
    
    // Close the navbar after search submission
    setIsExpanded(false);
  };

  return (
    <>
      <Navbar className="fixed-top navbar-light bg-light" expand="lg" expanded={isExpanded}>
        <Container>
          <Navbar.Brand>Tina Khakian</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleExpansion} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link href="/">
                <span className={router.pathname === "/" ? "active" : ""}>Home</span>
              </Link>
              <span className="nav-space"> </span> 
              <Link href="/search">
                <span className={router.pathname === "/search" ? "active" : ""}>Advanced Search</span>
              </Link>
            </Nav>
            <Form className="d-flex" onSubmit={handleSubmit} style={{ justifyContent: 'flex-end', width: '100%' }}>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-2"
                name="search"
              />
              <Button type="submit" variant="outline-light">Search</Button>
            </Form>
            <Nav>
              <NavDropdown title="User Name" id="basic-nav-dropdown" className="custom-dropdown">
                <NavDropdown.Item>
                  <Link href="/favourites">
                    <span className={router.pathname === "/favourites" ? "active" : ""}>Favourites</span>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link href="/history">
                    <span className={router.pathname === "/history" ? "active" : ""}>Search History</span>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
      <style jsx>{`
        .nav-space {
          margin-right: 10px; 
        }
        .active {
          color: #999;
        }
        .custom-dropdown .dropdown-menu {
          background-color: #343a40;
        }
      `}</style>
    </>
  );
};

export default MainNav;
