const button = document.querySelector('.addtask');
const input = document.querySelector('.task');
const listaCompleta = document.querySelector('.lista');
let minhalista = [];

function adicionarNovaTarefa() {
    if (input.value.trim() === '') { // Verifica se o input está vazio ou contém apenas espaços
        alert('Por favor, adicione uma tarefa antes de clicar no botão!');
        return;}
    minhalista.push({
        tarefa: input.value,
        concluida: false,
    });
    input.value = ''; // Limpa o campo de input
    mostrarTarefas();
}

function mostrarTarefas() {
    let novaLi = '';

    minhalista.forEach((item, posicao) => {
        novaLi += `
            <li class="tarefas ${item.concluida && "done"}">
                <img src="img/checked.png" alt="Marcar como concluída" onclick="concluirTarefa(${posicao})">
                <p class="${item.concluida ? 'concluida' : ''}">${item.tarefa}</p>
                <img src="img/trash.png" alt="Deletar tarefa" onclick="deletarItem(${posicao})">
            </li>
        `;
    });
    listaCompleta.innerHTML = novaLi;

    localStorage.setItem('lista', JSON.stringify(minhalista))
}

function concluirTarefa(posicao) {
    // Alterna o estado de conclusão da tarefa
    minhalista[posicao].concluida = !minhalista[posicao].concluida;
    mostrarTarefas();
}

function deletarItem(posicao) {
    minhalista.splice(posicao, 1); // Remove o item pelo índice
    mostrarTarefas();
}

function recarregarTarefas(){
const tarefasLocalStorage = localStorage.getItem('lista')
if(tarefasLocalStorage){
minhalista = JSON.parse(tarefasLocalStorage)
}
mostrarTarefas()
}
recarregarTarefas()

button.addEventListener('click', adicionarNovaTarefa);
