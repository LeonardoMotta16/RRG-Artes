let abaAtiva = null

function trocarAba(categoria) {
  const galeria = document.querySelector(".galeria")
  const imagens = document.querySelectorAll(".galeria img")
  const botoes = document.querySelectorAll("#botoes-banner button")

  botoes.forEach(function(btn) { btn.classList.remove("ativo") })
  
  botoes.forEach(function(btn) {
    if (btn.getAttribute("onclick") === `trocarAba('${categoria}')`) {
      btn.classList.add("ativo")
    }
  })

  abaAtiva = categoria

  galeria.classList.add("escondendo")

  setTimeout(function() {
    imagens.forEach(function(img) {
      if (categoria === "tudo") {
        img.style.display = "block"
      } else {
        if (img.dataset.categoria === categoria) {
          img.style.display = "block"
        } else {
          img.style.display = "none"
        }
      }
    })

    galeria.classList.remove("escondendo")
  }, 300)
}