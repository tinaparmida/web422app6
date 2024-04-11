// register.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import { registerUser } from "@/lib/authenticate";
import { Alert, Form, Button } from 'react-bootstrap';

export default function Register() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [warning, setWarning] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await registerUser(user, password, password2);
      router.push('/login');
    } catch (error) {
      setWarning(error.message);
    }
  }

  return (
    <>
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="userName">
          <Form.Label>User:</Form.Label>
          <Form.Control
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password2">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      {warning && <Alert variant="danger">{warning}</Alert>}
    </>
  );
}
