function alternarTema() {
  document.body.classList.toggle('dark')
  const btn = document.getElementById('btn-tema')
  if (document.body.classList.contains('dark')) {
    btn.textContent = '☀️'
    localStorage.setItem('tema', 'dark')
  } else {
    btn.textContent = '🌙'
    localStorage.setItem('tema', 'light')
  }
}

// Aplica o tema salvo ao carregar
const temaSalvo = localStorage.getItem('tema') || 'dark'
if (temaSalvo === 'dark') {
  document.body.classList.add('dark')
  document.getElementById('btn-tema').textContent = '☀️'
}