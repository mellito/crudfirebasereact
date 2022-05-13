import React from "react";
import { Col, Container, Row, Stack, Button } from "react-bootstrap";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { fireBaseAPP } from "../utils/firebaseconfig";
const firestore = getFirestore(fireBaseAPP);

const ListarTarea = ({ arrayTareas, correoUsuario, setArrayTareas }) => {
  const eliminarTarea = async (idTarea) => {
    //crear nuevo array de tareas
    const nuevoArrayTareas = arrayTareas.filter((objetoTarea) => {
      return objetoTarea.id !== idTarea;
    });
    //actualizar base de datos
    const docRef = doc(firestore, `usuarios/${correoUsuario}`);
    await updateDoc(docRef, { tareas: [...nuevoArrayTareas] });
    //actualizar state
    setArrayTareas(nuevoArrayTareas);
  };
  return (
    <Container>
      <Stack>
        {arrayTareas.map((objetotajera) => {
          return (
            <>
              <Row>
                <Col>{objetotajera.descripcion}</Col>
                <Col>
                  <a href={objetotajera.url}>
                    <Button variant="secondary">ver Archivo</Button>
                  </a>
                </Col>
                <Col>
                  <Button
                    variant="danger"
                    onClick={() => eliminarTarea(objetotajera.id)}
                  >
                    Eliminar Tarea
                  </Button>
                </Col>
              </Row>
              <hr />
            </>
          );
        })}
      </Stack>
    </Container>
  );
};

export default ListarTarea;
