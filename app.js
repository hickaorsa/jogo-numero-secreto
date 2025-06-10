// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Número secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número de 1 a 10';
let numeroSorteadosAleatorios = []
let limiteDeNumerosLista = 100
let tentativas = 1;
let numeroSecreto = criarNumeroAleatorio();

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Número secreto');
    exibirTextoNaTela('p', `Escolha um número de 1 a ${limiteDeNumerosLista}.`);
}


function verificarChute() {
    let chute = document.querySelector('input').value;

    if(chute == numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? 'tentativas.' : 'tentativa.';
        exibirTextoNaTela('h1', 'Certa resposta!!');
        exibirTextoNaTela('p', 'Você acertou o número secreto com '+tentativas+' '+palavraTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número é menor');
            
        } else {
            exibirTextoNaTela('p', 'O número é maior');
            
        }
        tentativas++;
        limparCampo();
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function criarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * limiteDeNumerosLista + 1);
    let qtElementosNaLista = numeroSorteadosAleatorios.length;
    
    if(qtElementosNaLista == limiteDeNumerosLista) {
        numeroSorteadosAleatorios = [];
    }

    if (numeroSorteadosAleatorios.includes(numeroEscolhido)) {
        return criarNumeroAleatorio();
    } else {
        numeroSorteadosAleatorios.push(numeroEscolhido);
        console.log(numeroSorteadosAleatorios)
        return numeroEscolhido;
    }
}

console.log(numeroSecreto)

function reiniciarJogo() {
    numeroSecreto = criarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

exibirMensagemInicial();
