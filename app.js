const input = document.querySelector('input')
const btn = document.querySelector('button')
const ul = document.querySelector('ul')
const container = document.querySelector('.container')

const criaInput = () => {
    const inputSearch = document.createElement('input')
    inputSearch.placeholder = 'search'
    inputSearch.setAttribute('class', 'search')
    container.appendChild(inputSearch)
}

criaInput()

const inputSearch = document.querySelector('.search')

inputSearch.addEventListener('input', e => {
    const inputValue = e.target.value.toLowerCase()
    const tarefas = document.querySelectorAll('.tarefas')

    tarefas.forEach(task => {
        const spanTitle = task.querySelector('span').textContent.toLocaleLowerCase()

        if (spanTitle.includes(inputValue)) {
            task.style.display = 'flex'
            return
        }

        task.style.display = 'none'
    })
})

const limpaInput = () => {
    input.value = ''
    input.focus()
}

const criaLi = () => {
    const li = document.createElement('li')
    li.setAttribute('class', 'tarefas')
    return li
}

const criaBotaoRemover = li => {
    const botao = document.createElement('button')
    botao.innerHTML = `<img src="./assets/trash-2.svg">`
    botao.setAttribute('class', 'remove')
    li.appendChild(botao)

}

const criaCheck = li => {
    const check = document.createElement('input')
    check.setAttribute('type', 'checkbox')
    check.setAttribute('class', 'inputCheck')
    li.appendChild(check)
}

const criaSpan = () => {
    const span = document.createElement('span')
    return span
}

const criaTarefa = text => {
    const li = criaLi()
    const span = criaSpan()
    criaCheck(li)
    ul.appendChild(span)
    ul.appendChild(li)
    li.appendChild(span)
    span.setAttribute('class', 'nameTask')
    span.innerText += text
    criaBotaoRemover(li)
}

const salvaTarefas = () => {
    const liTarefas = ul.querySelectorAll('li')
    const listaDeTarefas = []

    for (let i = 0; i < liTarefas.length; i++) {
        let tarefaTexto = liTarefas[i].innerText
        tarefaTexto = tarefaTexto.replace('×', '').trim()
        listaDeTarefas.push(tarefaTexto)
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas', tarefasJSON)
}

input.addEventListener('keypress', e => {
    if (e.keyCode === 13) {
        if(!input.value) {
            alert('Vocẽ precisa preencher o input')
            return
        }
        criaTarefa(input.value)
        limpaInput()
        salvaTarefas()
        location.reload()
    }
})

btn.addEventListener('click', () => {
    if(!input.value) {
        alert('Vocẽ precisa preencher o input')
        return
    }
    criaTarefa(input.value)
    limpaInput()
    salvaTarefas()
    location.reload()
})

const adicionaTarefasSalvas = () => {
    const tarefas = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefas)
    console.log(listaDeTarefas)

    for (let i = 0; i < listaDeTarefas.length; i++) {
        criaTarefa(listaDeTarefas[i])
    }
}

adicionaTarefasSalvas()

const remove = document.querySelectorAll('.remove')

remove.forEach(item => {
    item.addEventListener('click', () => {
        const li = item.parentElement
        li.remove()
        salvaTarefas()
    })
})

const selecionado = document.querySelectorAll('.inputCheck')

const marcaInput = () => {
    selecionado.forEach((item, index) => {
        item.addEventListener('change', () => {
            if (item.checked) {
                let li = item.parentElement
                const name = li.querySelector('.nameTask')
                name.classList.add('checked')
            } else {
                let li = item.parentElement
                const name = li.querySelector('.nameTask')
                name.classList.remove('checked')   
            }
        })
    })
}

const buttonRemoveAll = () => {
    const button = document.createElement('button')
    button.setAttribute('class', 'removeAll')
    button.innerText = 'remove all'
    const container = document.querySelector('.containerGlobal')
    container.appendChild(button)
    button.addEventListener('click', () => {
    const tarefas = document.querySelectorAll('.tarefas')

    tarefas.forEach(e => {
        e.remove()
        salvaTarefas()
        button.style.display = 'none'
    })
    
})
    
}

buttonRemoveAll()

marcaInput()
