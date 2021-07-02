import React, { Component } from 'react'
import api from '../api'


class PostForm extends Component{  
    state ={
        salario_bruto: 2000,
        Descontos: 0,
        Dependentes: 0
    }
    

    handle = e => {
        this.setState({[e.target.salario_bruto]: e.target.value })
        
    }

    handle1 = e =>{
        this.setState({[e.target.Descontos]: e.target.value})
    }
    handle2 = e => {
        this.setState({[e.target.Dependentes]: e.target.value})
    }

    submit = e =>{
        e.preventDefault();

        api.post('/salario',this.state).then(response =>{
            console.log(response)
        })
        console.log(this.state)
    }
    render() {
        const {salario_bruto, Descontos, Dependentes} = this.state
     return(
        <div>
            <form onSubmit={this.submit}>
                <input
                onChange={this.handle} 
                value={salario_bruto} 
                name="salario_bruto"
                type="number"/>

                <input 
                onChange={this.handle1} 
                value={Descontos} 
                name="Descontos" 
                type="number"/>

                <input 
                onChange={this.handle2} 
                value={Dependentes} 
                name="Dependentes" 
                type="number"/>

                <button type="submit">Calcular</button>
            </form>
        </div>
    )   
}    
}

export default PostForm