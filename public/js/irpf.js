var bruto = document.getElementById("salariobruto")
var previdencia = document.getElementById("previdencia")
var funpresp = document.getElementById("funpresp")
var auxiliosaude = document.getElementById("saude")
var auxilioalimento = document.getElementById("alimentacao")



function imposto(salario) {
    // Tabela IRRF (2025)
    const faixasIRRF = [
        { limite: 2112.00, aliquota: 0.0, deducao: 0.0 },       // Isento
        { limite: 2826.65, aliquota: 0.075, deducao: 158.40 },  // 7,5%
        { limite: 3751.05, aliquota: 0.15, deducao: 370.40 },   // 15%
        { limite: 4664.68, aliquota: 0.225, deducao: 651.73 },  // 22,5%
        { limite: Infinity, aliquota: 0.275, deducao: 884.96 }, // 27,5%
    ];

    // Cálculo do IRRF
    let impostoIRRF = 0;
    for (let faixa of faixasIRRF) {
        if (salario <= faixa.limite) {
            impostoIRRF = (salario * faixa.aliquota) - faixa.deducao;
            break;
        }
    }

    // Garante que o imposto não seja negativo
    return Math.max(impostoIRRF, 0).toFixed(2);
}

function calcular(){
    var base = parseFloat(bruto.value) - (parseFloat(previdencia.value) + parseFloat(funpresp.value))
    var iprf = imposto(base)
    var totalPrev = parseFloat(previdencia.value) + parseFloat(funpresp.value)
    var liquido = base - iprf

    document.getElementById("liquido").innerHTML = liquido.toString()
    document.getElementById("iprf").innerHTML = iprf.toString()
}


