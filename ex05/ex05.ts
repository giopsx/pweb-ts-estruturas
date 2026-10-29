// Exercício 05: caixa do mercado (integrador).
// Lê um preço por linha, aplica o cupom e o desconto do clube de fidelidade.

const MAX_ITENS: number = 20;

type Formatador = (valor: number) => string;

const formatarReal: Formatador = (valor: number): string => {
  return `R$ ${valor.toFixed(2)}`;
};

// Linhas vazias são ignoradas em silêncio; linhas inválidas são contadas.
function lerPrecos(texto: string): { precos: number[]; ignorados: number } {
  const linhas: string[] = texto.split('\n');
  const precos: number[] = [];
  let ignorados: number = 0;

  for (let i = 0; i < linhas.length; i++) {
    if (precos.length >= MAX_ITENS) {
      break; // no máximo 20 itens por compra
    }

    const linha: string = linhas[i].trim();

    if (linha === '') {
      continue; // linha vazia
    }

    const preco: number = Number(linha.replace(',', '.'));

    if (Number.isNaN(preco) || preco <= 0) {
      ignorados++;
      continue; // linha inválida
    }

    precos.push(preco);
  }

  return { precos, ignorados };
}

// Parâmetro rest: recebe os preços um a um e devolve a soma.
function somarItens(...precos: number[]): number {
  let total: number = 0;
  for (const preco of precos) {
    total += preco;
  }
  return total;
}

// Sobrecarga: percentual (número) para a fidelidade, código (texto) para o cupom.
function calcularDesconto(total: number, percentual: number): number;
function calcularDesconto(total: number, cupom: string): number;
function calcularDesconto(total: number, descontoOuCupom: number | string): number {
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

const campoItens = document.getElementById('itens') as HTMLTextAreaElement;
const campoCupom = document.getElementById('cupom') as HTMLInputElement;
const campoFidelidade = document.getElementById('fidelidade') as HTMLInputElement;
const botao = document.getElementById('fechar') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;

botao.addEventListener('click', () => {
  const leitura = lerPrecos(campoItens.value);
  const precos: number[] = leitura.precos;

  if (precos.length === 0) {
    saida.textContent = 'Nenhum item válido';
    saida.className = 'erro';
    return;
  }

  const subtotal: number = somarItens(...precos);
  const cupom: string = campoCupom.value.trim();

  let descontoCupom: number = 0;
  let cupomAplicado: boolean = false;

  if (cupom !== '') {
    descontoCupom = calcularDesconto(subtotal, cupom);
    cupomAplicado = descontoCupom > 0;
  }

  const aposCupom: number = subtotal - descontoCupom;
  const descontoFidelidade: number = campoFidelidade.checked
    ? calcularDesconto(aposCupom, 5)
    : 0;
  const total: number = aposCupom - descontoFidelidade;

  const ignorados: number = leitura.ignorados;
  const textoIgnorados: string = ignorados > 0
    ? ` (${ignorados} ${ignorados === 1 ? 'linha ignorada' : 'linhas ignoradas'})`
    : '';

  let texto: string = `Itens: ${precos.length}${textoIgnorados}\n`;
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
