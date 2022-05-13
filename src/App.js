import { useState, useEffect } from "react";
import Home from "./components/Home";
import Logeo from "./components/Logeo";
import { fireBaseAPP } from "./utils/firebaseconfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(fireBaseAPP);

function App() {
  const [usuarioGlobal, setUsuarioGlobal] = useState(null);

  onAuthStateChanged(auth, (fireBaseUser) => {
    if (fireBaseUser) {
      //codigo sesion iniciada
      setUsuarioGlobal(fireBaseUser);
    } else {
      setUsuarioGlobal(null);
    }
  });
  return (
    <>
      {usuarioGlobal ? <Home correoUsuario={usuarioGlobal.email} /> : <Logeo />}
    </>
  );
}

export default App;
