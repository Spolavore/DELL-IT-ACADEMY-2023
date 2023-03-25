import styles from "./itens.module.css";
import { Link } from "react-router-dom";
export default function Itens() {
  return (
    <>
      <div className={styles.container}>
        <h2>Escreva a quantidade de itens a ser transportados</h2>
        <span>*Caso não desejar transportar o item deixe o campo em branco </span>

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
            <input name="celular" id="celular" type={`number`} className={styles.inputField}/>
            <input name="geladeira" id="geladeira" type={`number`} className={styles.inputField}/>
            <input name="freezer" id="freezer" type={`number`} className={styles.inputField}/>
            <input name="cadeira" id="cadeira" type={`number`} className={styles.inputField}/>
            <input name="luminaria" id="celular" type={`number`} className={styles.inputField}/>
            <input name="lavadora" id="lavadora" type={`number`} className={styles.inputField}/>
          </div>
        </div>

        <h2>Informe as cidades do percurso</h2>
            <label for="cidade_ini">Indique a cidade de partida</label>
            <input name="cidade_ini" id="cidade_ini" type={'text'} className={styles.inputAlt}/>
            <label for="cidade_p">Indique a cidade de parada</label>
            <input name="cidade_p" id="cidade_p" type={'text'} className={styles.inputAlt}/>
            <label for="cidade_des">Indique a cidade de destino </label>
            <input name="cidade_des" id="cidade_des" type={'text'} className={styles.inputAlt}/>

            <div style={{display: "flex", gap: "30px"}}>
                <button className={styles.buttonSubmit}>Calcular</button>
                <Link className={styles.link} to={'/'}>Voltar</Link>
            </div>
      </div>
    </>
  );
}
