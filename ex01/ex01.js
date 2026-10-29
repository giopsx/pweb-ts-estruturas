// Exercício 01: situação do aluno no semestre.
// Regras: frequência < 75% reprova por falta; média >= 7 aprova;
// média >= 4 vai para exame; abaixo de 4 reprova por nota.
function calcularMedia(n1, n2) {
    return (n1 + n2) / 2;
}
// Uma única condição com && e || para validar as três entradas.
function dadosValidos(n1, n2, frequencia) {
    return (n1 >= 0 && n1 <= 10 &&
        n2 >= 0 && n2 <= 10 &&
        frequencia >= 0 && frequencia <= 100);
}
// A frequência é testada primeiro: a falta reprova qualquer que seja a média.
function situacao(media, frequencia) {
    if (frequencia < 75) {
        return 'Reprovado por falta';
    }
    else if (media >= 7) {
        return 'Aprovado';
    }
    else if (media >= 4) {
        return `Exame final (precisa tirar ${(10 - media).toFixed(1)})`;
    }
    else {
        return 'Reprovado por nota';
    }
}
const campoNome = document.getElementById('nome');
const campoN1 = document.getElementById('n1');
const campoN2 = document.getElementById('n2');
const campoFrequencia = document.getElementById('frequencia');
const botao = document.getElementById('calcular');
const saida = document.getElementById('resultado');
botao.addEventListener('click', () => {
    const nome = campoNome.value.trim();
    const n1 = Number(campoN1.value);
    const n2 = Number(campoN2.value);
    const frequencia = Number(campoFrequencia.value);
    if (!dadosValidos(n1, n2, frequencia)) {
        saida.textContent = 'Dados inválidos';
        saida.className = 'erro';
        return; // retorno antecipado
    }
    const media = calcularMedia(n1, n2);
    const resultado = situacao(media, frequencia);
    saida.textContent = `${nome}: média ${media.toFixed(1)}. ${resultado}`;
    saida.className = resultado === 'Aprovado' ? 'sucesso' : 'erro';
});
export {};
//# sourceMappingURL=ex01.js.map