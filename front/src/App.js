import React, { Component } from 'react'
import api from './api'

class App extends Component{
state = {
  filmes:[],
}

async componentDidMount(){
  const reponse = await api.post('/salario',{
    salario_bruto:3000,
    Descontos:0,
    Dependentes:0

  });
  console.log(reponse.data)
  

  
}

  render(){
    
    return(
      <div>
        <h1>ola mundo</h1>        
      </div>

    );
  }
}

export default App;
