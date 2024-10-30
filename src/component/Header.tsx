import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation(); // 현재 경로를 가져옴
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            className={location.pathname === '/' ? 'active' : ''}
          >
            coko admin
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/quiz"
              className={location.pathname === '/quiz' ? 'active' : ''}
            >
              quiz
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/section"
              className={location.pathname === '/section' ? 'active' : ''}
            >
              section
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/part"
              className={location.pathname === '/part' ? 'active' : ''}
            >
              part
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
