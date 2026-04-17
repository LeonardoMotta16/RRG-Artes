async function uploadImagem() {
  const arquivo = document.getElementById("input-imagem").files[0]
  const categoria = document.getElementById("input-categoria").value
  const status = document.getElementById("status")

  if (!arquivo) {
    status.textContent = "Selecione uma imagem!"
    return
  }

  status.textContent = "Enviando..."

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
    status.textContent = "Enviado com sucesso!"
    console.log("URL da imagem:", dados.secure_url)
  } else {
    status.textContent = "Erro ao enviar!"
    console.log(dados)
  }
}   