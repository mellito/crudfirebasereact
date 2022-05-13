import { useState } from "react";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { fireBaseAPP } from "../utils/firebaseconfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const firestore = getFirestore(fireBaseAPP);
const storage = getStorage(fireBaseAPP);

const AgregarTarea = ({ correoUsuario, setArrayTareas, arrayTareas }) => {
  let urlDown;
  const [descrip, setDescrip] = useState("");
  const addTaks = async (e) => {
    e.preventDefault();

    const nuevoArrayTareas = [
      ...arrayTareas,
      {
        id: +new Date(),
        descripcion: descrip,
        url: urlDown,
      },
    ];

    const docRef = doc(firestore, `usuarios/${correoUsuario}`);
    await updateDoc(docRef, { tareas: [...nuevoArrayTareas] });
    setArrayTareas(nuevoArrayTareas);
    setDescrip("");
  };

  const fileHandler = async (e) => {
    //detectar archivo
    const localFile = e.target.files[0];
    console.log(localFile.name);
    console.log(`documents/${localFile.name}`);
    //cargar a firebase Storage
    const fileRef = ref(storage, `documentos/${localFile.name}`);
    await uploadBytes(fileRef, localFile);
    // obtener url de descarga
    urlDown = await getDownloadURL(fileRef);
  };
  return (
    <Container>
      <Form onSubmit={addTaks}>
        <Row className="mb-5">
          <Col>
            <Form.Control
              type="text"
              placeholder="describe tu Tarea"
              onChange={(e) => {
                setDescrip(e.target.value);
              }}
              value={descrip}
            />
          </Col>
          <Col>
            <Form.Control
              type="file"
              placeholder="Anade Archivo"
              onChange={fileHandler}
            />
          </Col>
          <Col>
            <Button type="submit"> agregar Tarea </Button>
          </Col>
        </Row>
      </Form>
      <hr />
    </Container>
  );
};

export default AgregarTarea;
