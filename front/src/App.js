import React, { Component } from 'react'
import api from './api'
import "./App.css"



class App extends Component{
  state = {}
  
  
async componentDidMount(){
  const reponse = await api.post('/salario',{
    salario_bruto:5000,
    Descontos:0,
    Dependentes:0

  });
  console.log(reponse)
}

  render(){
    
    return(
      <div>
        <div className="div1">
          <form className="form">
            <input type="number" step=".01" name="salarioBruto" id="salarioBruto" className="form-item" placeholder="Salario"></input>
            <input type="number" step=".01" name="desconto"id="desconto"  className="form-item" placeholder="Desconto"></input>
            <input type="number"  name="dependentes"id="dependentes"  className="form-item" placeholder="Dependente"></input>
            <button type="submit" className="form-button">Calcular</button>
          </form>
        </div>
        <div className="result">
                   
        </div>        
      </div>
    );
  }
}

export default App;
