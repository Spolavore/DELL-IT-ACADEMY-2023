// Componente resposável por botar na tela as informações de output respondidas pelo usuário,
// calculadas pela funcao Calculate e passadas como parametro para este componente. (somente da )
// funcionalidade 1.
import styles from "./alert.module.css";
export default function AlertBox({
  distancia,
  custoTotal,
  cidadePartida,
  cidadeDestino,
  modalidade,
}) {
  return (
    <span className={styles.alertBox}>
      <p>
        De {cidadePartida.toUpperCase()} para {cidadeDestino.toUpperCase()},
        utilizando um caminhão de {modalidade.toLowerCase()}, a distância é de {distancia}Km e o custo será de R$ {custoTotal.toFixed(2)}
      </p>
    </span>
  );
}
