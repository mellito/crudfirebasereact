import { useState } from "react";
import { Stack, Container, Form, Button } from "react-bootstrap";
import { fireBaseAPP } from "../utils/firebaseconfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";

const auth = getAuth(fireBaseAPP);
const googleProvider = new GoogleAuthProvider();

const Logeo = () => {
  const [isLoged, setIsLoged] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.formBasicEmail.value;
    const password = e.target.formBasicPassword.value;

    if (isLoged) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        e.target.formBasicEmail.value = "";
        e.target.formBasicPassword.value = "";
        return setIsLoged(false);
      } catch (error) {
        console.log(error);
      }
    }
    if (!isLoged) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        e.target.formBasicEmail.value = "";
        e.target.formBasicPassword.value = "";
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Container>
      <Stack gap={3}>
        {isLoged ? "Registrate" : "inicia sesion"}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            {isLoged ? "Registrate" : "inicia sesion"}
          </Button>
        </Form>
        <Button
          variant="primary"
          type="submit"
          style={{ width: "300px" }}
          onClick={async () => {
            await signInWithRedirect(auth, googleProvider);
          }}
        >
          Accerder con Google
        </Button>

        <Button
          style={{ width: "300px" }}
          variant="primary"
          type="submit"
          onClick={() => {
            setIsLoged(!isLoged);
          }}
        >
          {isLoged
            ? "Ya tienes cuenta? Inicia sesion"
            : "No tienes cuenta? Registrate"}
        </Button>
      </Stack>
    </Container>
  );
};

export default Logeo;
