import React, { useState } from "react";
import { ReactComponent as Robot } from '../src/images/robot.svg'
import './App.css'
import Carregando from './images/Spinner-1s-98px.gif'
import {MdClear,MdMoveToInbox} from "react-icons/md"

//JSX Java Script Extension
function App() {

  const [pessoas, setPessoas] = useState([]);
  const [estaCarregando, setEstaCarregando] = useState(false);
  const [idade, setIdade] = useState('');
  const [etnia, setEtnia] = useState('');
  const estiloIcone = {background: 'red',fontSize: '1.5em'}
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
    let chaveAPI = process.env.REACT_APP_APIKEY;
    const filtraEtnia = etnia.length > 0 ? `&ethnicity=${etnia}`  : ``;
    const filtraIdade = idade.length > 0 ? `&age=${idade}`  : ``;

    let url = `https://api.generated.photos/api/v1/faces?api_key=${chaveAPI}${filtraEtnia}${filtraIdade}&order_by=random`
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
      <div className="linha">
        <ListaPessoas />
      </div>
      <div className="linha">
        <label>Idade:</label>
        <select onChange={e => setIdade(e.target.value)}>
          <option value="">Todas</option>
          <option value="infant">Infantil</option>
          <option value="child">Criança</option>
          <option value="young-adult">Jovem</option>
          <option value="adult">Adulto</option>
          <option value="elderly">Idoso</option>
        </select>
        <label>Etnia:</label>
        <select  onChange={e => setEtnia(e.target.value)}>
          <option value="">Todas</option>
          <option value="white">Branca</option>
          <option value="latino">Latina</option>
          <option value="asian">Asiática</option>
          <option value="black">Negra</option>
        </select>       
      </div>
      <div className="linha">
        <button type='button' onClick={obterFoto}>
        <MdMoveToInbox/> Obter Imagens
      </button>
        {pessoas.length > 0 &&
          <button type="button" onClick={() => setPessoas([])}>
            <MdClear style={estiloIcone}/> Limpar Imagens
         </button>
        }
      </div>
    </div>
  )
}


export default App