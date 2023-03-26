// Função responsável por botar na tela as interface visual da funcionalidade 2 da aplicação.

import styles from "./infoBox.module.css";
export default function InfoBox({
  cidade_inicial,
  cidade_parada,
  cidade_dest,
  distanciaTotal,
  listaProdutos,
  quantidadeDeProdutos,
  caminhoesPequenos,
  caminhoesMedios,
  caminhoesGrandes,
  custoTotal,
  custoIniParada,
  custoParadaDestino,
}) {
  let boolean = cidade_parada !== "";
  let somaDosProdutos = 0;
  let precoUnitario;

  let produtosEscolhidos = [
    "Celular",
    "Geladeira",
    "Freezer",
    "Cadeira",
    "Luminária",
    "Lavadora de Roupas",
  ];

  let index = 0;
  for (index in quantidadeDeProdutos){
    somaDosProdutos += parseFloat(quantidadeDeProdutos[index]);
  }

  precoUnitario =  (custoTotal / somaDosProdutos).toFixed(2);

  console.log(precoUnitario);
  while (quantidadeDeProdutos.includes("0")) {
    let itemNulo = produtosEscolhidos[quantidadeDeProdutos.indexOf("0")];
    produtosEscolhidos.splice(produtosEscolhidos.indexOf(itemNulo), 1);
    quantidadeDeProdutos.splice(quantidadeDeProdutos.indexOf("0"), 1);
  }

  let portesCaminhao = [];

  if (caminhoesPequenos !== 0) {
    portesCaminhao.push(`${caminhoesPequenos} caminhão(ões) de porte PEQUENO`);
  } else if (caminhoesMedios !== 0) {
    portesCaminhao.push(`${caminhoesMedios} caminhão(ões) de porte MÉDIO`);
  } else if (caminhoesGrandes !== 0) {
    portesCaminhao.push(`${caminhoesGrandes} caminhão(ões) de porte GRANDE`);
  }

  return (
    <>
      <div className={styles.container}>
        <p>
          De {cidade_inicial} para {cidade_dest}{" "}
          {boolean ? `passando por ${cidade_parada}` : null}, a distancia a ser
          percorrida é de {distanciaTotal} km, para o transporte dos produtos{" "}
          {produtosEscolhidos.map((p) => {
            return ` ${p},`;
          })}{" "}
          será necessário utilizar{" "}
          {portesCaminhao.map((s) => {
            return ` ${s}`;
          })}{" "}
          de forma a resultar no menor custo de transporte por km. O valor total
          do transporte dos itens é de R$ {custoTotal}, sendo que de{" "}
          {cidade_inicial} para{" "}
          {boolean
            ? `${cidade_parada} é de R$ ${custoIniParada} e de ${cidade_parada} para ${cidade_dest} é de R$ ${custoParadaDestino}`
            : `${cidade_dest} é de ${custoTotal}`}, onde o custo unitário médio é de {precoUnitario}
        </p>
      </div>
    </>
  );
}
