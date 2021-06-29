from flask import *
from API import app, db
from .models import INSS, IRFF
from sqlalchemy import between



@app.route('/')
def home():
    return render_template('admin/index.html')

@app.route('/salario', methods=['GET','POST'])
def salario():
    if(request.method =='POST'):
        Salario_bruto = float(request.form.get('salario_bruto'))
        Descontos = float(request.form.get('Descontos'))
        Dependentes = int(request.form.get('Dependentes'))
        
        inss = INSS.query.filter(INSS.faixa_inicial <= Salario_bruto) or (INSS.faixa_final >= Salario_bruto)   
        for ins in inss:
            aliquota = ins.aliquota
            deducao = ins.deduçao       
        reajuste_inss = (Salario_bruto/(100*aliquota))-float(deducao)  
        
        if (Salario_bruto >= 1903.98):  
            salariobase = Salario_bruto - (Descontos + (Dependentes * 189.59))
            irrf = IRFF.query.filter(IRFF.faixa_inicial <= float(salariobase)) or (IRFF.faixa_final >= float(salariobase))
            for inf in irrf:
                aliquotairrf = inf.aliquota
                deducaoirrf = inf.deduçao 
            
            reajuste_irrf = (salariobase/(aliquotairrf*100))- float(deducaoirrf)
        else:
            reajuste_irrf = 0
        
        valor_final = reajuste_inss + reajuste_irrf
    
    
    
    return render_template('admin/index.html', valor=reajuste_inss , valorirrf=reajuste_irrf, valor_fina=valor_final)
    