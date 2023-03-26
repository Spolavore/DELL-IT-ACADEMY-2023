import styles from "./itens.module.css";
import { Link } from "react-router-dom";

import { useState } from "react";
export default function Itens() {
  const dados = require('../distanciaCidades.json');
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

  // Variaveis e useStates referentes aos pesos dos itens
  let [celularPeso, setCelularPeso] = useState("");
  let [geladeiraPeso, setGeladeiraPeso] = useState("");
  let [freezerPeso, setFreezerPeso] = useState("");
  let [cadeiraPeso, setCadeiraPeso] = useState("");
  let [luminariaPeso, setLuminariaPeso] = useState("");
  let [lavadoraPeso, setLavadoraPeso] = useState("");

  // Variaveis e useStates referentes as cidades do percurso total
  let [cidade_inicial, setCidadeInicial] = useState("");
  let [cidade_parada, setCidadeParada] = useState("");
  let [cidade_dest, setCidadeDest] = useState("");
  let pesoTotal = 0;

  // Variaveis referente as distancias entre as cidades
  let distanciaIniP;    // distancia do inicio ate a parda
  let distanciaPDest;   // distancia da parada ate o destino
  let distanciaTotal;   // distancia total percorrida

  // Variavel que contem qual o melhor porte para levar as cargas
  let caminhao;
  // Variavel referente ao custo total da viagem
  let custoTotal = 0; 
  // Precos de cada caminhano porte pequeno posicao 0 porte medio posicao 1 etc
  let precos = [4.87, 11.92, 27,44];

  // Variaveis referentes ao preco de cada trecho e o custo total
  let precoIniParada
  let precoParadaDest
  let precoTotal


  function VerifyInputs() {
    // variavel que contem o valor de todos dos itens passados por input
    const quantidadeItens = [
      celular,
      geladeira,
      freezer,
      cadeira,
      luminaria,
      lavadora,
    ];
    // variavel que contem o peso de todos dos itens passados por input
    const pesoItens = [
      celularPeso,
      geladeiraPeso,
      freezerPeso,
      cadeiraPeso,
      luminariaPeso,
      lavadoraPeso
    ]

    // variavel que guarda o resultado da funcao CheckNegativesInputs
    let campoNegativo = CheckNegativesInputs(quantidadeItens);
    let campoNegativoPeso = CheckNegativesInputs(pesoItens);

    // verifica se não há nenhum campo nulo
    if (quantidadeItens.includes("")) {
      alert(`Campo dos itens de número ${quantidadeItens.indexOf("") + 1} é inválido!`);
      alert("Preencha todos os campos antes de enviar as informações");
    } else if (pesoItens.includes("")){
      alert(`Campo dos pesos de número ${pesoItens.indexOf("") + 1} é inválido!`);
      alert("Preencha todos os campos antes de enviar as informações");
    }
    // verifica se foi passado algum valor negativo, se campoNegativo >= 0 significa q a função retornou
    // alguma posição da lista de itens, logo foi achado um valor negativo
    // temos que somar + 1 pois o array começa na posição 0, então o 0 representa o 1 item o 1 o segundo item e etc
    else if (campoNegativo >= 0) {
      alert(
        `Campo negativos não serão aceitos, revise o campo dos itens de número ${campoNegativo + 1}`
      );
    } else if (campoNegativoPeso >= 0) {
      alert(
        `Campo negativos não serão aceitos, revise o campo dos pesos de número ${campoNegativoPeso + 1}`
      );
    }
    // Parte da verificação das cidades passadas, se elas estão contidas
    // nas cidades permitidas, permitiremos que o usuario não coloque cidade de parada
    else if (!cidadesPossiveis.includes(cidade_inicial.toUpperCase())) {
      alert("Cidade de partida não existe ou não condiz com a norma");
    } 
    else if(!cidadesPossiveis.includes(cidade_parada.toUpperCase()) && cidade_parada != ""){
      alert("Cidade de parada não existe ou não condiz com a norma");
    }
    else if (!cidadesPossiveis.includes(cidade_dest.toUpperCase())) {
      alert("Cidade de destino não existe ou não condiz com a norma");
    } else if(cidade_parada == cidade_dest || cidade_parada == cidade_inicial){
      alert("Não pode repetir cidades em campos diferentes");
    }
    else {
      MaxWeight(pesoItens);
      Calculate();
    }
  }

  function Calculate() {
    CalculateDistance();
    DeterminateBestOption();
  }


  // Função resposável por calcular as distancias entre as cidades e setar essas
  // distancias nas variaveis declaradas acima.
  function CalculateDistance(){

    // caso onde há cidade_de_parada
    if(cidade_parada != ""){
      dados.map((info) => {
        // pega a distancia da cidade de partida ate a cidade de parada
        if(info[`${cidade_inicial.toUpperCase()}`] === 0){
           distanciaIniP = info[`${cidade_parada.toUpperCase()}`];
        }
        // pega a distancia da cidade de parada ate a cidade de destino 
        if(info[`${cidade_parada.toUpperCase()}`] === 0){
          distanciaPDest = info[`${cidade_dest.toUpperCase()}`];
        }
      })

      // soma as duas
      distanciaTotal = distanciaIniP + distanciaPDest;
    }

    // caso onde não há cidade_de_parada
    if(cidade_parada == "") {
      dados.map((info) => {
        // pega a distancia da cidade de partida ate a cidade de destino (essa eh a distancia total)
        if(info[`${cidade_inicial.toUpperCase()}`] === 0){
           distanciaTotal = info[`${cidade_dest.toUpperCase()}`];
        }
    })
  }
}
  // Função responsável por determinar a melhor opção de porte de caminhão
  // tal como quantos caminhoes serão necessários
  function DeterminateBestOption(){
 
  }

  // Função que recebe uma lista com todos os peso dos itens selecionados
  // e seta o pesoTotal (soma de todos os pesos) na variavel acima declarada
  function MaxWeight(weightList){
    let i;
    pesoTotal = 0 ;
     for ( i in weightList){
      pesoTotal += parseFloat(weightList[i])
    }    

  }
  // Função responável por verificar se há algum valor negativo passado
  // nos inputs, valores negativos não são tolerados.
  // retorna a posição do elemento no array se for achado algum valor negativo
  // se houver numero repetido retorna -1
  function CheckNegativesInputs(itensList) {
    let aux = -1;
    itensList.map((e) => {
      if (e < 0) {
        aux = itensList.indexOf(e);
      }
    });
    return aux;
  }


  // Código da Interface em html e obtenção de dados
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
            <input
              name="celular"
              id="celular"
              type={`number`}
              className={styles.inputField}
              placeholder="Quantidade"
              onChange={(e) => setCelular(e.target.value)}
            />
            <input
              name="geladeira"
              id="geladeira"
              type={`number`}
              className={styles.inputField}
              placeholder="Quantidade"
              onChange={(e) => setGeladeira(e.target.value)}
            />
            <input
              name="freezer"
              id="freezer"
              type={`number`}
              className={styles.inputField}
              placeholder="Quantidade"
              onChange={(e) => setFreezer(e.target.value)}
            />
            <input
              name="cadeira"
              id="cadeira"
              type={`number`}
              className={styles.inputField}
              placeholder="Quantidade"
              onChange={(e) => setCadeira(e.target.value)}
            />
            <input
              name="luminaria"
              id="celular"
              type={`number`}
              className={styles.inputField}
              placeholder="Quantidade"
              onChange={(e) => setLuminaria(e.target.value)}
            />
            <input
              name="lavadora"
              id="lavadora"
              type={`number`}
              className={styles.inputField}
              placeholder="Quantidade"
              onChange={(e) => setLavadora(e.target.value)}
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "50px" }}
          >
            <input
              name="celular_peso"
              type={`number`}
              id="celular_peso"
              className={styles.inputField}
              placeholder="Peso (kg)"
              onChange={(e) => setCelularPeso(e.target.value)}
            ></input>
            <input
              className={styles.inputField}
              placeholder="Peso (kg)"
              name="geladeira_peso"
              id="geladeira_peso"
              onChange={(e) => setGeladeiraPeso(e.target.value)}
            ></input>
            <input
              name="freezer_peso"
              id="freezer_peso"
              className={styles.inputField}
              placeholder="Peso (kg)"
              onChange={(e) => setFreezerPeso(e.target.value)}
            ></input>
            <input
              name="cadeira_peso"
              id="cadeira_peso"
              className={styles.inputField}
              placeholder="Peso (kg)"
              onChange={(e) => setCadeiraPeso(e.target.value)}
            ></input>
            <input
              name="luminaria_peso"
              id="luminaria_peso"
              className={styles.inputField}
              placeholder="Peso (kg)"
              onChange={(e) => setLuminariaPeso(e.target.value)}
            ></input>
            <input
              name="lavadora_peso"
              id="lavadora_peso"
              className={styles.inputField}
              placeholder="Peso (kg)"
              onChange={(e) => setLavadoraPeso(e.target.value)}
            ></input>
          </div>
        </div>

        <h2>Informe as cidades do percurso</h2>
        <label for="cidade_ini">Indique a cidade de partida</label>
        <input
          name="cidade_ini"
          id="cidade_ini"
          type={"text"}
          className={styles.inputAlt}
          onChange={(e) => setCidadeInicial(e.target.value)}
        />
        <label for="cidade_p">Indique a cidade de parada</label>
        <input
          name="cidade_p"
          id="cidade_p"
          type={"text"}
          className={styles.inputAlt}
          onChange={(e) => setCidadeParada(e.target.value)}
        />
        <label for="cidade_des">Indique a cidade de destino </label>
        <input
          name="cidade_des"
          id="cidade_des"
          type={"text"}
          className={styles.inputAlt}
          onChange={(e) => setCidadeDest(e.target.value)}
        />

        <div style={{ display: "flex", gap: "30px" }}>
          <button className={styles.buttonSubmit} onClick={VerifyInputs}>
            Calcular
          </button>
          <Link className={styles.link} to={"/"}>
            Voltar
          </Link>
        </div>
      </div>
    </>
  );
}
