// Exercício 05: caixa do mercado (integrador).
// Lê um preço por linha, aplica o cupom e o desconto do clube de fidelidade.
const MAX_ITENS = 20;
const formatarReal = (valor) => {
    return `R$ ${valor.toFixed(2)}`;
};
// Linhas vazias são ignoradas em silêncio; linhas inválidas são contadas.
function lerPrecos(texto) {
    const linhas = texto.split('\n');
    const precos = [];
    let ignorados = 0;
    for (let i = 0; i < linhas.length; i++) {
        if (precos.length >= MAX_ITENS) {
            break; // no máximo 20 itens por compra
        }
        const linha = linhas[i].trim();
        if (linha === '') {
            continue; // linha vazia
        }
        const preco = Number(linha.replace(',', '.'));
        if (Number.isNaN(preco) || preco <= 0) {
            ignorados++;
            continue; // linha inválida
        }
        precos.push(preco);
    }
    return { precos, ignorados };
}
// Parâmetro rest: recebe os preços um a um e devolve a soma.
function somarItens(...precos) {
    let total = 0;
    for (const preco of precos) {
        total += preco;
    }
    return total;
}
function calcularDesconto(total, descontoOuCupom) {
    if (typeof descontoOuCupom === 'number') {
        return total * descontoOuCupom / 100;
    }
    switch (descontoOuCupom.toUpperCase()) {
        case 'BEMVINDO':
            return total * 10 / 100;
        case 'PROMO20':
            return total * 20 / 100;
        case 'MENOS15':
            return total >= 100 ? 15 : 0;
        default:
            return 0;
    }
}
const campoItens = document.getElementById('itens');
const campoCupom = document.getElementById('cupom');
const campoFidelidade = document.getElementById('fidelidade');
const botao = document.getElementById('fechar');
const saida = document.getElementById('resultado');
botao.addEventListener('click', () => {
    const leitura = lerPrecos(campoItens.value);
    const precos = leitura.precos;
    if (precos.length === 0) {
        saida.textContent = 'Nenhum item válido';
        saida.className = 'erro';
        return;
    }
    const subtotal = somarItens(...precos);
    const cupom = campoCupom.value.trim();
    let descontoCupom = 0;
    let cupomAplicado = false;
    if (cupom !== '') {
        descontoCupom = calcularDesconto(subtotal, cupom);
        cupomAplicado = descontoCupom > 0;
    }
    const aposCupom = subtotal - descontoCupom;
    const descontoFidelidade = campoFidelidade.checked
        ? calcularDesconto(aposCupom, 5)
        : 0;
    const total = aposCupom - descontoFidelidade;
    const ignorados = leitura.ignorados;
    const textoIgnorados = ignorados > 0
        ? ` (${ignorados} ${ignorados === 1 ? 'linha ignorada' : 'linhas ignoradas'})`
        : '';
    let texto = `Itens: ${precos.length}${textoIgnorados}\n`;
    texto += `Subtotal: ${formatarReal(subtotal)}\n`;
    if (cupom !== '') {
        texto += cupomAplicado
            ? `Cupom ${cupom.toUpperCase()}: - ${formatarReal(descontoCupom)}\n`
            : 'Cupom inválido ou não aplicável.\n';
    }
    if (campoFidelidade.checked) {
        texto += `Fidelidade (5%): - ${formatarReal(descontoFidelidade)}\n`;
    }
    texto += `Total a pagar: ${formatarReal(total)}`;
    saida.textContent = texto;
    saida.className = 'sucesso';
});
export {};
//# sourceMappingURL=ex05.js.map