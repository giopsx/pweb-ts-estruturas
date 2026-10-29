// Exercício 01: situação do aluno no semestre.
// Regras: frequência < 75% reprova por falta; média >= 7 aprova;
// média >= 4 vai para exame; abaixo de 4 reprova por nota.

function calcularMedia(n1: number, n2: number): number {
  return (n1 + n2) / 2;
}

// Uma única condição com && e || para validar as três entradas.
function dadosValidos(n1: number, n2: number, frequencia: number): boolean {
  return (
    n1 >= 0 && n1 <= 10 &&
    n2 >= 0 && n2 <= 10 &&
    frequencia >= 0 && frequencia <= 100
  );
}

// A frequência é testada primeiro: a falta reprova qualquer que seja a média.
function situacao(media: number, frequencia: number): string {
  if (frequencia < 75) {
    return 'Reprovado por falta';
  } else if (media >= 7) {
    return 'Aprovado';
  } else if (media >= 4) {
    return `Exame final (precisa tirar ${(10 - media).toFixed(1)})`;
  } else {
    return 'Reprovado por nota';
  }
}

const campoNome = document.getElementById('nome') as HTMLInputElement;
const campoN1 = document.getElementById('n1') as HTMLInputElement;
const campoN2 = document.getElementById('n2') as HTMLInputElement;
const campoFrequencia = document.getElementById('frequencia') as HTMLInputElement;
const botao = document.getElementById('calcular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;

botao.addEventListener('click', () => {
  const nome: string = campoNome.value.trim();
  const n1: number = Number(campoN1.value);
  const n2: number = Number(campoN2.value);
  const frequencia: number = Number(campoFrequencia.value);

  if (!dadosValidos(n1, n2, frequencia)) {
    saida.textContent = 'Dados inválidos';
    saida.className = 'erro';
    return; // retorno antecipado
  }

  const media: number = calcularMedia(n1, n2);
  const resultado: string = situacao(media, frequencia);

  saida.textContent = `${nome}: média ${media.toFixed(1)}. ${resultado}`;
  saida.className = resultado === 'Aprovado' ? 'sucesso' : 'erro';
});
