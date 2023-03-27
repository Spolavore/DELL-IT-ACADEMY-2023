// Funcao responsável por colocar as estatisticas na tela
import styles from './style.module.css'
export default function Estatistic({content}) {
    console.log(content)
    return(
        <>  
            {content.map((transporteData, index) => {
                return(
                    <div key={index} className={styles.container}>
                        <h1>Cadastro: {index + 1}</h1>
                        <p>{transporteData}</p>
                    </div>
                )
            })}
        </>
    )
}