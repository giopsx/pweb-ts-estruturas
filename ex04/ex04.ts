// Exercício 04: em quantos meses o cliente junta o valor da meta.
// A cada mês o saldo rende e depois entra o depósito.
// Em dezembro (mês 12, 24, 36...) entra um depósito extra, do 13º salário.

const LIMITE_MESES: number = 600; // 50 anos

type Formatador = (valor: number) => string;

type Simulacao = {
  meses: number;
  saldo: number;
  depositado: number;
};

const formatarReal: Formatador = (valor: number): string => {
  return `R$ ${valor.toFixed(2)}`;
};

const formatarMeses = (meses: number): string => {
  const anos: number = Math.floor(meses / 12);
  const resto: number = meses % 12;

  const textoAnos: string = `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
  const textoMeses: string = `${resto} ${resto === 1 ? 'mês' : 'meses'}`;

  if (anos === 0) {
    return textoMeses;
  }
  if (resto === 0) {
    return textoAnos;
  }
  return `${textoAnos} e ${textoMeses}`;
};

// A taxa tem valor padrão de 0,5% ao mês.
function calcularMeses(meta: number, deposito: number, taxa: number = 0.5): Simulacao {
  let saldo: number = 0;
  let depositado: number = 0;
  let meses: number = 0;

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

function exibirValor(rotulo: string, valor: number, formatar: Formatador): string {
  return `${rotulo}: ${formatar(valor)}`;
}

const campoMeta = document.getElementById('meta') as HTMLInputElement;
const campoDeposito = document.getElementById('deposito') as HTMLInputElement;
const campoTaxa = document.getElementById('taxa') as HTMLInputElement;
const botao = document.getElementById('calcular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;

botao.addEventListener('click', () => {
  const meta: number = Number(campoMeta.value);
  const deposito: number = Number(campoDeposito.value);
  const textoTaxa: string = campoTaxa.value.trim();

  if (meta <= 0 || deposito <= 0) {
    saida.textContent = 'Informe valores positivos';
    saida.className = 'erro';
    return;
  }

  // Campo de rendimento vazio: a função é chamada sem o terceiro argumento.
  const simulacao: Simulacao = textoTaxa === ''
    ? calcularMeses(meta, deposito)
    : calcularMeses(meta, deposito, Number(textoTaxa));

  const rendimento: number = simulacao.saldo - simulacao.depositado;
  const atingiu: boolean = simulacao.saldo >= meta;

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
