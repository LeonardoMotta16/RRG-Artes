const cloudinary = require('cloudinary').v2

exports.handler = async function(event) {
  try {
    cloudinary.config({
      cloudinary_url: process.env.CLOUDINARY_URL
    })

    const categoria = event.queryStringParameters.categoria || ''
    const expressao = categoria === 'tudo'
      ? 'folder=clientes OR folder=estudos OR folder=ia'
      : `folder:${categoria}`

    const resultado = await cloudinary.search
      .expression(expressao)
      .sort_by('created_at', 'desc')
      .max_results(1000)
      .execute()

    const urls = resultado.resources.map(img => img.secure_url)

    return {
      statusCode: 200,
      body: JSON.stringify(urls)
    }
  } catch (erro) {
    return {
      statusCode: 200,
      body: JSON.stringify({ erro: erro.message })
      
    }
    console.log("Buscando categoria:", categoria);

const resposta = await fetch(`/.netlify/functions/get-images?categoria=${categoria}`);
const urls = await resposta.json();

console.log("Links recebidos do servidor:", urls);
  }
}