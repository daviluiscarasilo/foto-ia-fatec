import React, { useState } from "react";
import { ReactComponent as Robot } from '../src/images/robot.svg'
import './App.css'
import Carregando from './images/Spinner-1s-98px.gif'

//JSX Java Script Extension
function App() {

  const [pessoas, setPessoas] = useState([]);
  const [estaCarregando, setEstaCarregando] = useState(false);

  function ListaPessoas() {
    const listagemPessoas = pessoas.map((pessoa) =>
      <img key={pessoa.id} src={pessoa.urls[4][512]} title="Gerada por IA"
        alt="Gerada por IA"
      />);
    return (
      <div className="fotos">
        <>{listagemPessoas}</>
      </div>
    )
  }
  

  async function obterFoto() {
    setEstaCarregando(true);
    let url = "https://api.generated.photos/api/v1/faces?api_key=dO6zZQ35opwSFsIGdm9iSw"
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setPessoas(data.faces);
        console.log("Dados carregados com sucesso!")
      })
      .catch(function (error) {
        console.error("Houve um problema na requisição " + error.message);
      })
      setEstaCarregando(false);
  }

  return (
    <div className="App">
      <h1>Gerador fotos via IA</h1>
      <Robot />

      { estaCarregando &&
        <img src={Carregando} title="Aguarde..." alt="Imagem carregando" />
      }
      <ListaPessoas />
      <button type='button' onClick={obterFoto}>
        Obter Imagens
      </button>
    </div>
  )
}


export default App