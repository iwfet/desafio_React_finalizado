import React, { useState } from 'react'
import api from '../api'

function PostForm(){
    
    const [data, setData] = useState({
        salario_bruto: undefined,
        Descontos:0,
        Dependentes:0
    })

    handle = valor =>{
        this.setData({
            salario_bruto: valor.target.value,
            Descontos: valor.target.value,
            Dependentes: valor.target.value
        })

    }

    Submit = valor =>{
        valor.preventDeFault();
        const valores ={
            salario_bruto: this.data.salario_bruto,
            Descontos: this.data.Descontos,
            Dependentes: this.data.Dependentes

        }
        api.post('/salario',{ valores }).then(res=>{
            console.log(res)
        })

    }
    
    return(
        <div>
            <form onSubmit={this.Submit}>
                <input onChange={this.handle} id="salario_bruto"placeholder="Salario Bruto" type="number"/>
                <input onChange={this.handle} id="Descontos" placeholder="Descontos"type="number"/>
                <input onChange={this.handle} id="Dependentes" placeholder="Dependentes"type="number"/>
                <button type="submit">Calcular</button>
            </form>
        </div>
    )
}
