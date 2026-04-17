async function uploadImagem() {
  const arquivos = document.getElementById("input-imagem").files
  const categoria = document.getElementById("input-categoria").value
  const status = document.getElementById("status")

  if (arquivos.length === 0) {
    status.textContent = "Selecione pelo menos uma imagem!"
    return
  }

  status.textContent = `Enviando 0 de ${arquivos.length}...`

  let enviados = 0

  for (const arquivo of arquivos) {
    const formData = new FormData()
    formData.append("file", arquivo)
    formData.append("upload_preset", "Upload")
    formData.append("folder", categoria)

    const resposta = await fetch("https://api.cloudinary.com/v1_1/dg5lzxhft/image/upload", {
      method: "POST",
      body: formData
    })

    const dados = await resposta.json()

    if (dados.secure_url) {
      enviados++
      status.textContent = `Enviando ${enviados} de ${arquivos.length}...`
    } else {
      status.textContent = `Erro ao enviar ${arquivo.name}`
      console.log(dados)
    }
  }

  status.textContent = `✅ ${enviados} imagens enviadas com sucesso!`
}