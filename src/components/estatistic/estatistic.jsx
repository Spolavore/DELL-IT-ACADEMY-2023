import { useEffect } from 'react'
import styles from './style.module.css'

export default function Estatistic({lista}) {
   
    return(
        <>  
           
            {lista.map((transporteData, index) => {
                return(
                    <>
                        <h1>Transporte {index + 1}:</h1>
                        <p>{transporteData}</p>
                    </>
                )
            })}
        </>
    )
}