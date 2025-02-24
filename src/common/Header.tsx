import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation(); // 현재 경로를 가져옴
  const headerItems = [
    {
      id: 1,
      to: '/item',
      label: '상점 아이템',
      isActive: location.pathname === '/item' ? 'active' : '',
    },
    {
      id: 2,
      to: '/daily-quests',
      label: '일일 퀘스트',
      isActive: location.pathname === '/daily-quests' ? 'active' : '',
    },
    {
      id: 3,
      to: '/section',
      label: '섹션',
      isActive: location.pathname === '/section' ? 'active' : '',
    },
    {
      id: 4,
      to: '/part',
      label: '파트',
      isActive: location.pathname === '/part' ? 'active' : '',
    },
    {
      id: 5,
      to: '/quiz',
      label: '퀴즈',
      isActive: location.pathname === '/quiz' ? 'active' : '',
    },
    {
      id: 6,
      to: '/opinions',
      label: '문의사항',
      isActive: location.pathname === '/opinions' ? 'active' : '',
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
