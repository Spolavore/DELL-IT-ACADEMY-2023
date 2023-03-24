import styles from "./styles.module.css";
import { useState } from "react";
export default function App() {

  //Lista de cidades aceitas
  //Elas servem para verificar se a cidade
  //escrita pelo usuário está entre algumas dessas

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

  // variavel que possui a distancia das cidades no formato json, pois é mais fácil de trabalha
  // com ele utilizando o react
  let distanceData = require('./distanciaCidades.json');
  

  // UseStates responsável por salvar o dado digitado nos inputs e
  // no selection, então como cada um desses inputs tem a opção
  // onChange ativada, cada vez que alguma coisa for escrita (ou alguma
  // opção no caso do selection for mudada), a variáveis a esquerda irão
  //mudar

  let [cidadePartida, setCidadePartida] = useState('');
  let [cidadeDestino, setCidadeDestiono] = useState('');
  let [modalidade, setModalidade] = useState('');

  //Função responsável por verificar se as cidades escritas pelo usuário estão entre aquelas permitidas 
  //e se a modalidade foi passada
  function VerifyData(){
   
    // Variaveis que irão conter o valor boolean da operação include - a qual vai checar se a cidade passada
    // (transformada tudo em maiusculo, pois no Array todos os elementos estao em maiusculo) está presente
    // na lista
    let verificaPartida = cidadesPossiveis.includes(cidadePartida.toUpperCase());
    let verificaDestino =  cidadesPossiveis.includes(cidadeDestino.toUpperCase());

    // Se tiver calcula as informação de output
    if( verificaPartida && verificaDestino && modalidade != ''){
        Calculate()

    // Se não avisa para o usuário qual das cidades informadas possui erro ou se nenhuma modalidade foi selecionada
    } else {
        if(!verificaPartida){
            alert(`A cidade ${cidadePartida} não existe ou não condiz com a norma, tente novamente`);
        } else if(!verificaDestino){
            alert(`A cidade ${cidadeDestino} não existe ou não condiz com a norma , tente novamente`);
        } else {
            alert('Selecione uma modalidade');
        }
    }
  }

  function Calculate(){
    

    distanceData.map((data) => {
        if(data[`${cidadePartida.toUpperCase()}`] === 0) {
            console.log(data);
        }
    })
  }

  // A parte abaixo é a construção da interface para visualizar melhor o que está acontecendo tal como realizar testes
  // é um html simples que contem uma div principal que irá possuir um título, 3 inputs, sendo que o último deles é do 
  // tipo selection - onde o usuário é obrigado a escolher umas das 3 opções e um botão que vai verificar os dados 
  // passados ao ser clicado
  // IMPORTANTE: Cada vez que um dos inputs receber uma alteração do usuário ele irá ser atualizado nas variáveis 
  // dos useStates inicializados acima
  return (
    <div className={styles.app}>
      <h1>DELL ACADEMY 2023</h1>
      <div className={styles.info}>
        <label for="cidade_ini">Indique o cidade de partida</label>
        <input name="cidade_ini" required onChange={(e) => setCidadePartida(e.target.value)}/>

        <label for="cidade_des">Indique o cidade de destino</label>
        <input name="cidade_des" required onChange={(e) => setCidadeDestiono(e.target.value)}/>

        <label for="modalidade">Selecione a Modalidade</label>
        <select name="modalidade" required onChange={(e) => setModalidade(e.target.value)}>
            <option value={""}></option>
            <option value={"pequeno"}>Porte Pequeno</option>
            <option value={"medio"}>Porte Médio</option>
            <option value={"grande"}>Porte Grande</option>
        </select>

        <button className={styles.buttonSubmit} onClick={VerifyData}>Calcular</button>
      </div>
    </div>
  );
}
