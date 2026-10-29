// Exercício 04: em quantos meses o cliente junta o valor da meta.
// A cada mês o saldo rende e depois entra o depósito.
// Em dezembro (mês 12, 24, 36...) entra um depósito extra, do 13º salário.
const LIMITE_MESES = 600; // 50 anos
const formatarReal = (valor) => {
    return `R$ ${valor.toFixed(2)}`;
};
const formatarMeses = (meses) => {
    const anos = Math.floor(meses / 12);
    const resto = meses % 12;
    const textoAnos = `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
    const textoMeses = `${resto} ${resto === 1 ? 'mês' : 'meses'}`;
    if (anos === 0) {
        return textoMeses;
    }
    if (resto === 0) {
        return textoAnos;
    }
    return `${textoAnos} e ${textoMeses}`;
};
// A taxa tem valor padrão de 0,5% ao mês.
function calcularMeses(meta, deposito, taxa = 0.5) {
    let saldo = 0;
    let depositado = 0;
    let meses = 0;
    while (saldo < meta) {
        if (meses >= LIMITE_MESES) {
            break; // meta inalcançável
        }
        meses++;
        saldo = saldo * (1 + taxa / 100) + deposito;
        depositado += deposito;
        if (meses % 12 === 0) {
            saldo += deposito; // 13º salário
            depositado += deposito;
        }
    }
    return { meses, saldo, depositado };
}
function exibirValor(rotulo, valor, formatar) {
    return `${rotulo}: ${formatar(valor)}`;
}
const campoMeta = document.getElementById('meta');
const campoDeposito = document.getElementById('deposito');
const campoTaxa = document.getElementById('taxa');
const botao = document.getElementById('calcular');
const saida = document.getElementById('resultado');
botao.addEventListener('click', () => {
    const meta = Number(campoMeta.value);
    const deposito = Number(campoDeposito.value);
    const textoTaxa = campoTaxa.value.trim();
    if (meta <= 0 || deposito <= 0) {
        saida.textContent = 'Informe valores positivos';
        saida.className = 'erro';
        return;
    }
    // Campo de rendimento vazio: a função é chamada sem o terceiro argumento.
    const simulacao = textoTaxa === ''
        ? calcularMeses(meta, deposito)
        : calcularMeses(meta, deposito, Number(textoTaxa));
    const rendimento = simulacao.saldo - simulacao.depositado;
    const atingiu = simulacao.saldo >= meta;
    if (!atingiu) {
        saida.textContent =
            `Meta inalcançável em 50 anos.\n` +
                exibirValor(`Saldo após ${simulacao.meses} meses`, simulacao.saldo, formatarReal);
        saida.className = 'erro';
        return;
    }
    saida.textContent =
        `Você atinge a meta em ${simulacao.meses} meses (${formatarMeses(simulacao.meses)}).\n` +
            exibirValor('Saldo final', simulacao.saldo, formatarReal) + '\n' +
            exibirValor('Total depositado', simulacao.depositado, formatarReal) + '\n' +
            exibirValor('Rendimento', rendimento, formatarReal);
    saida.className = 'sucesso';
});
export {};
//# sourceMappingURL=ex04.js.map