// Exercício 02: conta de luz com tarifa por tipo de cliente e bandeira tarifária.
// Cases agrupados: residencial e rural pagam o mesmo, comercial e industrial também.
function tarifaPorKwh(tipo) {
    switch (tipo) {
        case 'residencial':
        case 'rural':
            return 0.80;
        case 'comercial':
        case 'industrial':
            return 0.95;
    }
}
// A bandeira tem valor padrão: sem ela, o adicional é o da verde.
function adicionalBandeira(consumo, bandeira = 'verde') {
    switch (bandeira) {
        case 'verde':
            return consumo * 0;
        case 'amarela':
            return consumo * 0.02;
        case 'vermelha1':
            return consumo * 0.04;
        case 'vermelha2':
            return consumo * 0.08;
    }
}
function mensagemBandeira(bandeira) {
    switch (bandeira) {
        case 'verde':
            return 'Condições favoráveis de geração de energia.';
        case 'amarela':
            return 'Condições de geração menos favoráveis.';
        case 'vermelha1':
        case 'vermelha2':
            return 'Condições mais caras de geração. Economize!';
        default:
            return 'Bandeira desconhecida.';
    }
}
function nomeBandeira(bandeira) {
    switch (bandeira) {
        case 'verde':
            return 'verde';
        case 'amarela':
            return 'amarela';
        case 'vermelha1':
            return 'vermelha patamar 1';
        case 'vermelha2':
            return 'vermelha patamar 2';
    }
}
// Teste do parâmetro padrão.
console.log('adicionalBandeira(100) =', adicionalBandeira(100));
// Resultado: 0. Motivo: sem o segundo argumento, bandeira assume o padrão
// 'verde', cujo adicional é R$ 0,00 por kWh (100 * 0 = 0).
const campoConsumo = document.getElementById('consumo');
const campoTipo = document.getElementById('tipo');
const campoBandeira = document.getElementById('bandeira');
const botao = document.getElementById('calcular');
const saida = document.getElementById('resultado');
botao.addEventListener('click', () => {
    const consumo = Number(campoConsumo.value);
    if (consumo <= 0) {
        saida.textContent = 'Informe um consumo válido';
        saida.className = 'erro';
        return;
    }
    const tipo = campoTipo.value;
    const bandeira = campoBandeira.value;
    const energia = consumo * tarifaPorKwh(tipo);
    const adicional = adicionalBandeira(consumo, bandeira);
    const total = energia + adicional;
    saida.textContent =
        `Energia: R$ ${energia.toFixed(2)}\n` +
            `Bandeira ${nomeBandeira(bandeira)}: R$ ${adicional.toFixed(2)}\n` +
            `Total: R$ ${total.toFixed(2)}\n` +
            mensagemBandeira(bandeira);
    saida.className = bandeira === 'verde' ? '' : 'alerta';
});
export {};
//# sourceMappingURL=ex02.js.map