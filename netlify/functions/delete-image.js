const cloudinary = require('cloudinary').v2

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    cloudinary.config({
      cloudinary_url: process.env.CLOUDINARY_URL
    })

    const { publicId } = JSON.parse(event.body)

    if (!publicId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ erro: 'publicId não informado' })
      }
    }

    const resultado = await cloudinary.uploader.destroy(publicId)

    return {
      statusCode: 200,
      body: JSON.stringify({ resultado: resultado.result })
    }

  } catch (erro) {
    return {
      statusCode: 500,
      body: JSON.stringify({ erro: erro.message })
    }
  }
}
