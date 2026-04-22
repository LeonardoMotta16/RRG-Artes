exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }

  const { senha } = JSON.parse(event.body)
  const senhaCorreta = process.env.SENHA_ADMIN

  if (senha === senhaCorreta) {
    return {
      statusCode: 200,
      body: JSON.stringify({ acesso: true, token: process.env.TOKEN_ADMIN })
    }
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({ acesso: false })
    }
  }
}