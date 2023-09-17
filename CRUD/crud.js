const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sCategoria = document.querySelector('#m-categoria')
const sDescricao = document.querySelector('#m-descricao')
const sValor= document.querySelector('#m-valor')
const sData = document.querySelector('#m-data')
const btnSalvar = document.querySelector('#btnSalvar')
const INPUT_BUSCA = document.querySelector('#input-busca')
const TABELAS_GASTOS = document.querySelector('#tabela-gastos')
const TotalMoneySpan = document.querySelector('.total-money')


let itens
let id




INPUT_BUSCA.addEventListener('keyup', () =>{
    let expressao = INPUT_BUSCA.value;

    let linhas = TABELAS_GASTOS.getElementsByTagName('tr');

    for (let posicao in linhas){
        if (true === isNaN(posicao)) {
            continue;

        }
        
        let conteudoDaLinha = linhas[posicao].innerHTML.toLowerCase();
        
        if (true === conteudoDaLinha.includes(expressao)){
            linhas[posicao].style.display = '';
        }else{
            linhas[posicao].style.display='none';
        }
        

    }
});




function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sCategoria.value = itens[index].categoria
    sDescricao.value = itens[index].descricao
    sValor.value = itens[index].valor
    sData.value = itens[index].data
    id = index
  } else {
    sCategoria.value = ''
    sDescricao.value = ''
    sValor.value = ''
    sData.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.categoria}</td>
    <td>${item.descricao}</td>
    <td>R$ ${item.valor}</td>
    <td>${item.data}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sCategoria.value == '' || sDescricao.value == '' || sValor.value == '' || sData.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].categoria = sCategoria.value
    itens[id].descricao = sDescricao.value
    itens[id].valor = sValor.value
    itens[id].data = sData.value
  } else {
    itens.push({'categoria': sCategoria.value, 'funcao': sDescricao.value, 'salario': sValor.value, 'data': sData.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()