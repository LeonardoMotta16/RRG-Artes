// Variáveis globais do carrossel
let imagensCarrossel = [];
let indexAtual = 0;

// Função para carregar as imagens da sua API do Netlify
async function iniciarCarrossel() {
    try {
        const resposta = await fetch('/.netlify/functions/get-images?categoria=tudo');
        const urls = await resposta.json();
        
        // Seleciona as 4 melhores imagens (as primeiras da lista)
        imagensCarrossel = urls.slice(0, 4);
        
        if (imagensCarrossel.length > 0) {
            atualizarFoto();
        }
    } catch (erro) {
        console.error("Erro ao carregar o carrossel:", erro);
    }
}

// Função para mudar a foto (Próximo/Anterior)
function moverCarrossel(direcao) {
    if (imagensCarrossel.length === 0) return;
    
    indexAtual += direcao;
    
    if (indexAtual >= imagensCarrossel.length) indexAtual = 0;
    if (indexAtual < 0) indexAtual = imagensCarrossel.length - 1;
    
    atualizarFoto();
}

function atualizarFoto() {
    const imgElemento = document.getElementById("img-carrossel");
    const imgPrev = document.getElementById("img-prev");
    const imgNext = document.getElementById("img-next");
    if (imgElemento) {
        imgElemento.src = imagensCarrossel[indexAtual];
    }
    if (imgPrev) {
        let prevIndex = (indexAtual - 1 + imagensCarrossel.length) % imagensCarrossel.length;
        imgPrev.src = imagensCarrossel[prevIndex];
    }
    if (imgNext) {
        let nextIndex = (indexAtual + 1) % imagensCarrossel.length;
        imgNext.src = imagensCarrossel[nextIndex];
}
}

// Monitora a mudança de abas para mostrar/esconder o carrossel
// Sem precisar mexer na função trocarAba original
window.addEventListener('click', function(e) {
    // Verifica se o clique foi em um botão de troca de aba
    if (e.target.tagName === 'BUTTON' && e.target.parentElement.id === 'botoes-banner') {
        const textoBotao = e.target.innerText.toLowerCase();
        const container = document.getElementById(".home-section");
        
        if (textoBotao === 'home') {
            //container.bordaelet.display = "block";
            iniciarCarrossel();
        } else {
            //container.bordaelet.display = "none";
        }
    }
});

const tempoAuto = 3000;

let carrosselAutomatico = setInterval(() => {
    moverCarrossel(1);
}, tempoAuto);

const container = document.querySelector('.home-esquerda');

container.addEventListener('mouseenter', () => {
    clearInterval(carrosselAutomatico); // Para o cronômetro
});

container.addEventListener('mouseleave', () => {
    // Reinicia o cronômetro quando o mouse sai
    carrosselAutomatico = setInterval(() => {
        moverCarrossel(1);
    }, tempoAuto);
});