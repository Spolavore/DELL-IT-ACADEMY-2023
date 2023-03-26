import styles from "./itens.module.css";
import { Link } from "react-router-dom";

import { useState } from "react";
export default function Itens() {
  const cidadesPossiveis = [
    "ARACAJU",
    "BELEM",
    "BELO HORIZONTE",
    "BRASILIA",
    "CAMPO GRANDE",
    "CUIABA",
    "CURITIBA",
    "FLORIANOPOLIS",
    "FORTALEZA",
    "GOIANIA",
    "JOAO PESSOA",
    "MACEIO",
    "MANAUS",
    "NATAL",
    "PORTO ALEGRE",
    "PORTO VELHO",
    "RECIFE",
    "RIO BRANCO",
    "RIO DE JANEIRO",
    "SALVADOR",
    "SAO LUIS",
    "SAO PAULO",
    "TERESINA",
    "VITORIA",
  ];

    // Variaveis e useStates referentes as quantidades de itens
    // a serem transportados
    let [celular, setCelular] = useState("");
    let [geladeira, setGeladeira] = useState("");
    let [freezer, setFreezer] = useState("");
    let [cadeira, setCadeira] = useState("");
    let [luminaria, setLuminaria] = useState("");
    let [lavadora, setLavadora] = useState("");


    // Variaveis e useStates referentes as cidades do percurso total
    let [cidade_inicial, setCidadeInicial] = useState("");
    let [cidade_parada, setCidadeParada] = useState("");
    let [cidade_dest, setCidadeDest] = useState("");

    function VerifyInputs(){
      const quantidadeItens = [celular, geladeira, freezer, cadeira, luminaria, lavadora];
      
      if(quantidadeItens.includes("")){
        alert(`Campo de número ${quantidadeItens.indexOf("") + 1} inválido!`)
        alert("Preencha todos os campos antes de enviar as informações");
      }
      // Parte da verificação das cidades passadas, se elas estão contidas 
      // nas cidades permitidas
      else if(!(cidadesPossiveis.includes(cidade_inicial.toUpperCase()))){
          alert('Cidade de partida não existe ou não condiz com a norma');
        } else if(!(cidadesPossiveis.includes(cidade_parada.toUpperCase()))){
          alert('Cidade de parada não existe ou não condiz com a norma');
        } else if(!(cidadesPossiveis.includes(cidade_dest.toUpperCase()))){
          alert('Cidade de destino não existe ou não condiz com a norma');
        }
    }

  return (
    <>
      <div className={styles.container}>
        <h2>Escreva a quantidade de itens a ser transportados</h2>

        <div className={styles.dataList}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "50px" }}
          >
            <label for="celular">Celular: </label>
            <label for="geladeira">Geladeira: </label>
            <label for="freezer">Freezer: </label>
            <label for="Cadeira">Cadeira: </label>
            <label for="luminaria">Luminária:</label>
            <label for="lavadora">Lavadora de Roupas:</label>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "50px" }}
          >
            <input name="celular" id="celular" type={`number`} className={styles.inputField} onChange={(e) => setCelular(e.target.value)}/>
            <input name="geladeira" id="geladeira" type={`number`} className={styles.inputField} onChange={(e) => setGeladeira(e.target.value)}/>
            <input name="freezer" id="freezer" type={`number`} className={styles.inputField} onChange={(e) => setFreezer(e.target.value)}/>
            <input name="cadeira" id="cadeira" type={`number`} className={styles.inputField} onChange={(e) => setCadeira(e.target.value)}/>
            <input name="luminaria" id="celular" type={`number`} className={styles.inputField} onChange={(e) => setLuminaria(e.target.value)}/>
            <input name="lavadora" id="lavadora" type={`number`} className={styles.inputField} onChange={(e) => setLavadora(e.target.value)}/>
          </div>
        </div>

        <h2>Informe as cidades do percurso</h2>
            <label for="cidade_ini">Indique a cidade de partida</label>
            <input name="cidade_ini" id="cidade_ini" type={'text'} className={styles.inputAlt} onChange={(e) => setCidadeInicial(e.target.value)}/>
            <label for="cidade_p">Indique a cidade de parada</label>
            <input name="cidade_p" id="cidade_p" type={'text'} className={styles.inputAlt} onChange={(e) => setCidadeParada(e.target.value)}/>
            <label for="cidade_des">Indique a cidade de destino </label>
            <input name="cidade_des" id="cidade_des" type={'text'} className={styles.inputAlt} onChange={(e) => setCidadeDest(e.target.value)}/>

            <div style={{display: "flex", gap: "30px"}}>
                <button className={styles.buttonSubmit}  onClick={VerifyInputs}>Calcular</button>
                <Link className={styles.link} to={'/'}>Voltar</Link>
            </div>
      </div>
    </>
  );
}
