import styles from "./itens.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import InfoBox from "../components/infoBox/InfoBox";
import Estatistic from "../components/estatistic/estatistic";

export default function Itens() {
  const dados = require("../distanciaCidades.json");
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

  // Variavel que vai conter o valor numero de todos os produtos
  // eh setada apos a verificacao
  let listaProdutos = [];

  // Lista que contem cada transporte  cadastrado até agora
  let transportesCadastrados = [];

  // Variaveis e useStates referentes as cidades do percurso total
  let [cidade_inicial, setCidadeInicial] = useState("");
  let [cidade_parada, setCidadeParada] = useState("");
  let [cidade_dest, setCidadeDest] = useState("");
  let pesoTotal = 0;

  // Variavel e useState referente ao outPut, quando tudo for calculado
  // ele ira ser setado
  let [outPut, setOutput] = useState(<></>);

  // Variaveis referente as distancias entre as cidades
  let distanciaIniP; // distancia do inicio ate a parda
  let distanciaPDest; // distancia da parada ate o destino
  let distanciaTotal; // distancia total percorrida

  // Variaveis que contem a quantidade necessaria de cada categoria
  // para o menor custo possível.
  let qntPortePequeno;
  let qntPorteMedio;
  let qntPorteGrande;

  // Variavel referente ao custo total da viagem
  let custoTotal = 0;
  let custoIniParada = 0;
  let custoParadaDestino = 0;

  // Precos de cada caminhano porte pequeno posicao 0 porte medio posicao 1 etc
  // -> caso queiramos mudar os precos futuramente basta mudar aqui, sem se preocupar
  // com todas as ocorrencias
  let precos = [4.87, 11.92, 27.44];

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

    // trecho de codigo que irá arredondar para baixo todas os itens que possuirem 
    // casas decimais, isso ocorre para que caso o usuário passe um item de valor
    // "quebrado" o programa considera apenas o menor número inteiro mais proximo
    quantidadeItens.map((e, index) => {
      quantidadeItens[index] = Math.floor(quantidadeItens[index]);
    });

    // seta a lista de produtos
    listaProdutos = quantidadeItens;

    // variavel que contem o peso de todos dos itens passados por input
    const pesoItens = [
      celularPeso,
      geladeiraPeso,
      freezerPeso,
      cadeiraPeso,
      luminariaPeso,
      lavadoraPeso,
    ];

    // variavel que guarda o resultado da funcao CheckNegativesInputs
    let campoNegativo = CheckNegativesInputs(quantidadeItens);
    let campoNegativoPeso = CheckNegativesInputs(pesoItens);

    // verifica se não há nenhum campo nulo
    if (quantidadeItens.includes("")) {
      alert(
        `Campo dos itens de número ${quantidadeItens.indexOf("") + 1
        } é inválido!`
      );
      alert("Preencha todos os campos antes de enviar as informações");
    } else if (pesoItens.includes("")) {
      alert(
        `Campo dos pesos de número ${pesoItens.indexOf("") + 1} é inválido!`
      );
      alert("Preencha todos os campos antes de enviar as informações");
    }
    // verifica se foi passado algum valor negativo, se campoNegativo >= 0 significa q a função retornou
    // alguma posição da lista de itens, logo foi achado um valor negativo
    // temos que somar + 1 pois o array começa na posição 0, então o 0 representa o 1 item o 1 o segundo item e etc
    else if (campoNegativo >= 0) {
      alert(
        `Campos negativos não serão aceitos, revise o campo dos itens de número ${campoNegativo + 1
        }`
      );
    } else if (campoNegativoPeso >= 0) {
      alert(
        `Campos negativos não serão aceitos, revise o campo dos pesos de número ${campoNegativoPeso + 1
        }`
      );
    }
    // Parte da verificação das cidades passadas, se elas estão contidas
    // nas cidades permitidas, permitiremos que o usuario não coloque cidade de parada
    else if (!cidadesPossiveis.includes(cidade_inicial.toUpperCase())) {
      alert("Cidade de partida não existe ou não condiz com a norma");
    } else if (
      !cidadesPossiveis.includes(cidade_parada.toUpperCase()) &&
      cidade_parada != ""
    ) {
      alert("Cidade de parada não existe ou não condiz com a norma");
    } else if (!cidadesPossiveis.includes(cidade_dest.toUpperCase())) {
      alert("Cidade de destino não existe ou não condiz com a norma");
    } else if (
      cidade_parada.toUpperCase() === cidade_dest.toUpperCase() ||
      cidade_parada.toUpperCase() === cidade_inicial.toUpperCase() ||
      cidade_inicial.toUpperCase() === cidade_dest.toUpperCase()
    ) {
      alert("Não pode repetir cidades em campos diferentes");
    } else {
      MaxWeight(pesoItens, quantidadeItens);
      Calculate();
    }
  }

  // Função responsável por fazer todos os calculos e após isso setar o output para
  // ser colocado na tela
  function Calculate() {
    CalculateDistance();
    DeterminateBestOption();
    CalculateTaxes();
    transportesCadastrados = GenerateEstatistic();
 
    setOutput(
      <InfoBox
        cidade_inicial={cidade_inicial.toUpperCase()}
        cidade_parada={cidade_parada.toUpperCase()}
        cidade_dest={cidade_dest.toUpperCase()}
        distanciaTotal={distanciaTotal}
        quantidadeDeProdutos={listaProdutos}
        caminhoesPequenos={qntPortePequeno}
        caminhoesMedios={qntPorteMedio}
        caminhoesGrandes={qntPorteGrande}
        custoTotal={custoTotal}
        custoIniParada={custoIniParada}
        custoParadaDestino={custoParadaDestino}
      />
    );


  }

  // Função resposável por calcular as distancias entre as cidades e setar essas
  // distancias nas variaveis declaradas acima.
  function CalculateDistance() {
    // caso onde há cidade_de_parada
    if (cidade_parada !== "") {
      dados.map((info) => {
        // pega a distancia da cidade de partida ate a cidade de parada
        if (info[`${cidade_inicial.toUpperCase()}`] === 0) {
          distanciaIniP = info[`${cidade_parada.toUpperCase()}`];
        }
        // pega a distancia da cidade de parada ate a cidade de destino
        if (info[`${cidade_parada.toUpperCase()}`] === 0) {
          distanciaPDest = info[`${cidade_dest.toUpperCase()}`];
        }
      });

      // soma as duas
      distanciaTotal = distanciaIniP + distanciaPDest;
    }

    // caso onde não há cidade_de_parada
    if (cidade_parada === "") {
      dados.map((info) => {
        // pega a distancia da cidade de partida ate a cidade de destino (essa eh a distancia total)
        if (info[`${cidade_inicial.toUpperCase()}`] === 0) {
          distanciaTotal = info[`${cidade_dest.toUpperCase()}`];
        }
      });
    }
  }
  // Função responsável por determinar a melhor opção de porte de caminhão
  // tal como quantos caminhoes serão necessários
  function DeterminateBestOption() {
    qntPortePequeno = 0;
    qntPorteMedio = 0;
    qntPorteGrande = 0;

    let pesoTotalAux;
    pesoTotalAux = pesoTotal;


    // Algoritmo que checa a melhor opção de categoria
    // e quantos irão ser necessários
    while (pesoTotalAux > 0) {
      if (pesoTotalAux / 10000 > 1) {

        pesoTotalAux -= 10000;
        qntPorteGrande += 1;
      } else if (pesoTotalAux / 4000 > 1) {


        pesoTotalAux -= 4000;
        qntPorteMedio += 1;
      } else {


        pesoTotalAux -= 1000;
        qntPortePequeno += 1;
      }
    }

  }

  // Função responsável por determinar o custo total, e o custo parcial entre trechos
  function CalculateTaxes() {
    let precosPorCaminhao =
      qntPortePequeno * precos[0] +
      qntPorteMedio * precos[1] +
      qntPorteGrande * precos[2];
    custoTotal = (precosPorCaminhao * distanciaTotal).toFixed(2);

    // Parte para calcular entre os trechos
    if (cidade_parada !== "") {
      custoIniParada = (precosPorCaminhao * distanciaIniP).toFixed(2);
      custoParadaDestino = (precosPorCaminhao * distanciaPDest).toFixed(2);
    }
  }

  // Função que recebe uma lista com todos os peso dos itens selecionados
  // e seta o pesoTotal (soma de todos os pesos) * qntDeCada1 na variavel acima declarada
  function MaxWeight(weightList, itensList) {
    let i;
    pesoTotal = 0;

    itensList.map((item, index) => {
      pesoTotal += parseFloat(item) * parseFloat(weightList[index]);
    });

    // utilizamos o math.ceil para arredondar para cima o peso quando houver
    // casas decimais, isso é necessário para garantir que todos os itens serão
    // carregados.
    pesoTotal = Math.ceil(pesoTotal);
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

  function GenerateEstatistic() {
    let quantidadeDeItens = 0;
    let res = [];
    // trecho do programa que calculo o total de itens
    listaProdutos.map((i) => {
      quantidadeDeItens += parseInt(i);
    })

    let custoModalidadePequena = qntPortePequeno * precos[0] * distanciaTotal;
    let custoModalidadeMedia = qntPorteMedio * precos[1] * distanciaTotal;
    let custoModalidadeGrande = qntPorteGrande * precos[2] * distanciaTotal;

    let boolean = cidade_parada !== "";
    let templateText = `O custo total da viagem foi de ${custoTotal} reais, o número total de veículos transportaos foi de ${qntPorteGrande + qntPorteMedio + qntPortePequeno}, o número total e itens trasportados
    é de ${quantidadeDeItens}, o custo médio por km é de ${(custoTotal / distanciaTotal).toFixed()}, o custo para
    veículos da modalidade pequena foi de ${custoModalidadePequena} reais, para a modalidade média ${custoModalidadeMedia}
    e o custo para a modalidade grande foi e ${custoModalidadeGrande}, 
    ${boolean ? `o preco da ${cidade_inicial} para a ${cidade_parada.toUpperCase()} foi de ${custoIniParada} e o custo de ${cidade_parada.toUpperCase()}
    para ${cidade_dest.toUpperCase()} foi de ${custoParadaDestino} ` : null}`

    res.push( templateText);
    return(<>
      <Estatistic lista = {res}></Estatistic>
    </>)
    return res;
 

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
        {outPut}

        
      </div>
    </>
  );
}
