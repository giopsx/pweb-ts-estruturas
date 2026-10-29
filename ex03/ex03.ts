// Exercício 03: simulador de parcelamento de 1 a 12 vezes.
// A loja não oferece 7, 8, 9 e 11 parcelas; até 3x sem juros;
// de 4x em diante, juros compostos de 2% ao mês; parcela mínima de R$ 50,00.

const PARCELAS_NAO_OFERECIDAS: number[] = [7, 8, 9, 11];
const PARCELA_MINIMA: number = 50;

function calcularTotal(valor: number, parcelas: number): number {
  if (parcelas <= 3) {
    return valor; // sem juros
  }
  return valor * 1.02 ** parcelas;
}

// A entrada é um parâmetro opcional: quando não vem, o preço todo é financiado.
function simularParcelamento(preco: number, entrada?: number): string {
  let financiado: number = preco;

  if (typeof entrada !== 'undefined') {
    financiado = preco - entrada;
  }

  let linhas: string = '';

  for (let parcelas = 1; parcelas <= 12; parcelas++) {
    if (PARCELAS_NAO_OFERECIDAS.includes(parcelas)) {
      continue; // a loja não oferece essa quantidade
    }

    const total: number = calcularTotal(financiado, parcelas);
    const valorParcela: number = total / parcelas;

    if (valorParcela < PARCELA_MINIMA) {
      break; // abaixo da parcela mínima, as opções acabam
    }

    const juros: string = parcelas <= 3 ? 'sem juros' : '2% a.m.';
    linhas +=
      `<tr><td>${parcelas}x</td>` +
      `<td>R$ ${valorParcela.toFixed(2)}</td>` +
      `<td>R$ ${total.toFixed(2)}</td>` +
      `<td>${juros}</td></tr>`;
  }

  return linhas;
}

const campoPreco = document.getElementById('preco') as HTMLInputElement;
const campoEntrada = document.getElementById('entrada') as HTMLInputElement;
const botao = document.getElementById('simular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;
const corpoTabela = document.getElementById('parcelas') as HTMLElement;

botao.addEventListener('click', () => {
  const preco: number = Number(campoPreco.value);
  const textoEntrada: string = campoEntrada.value.trim();

  if (preco <= 0) {
    saida.textContent = 'Informe um preço válido';
    saida.className = 'erro';
    corpoTabela.innerHTML = '';
    return;
  }

  if (textoEntrada === '') {
    // Sem entrada: a função é chamada sem o segundo argumento.
    saida.textContent = `Valor financiado: R$ ${preco.toFixed(2)}`;
    saida.className = '';
    corpoTabela.innerHTML = simularParcelamento(preco);
    return;
  }

  const entrada: number = Number(textoEntrada);

  if (entrada >= preco) {
    saida.textContent = 'A entrada cobre o valor total. Não há parcelas.';
    saida.className = 'sucesso';
    corpoTabela.innerHTML = '';
    return;
  }

  const financiado: number = preco - entrada;
  saida.textContent = `Valor financiado: R$ ${financiado.toFixed(2)}`;
  saida.className = '';
  corpoTabela.innerHTML = simularParcelamento(preco, entrada);
});
