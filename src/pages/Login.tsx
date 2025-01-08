import { Col, Form, Row, Container, Button, Image } from 'react-bootstrap';
import { getImageUrl } from '../utils';
import { authQueries } from '../features/auth/queries';
import { FormEventHandler } from 'react';
import { parseAuthRequestData } from '../features/auth/service/utils';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export default function Login() {
  const { setIsLoggedIn } = useAuthStore();

  const { mutate: mutateLogin } = authQueries.useLogin();

  const navigate = useNavigate();

  const handleMutate: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const authData = Object.fromEntries(formData.entries());
    const parsedAuthRequestData = parseAuthRequestData(authData);

    mutateLogin(parsedAuthRequestData, {
      onSettled: data => {
        if (data?.status === 201) {
          setIsLoggedIn(true);
          return navigate('/');
        }
        alert('로그인 실패');
      },
    });
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <div
        style={{
          width: '400px',
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1 className="mb-5">
          코코 어드민{' '}
          <Image
            src={getImageUrl('레벨1코코.svg')}
            width={120}
            height={60}
          ></Image>
        </h1>
        <Form onSubmit={handleMutate}>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="4">
              Email
            </Form.Label>
            <Col sm="8">
              <Form.Control
                name="email"
                type="email"
                placeholder="email@example.com"
                autoComplete="username"
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="4">
              Password
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
              />
            </Col>
          </Form.Group>
          <Col className="d-flex justify-content-end">
            <Button type="submit">제출</Button>
          </Col>
        </Form>
      </div>
    </Container>
  );
}
