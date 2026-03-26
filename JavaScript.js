const button = document.querySelector('#loadButton')
const userList = document.querySelector('#userList')
const input = document.querySelector('#searchUser')

let users = []

async function fetchUser(){
     userList.innerHTML = 'loading...'

  try{
  const searching = await fetch ('https://jsonplaceholder.typicode.com/users')
  
  if(!searching.ok){
    throw new Error(`Erro: ${searching.status}`)
  }

  return await searching.json()

} 
catch (error){
  console.error('Failed to fetch users:', error)
  return []
}
}

userList.classList.add('containerjs')

function renderUser(users){
  userList.innerHTML = ''
  
  users.forEach(user => {
    

  const card = document.createElement('div')
  const face = document.createElement('div')
  const username = document.createElement('h1')
  const email = document.createElement('p')
  const city = document.createElement('p')
  const phone = document.createElement('h3')

  userList.appendChild(card)
  card.appendChild(face)
  card.appendChild(username)
  card.appendChild(email)
  card.appendChild(city)
  card.appendChild(phone)

  
  card.classList.add('card')
  username.classList.add('username')
  email.classList.add('email')
  face.classList.add('face')
  phone.classList.add('phone')
  

 username.textContent = user.name
 email.textContent = user.email
 city.textContent = user.address.city
 phone.textContent = user.phone

  })
}

document.addEventListener('DOMContentLoaded', async () =>{
  users = await fetchUser()
  renderUser(users)
})

input.addEventListener('keydown', (event) => {
  if(event.key === 'Enter') {
  
  const valor = input.value.toLowerCase()

  const filtrando = users.filter(user =>
  user.name.toLowerCase().includes(valor) ||
  user.email.toLowerCase().includes(valor)
  )

  renderUser(filtrando)
  }
})

input.addEventListener('input', () =>{
  const valor = input.value.trim()

  if(valor === ''){
    renderUser(users)
  }

})

