let listaDeNumeroSorteados = [ ];
let numeroLimite = 10;
let numeroSecreto= gerarNumeroAleatorio();
let tentativas= 1;
function exibirTextoTela(tag,texto){
    let  campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
function exibirMensagemInicial(){
    exibirTextoTela('h1','Jogo do Numero Secreto');
    exibirTextoTela('p','Escolha um numero entre 1 e 10');

}
exibirMensagemInicial();

function gerarNumeroAleatorio(){
   
    let NumeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumeroSorteados.length;
    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumeroSorteados= [];

    }

    if(listaDeNumeroSorteados.includes(NumeroEscolhido)){
        return gerarNumeroAleatorio();

    }else{
        listaDeNumeroSorteados.push(NumeroEscolhido);
        
        return NumeroEscolhido;
        
    }

}
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';

}
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas =1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}

function verificarChute(){
    let chute= document.querySelector('input').value;
    if(chute == numeroSecreto){
        exibirTextoTela('h1','Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas':'tentativa';
        let mensageTentativas = `Você descobriu o numero secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoTela('p',mensageTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');

    }else{
        if(chute > numeroSecreto){
            exibirTextoTela('p',' O Numero secreto é menor');
        }else{
            exibirTextoTela('p',' O Numero secreto é maior');
        
        }
        tentativas++;
        limparCampo();
    }
}