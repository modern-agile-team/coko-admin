import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation(); // 현재 경로를 가져옴
  const headerItems = [
    {
      id: 1,
      to: '/quiz',
      label: 'quiz',
      isActive: location.pathname === '/quiz' ? 'active' : '',
    },
    {
      id: 2,
      to: '/section',
      label: 'section',
      isActive: location.pathname === '/section' ? 'active' : '',
    },
    {
      id: 3,
      to: '/part',
      label: 'part',
      isActive: location.pathname === '/part' ? 'active' : '',
    },
    {
      id: 4,
      to: '/item',
      label: 'item',
      isActive: location.pathname === '/item' ? 'active' : '',
    },
  ];
  return (
    <>
      <Navbar expand="lg" className="bg-primary">
        <Container>
          <Navbar.Brand href="/">coko Admin</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {headerItems.map(headerItem => (
                <Nav.Link
                  key={headerItem.id}
                  as={Link}
                  to={headerItem.to}
                  className={headerItem.isActive}
                >
                  {headerItem.label}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
