const DESCONTO =  564.80
const TETO = 8157.41
const SALARIO_MINIMO = 1518

function iprf(salario){
    if(salario <= 2259.20){
        return 0
    }else if(salario <= 2826.65){
        return salario * 0.075 - 169.44
    }else if(salario <= 3751.05){
        return salario * 0.15 - 381.44
    }else if(salario <= 4664.68){
        return salario * 0.225 - 662.77
    }else{
        return salario * 0.275 - 896
    }
}

function imposto_renda(salario, deducoes){
    if(deducoes >= DESCONTO){
        return iprf(salario - deducoes)
    }else{
        return iprf(salario - DESCONTO)
    }
}

function calcular_previdencia(salario){
    if(salario <= SALARIO_MINIMO){
        return salario * 0.075
    }else if(salario <= 2793.88){
        return (salario * 0.09) - 22.77
    }else if(salario <= 4190.83){
        return (salario * 0.12) - 106.59
    }else if(salario <= TETO){
        return (salario * 0.14) - 190.4
    }else{
        return (TETO * 0.14) - 190.4
    }
}



function rodar(){
    let participa = document.getElementById('participa')
    let salario_bruto = Number(document.getElementById('salariobruto').value)
    let saude = Number(document.getElementById('saude').value)
    let alimentacao = Number(document.getElementById('alimentacao').value)
    let outros = Number(document.getElementById('outros').value)


    let previdencia = calcular_previdencia(salario_bruto)
    console.log('Previdencia: '+ previdencia)
    let funpresp = 0

    if(participa.checked){
        if((salario_bruto > TETO)){
            funpresp = (salario_bruto - TETO) * 0.085
        }
    }

    let deducoes = previdencia + funpresp
    console.log('Deduções: '+deducoes)
    let iprf = imposto_renda(salario_bruto + outros, deducoes)
    let total_desconto = iprf + deducoes
    let liquido = (salario_bruto + outros) - total_desconto
    let auxilios = alimentacao + saude
    let liquido_final = liquido + auxilios

    document.getElementById('resumo_bruto').innerText = 'R$ '+(salario_bruto + outros).toFixed(2)
    document.getElementById('resumo_extra').innerText = 'R$ '+auxilios.toFixed(2)
    document.getElementById('total_bruto').innerText = 'R$ '+(salario_bruto + outros + auxilios).toFixed(2)

    document.getElementById('iprf').innerText = 'R$ '+iprf.toFixed(2)
    document.getElementById('prev').innerText = 'R$ '+previdencia.toFixed(2)
    document.getElementById('funp').innerText = 'R$ '+funpresp.toFixed(2)
    document.getElementById('tdesconto').innerText = 'R$ '+total_desconto.toFixed(2)

    document.getElementById('auxilios').innerText = 'R$ '+auxilios.toFixed(2)
    document.getElementById('liquido').innerText = 'R$ '+liquido.toFixed(2)
    document.getElementById('lfinal').innerText = 'R$ '+liquido_final.toFixed(2)



}



