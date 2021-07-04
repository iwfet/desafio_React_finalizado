import React from 'react'
import api from '../api'


function PostForm () {  
    const [data, setData] = React.useState({
    
    });
    
    async function submit (e){
        e.preventDefault();
        const {salario_bruto,Descontos,Dependentes} = e.target
        console.log(salario_bruto.value)
        const dados ={
            salario_bruto: salario_bruto.value,
            Descontos: Descontos.value,
            Dependentes: Dependentes.value
        }
        console.log("formulario",dados)

        try {
          const  res = await api.post('/salario',dados)
        console.log("apiRes",res)
        setData(res.data)  
        } catch(error){
            console.log(error)
        }   
    }   
        
     return(
        <div>
            <div>
               <form onSubmit={submit}>
                <input
                required                
                name="salario_bruto"
                type="number"
                step=".01"/>

                <input 
                required                
                name="Descontos" 
                type="number"
                step=".01"/>

                <input 
                required                
                name="Dependentes" 
                type="number"
                step=".01"/>

                <button type="submit">Calcular</button>
            </form> 
            </div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Salario Bruto</th>
                            <th>inss</th>
                            <th>irpf</th>
                            <th>Descontos</th>
                            <th>Total a receber </th>
                        </tr>
                    </tbody>                   
                </table>
                <table>
                    <tbody>
                        <tr>
                            <th>R$</th>
                            <th>R$</th>
                            <th>R$</th>
                            <th>R$</th>
                            <th>R$</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </div>
        

    )   
   
}

export default PostForm