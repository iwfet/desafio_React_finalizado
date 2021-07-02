from flask import *
from API import app, db
from .models import INSS, IRFF
import json

@app.route('/',methods=['GET'])
def home():
    return {"dado":"ola mundo"}

@app.route('/salario', methods=['POST'])
def salario():
    if(request.method =='POST'):
        
        Salario_bruto = request.json["salario_bruto"]
        Descontos =  request.json["Descontos"]
        Dependentes = request.json["Dependentes"]
        
        #body = request.get_json()
        #Salario_bruto = body["salario_bruto"]       
        #Descontos = body["Descontos"] 
        #Dependentes = body["Dependentes"] 
        
        #Salario_bruto = float(request.form.get('salario_bruto'))
        #Descontos = float(request.form.get('Descontos'))
        #Dependentes = int(request.form.get('Dependentes'))
        
        inss = INSS.query.filter(INSS.faixa_inicial <= Salario_bruto) or (INSS.faixa_final >= Salario_bruto)   
        for ins in inss:
            aliquota = (ins.aliquota/100)
            deducao = ins.deduçao
          
        reajuste_inss = (Salario_bruto*aliquota)-float(deducao)  
        
        if (Salario_bruto >= 1903.98):  
            salariobase = Salario_bruto - (Descontos + (189.59 * Dependentes ))
            print(salariobase)
            irrf = IRFF.query.filter(IRFF.faixa_inicial <= float(salariobase)) or (IRFF.faixa_final >= float(salariobase))
            for inf in irrf:
                aliquotairrf = (inf.aliquota/100)
                deducaoirrf = inf.deduçao            
            reajuste_irrf = (salariobase*aliquotairrf) - float(deducaoirrf)
        else:
            reajuste_irrf = 0   
                 
        valor_final = reajuste_inss + reajuste_irrf
        print(valor_final)
    
    return {"valor final": valor_final, "reajuste_inss":reajuste_inss, "reajuste_irrf": reajuste_irrf}
    #return render_template('admin/index.html', valor=reajuste_inss , valorirrf=reajuste_irrf, valor_fina=valor_final)
    