import { useEffect, useState } from "react";
import { fireBaseAPP } from "../utils/firebaseconfig";
import { getAuth, signOut } from "firebase/auth";
import { Container, Button } from "react-bootstrap";
import AgregarTarea from "./AgregarTarea";
import ListarTarea from "./ListarTarea";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
const firestore = getFirestore(fireBaseAPP);

const auth = getAuth(fireBaseAPP);

const handleClickLogOut = async () => {
  signOut(auth);
};

const fakeData = [
  { id: 1, descripcion: "tarea falsa 1", url: "https://picsum.photos/420" },
  { id: 2, descripcion: "tarea falsa 2", url: "https://picsum.photos/420" },
  { id: 3, descripcion: "tarea falsa 3", url: "https://picsum.photos/420" },
  { id: 4, descripcion: "tarea falsa 4", url: "https://picsum.photos/420" },
];

const buscarOCrearDocumento = async (idDocument) => {
  //crear ref documento
  const docRef = doc(firestore, `usuarios/${idDocument}`);
  //buscar documento

  const consult = await getDoc(docRef); //recibe un objeto asi no exista
  //revisar si existe
  if (consult.exists()) {
    //si si existe
    const infoDoc = consult.data();
    return infoDoc.tareas;
  } else {
    await setDoc(docRef, { tareas: [...fakeData] });
    const consult = await getDoc(docRef);
    const infoDoc = consult.data();
    return infoDoc.tareas;
  }

  //sino existe
};

const Home = ({ correoUsuario }) => {
  const [arrayTareas, setArrayTareas] = useState(null);

  useEffect(() => {
    const obtenerTareas = async () => {
      setArrayTareas(await buscarOCrearDocumento(correoUsuario));
    };
    obtenerTareas();
  }, []);
  return (
    <Container>
      <h4>hola sesion iniciada</h4>
      <Button type="button" onClick={handleClickLogOut}>
        cerrar sesion
      </Button>
      <hr />
      <AgregarTarea
        arrayTareas={arrayTareas}
        setArrayTareas={setArrayTareas}
        correoUsuario={correoUsuario}
      />
      {arrayTareas && (
        <ListarTarea
          arrayTareas={arrayTareas}
          setArrayTareas={setArrayTareas}
          correoUsuario={correoUsuario}
        />
      )}
    </Container>
  );
};

export default Home;
