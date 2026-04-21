let abaAtiva = null

async function trocarAba(categoria) {

const botoes = document.querySelectorAll("#botoes-banner button")
botoes.forEach(function(btn) { btn.classList.remove("ativo") })
botoes.forEach(function(btn) {
  if (btn.getAttribute("onclick") === `trocarAba('${categoria}')`) {
    btn.classList.add("ativo")
  }
})


//Continuar mais tarde, fazer a home aparecer, Finalizado testar
const homeSection = document.querySelector(".homeSection");
if(categoria === "home"){
  homeSection.style.display = "flex";
}
else{
  homeSection.style.display = "none";
}


const fotoPerf = document.querySelector(".foto-perf");

if (categoria === "home") {
  fotoPerf.style.display = "flex";
  iniciarCarrossel()
} else {
  fotoPerf.style.display = "none";
}

  const galeria = document.querySelector(".galeria");
  if (!galeria) return console.error("Erro: Div .galeria não encontrada no HTML!");

  try {
    // Usando o caminho absoluto para a função
    const resposta = await fetch('/.netlify/functions/get-images?categoria=' + categoria);
    const urls = await resposta.json();

    galeria.innerHTML = "";
    urls.forEach(url => {
      const img = document.createElement("img");
      img.src = url;
      img.style.display = "block"; // Garante que a imagem não tenha tamanho zero
      img.onclick = () => openModal(img);
      galeria.appendChild(img);
    });

    // Remove a opacidade 0 na marra
    galeria.style.opacity = "1";
    galeria.classList.remove("escondendo");
    
  } catch (e) {
    console.error("Erro ao buscar imagens:", e);
  }
}

// Garante que o código só rode quando o HTML estiver pronto
window.addEventListener('load', () => {
  trocarAba('home ');
});