const columns = document.querySelectorAll(".column");

// Ao clicar em um item HTML e arrastá-lo (o evento dragstart é resposável em rastrear a atividade na página) 
// será adicionado a classe "dragging"
document.addEventListener("dragstart", (e) => {
    e.target.classList.add("dragging")
})

// Ao soltar o item (evento "dragend") a classe "dragging" é removida
document.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging")
})

columns.forEach((item) => {
    item.addEventListener("dragover", (e) => {
        // Obtém a referência para o elemento que está sendo arrastado, que possui a classe CSS "dragging". 
        // Isso é feito usando a função document.querySelector(".dragging") e armazenando o elemento retornado na variável dragging.
        const dragging = document.querySelector(".dragging");
        // Calcula a nova posição do elemento arrastado com base na posição vertical do evento e.clientY 
        // (a posição do cursor do mouse no eixo Y). Essa posição é passada para a função getNewPosition(item, e.clientY)
        const applyAfter = getNewPosition(item, e.clientY);
        // Verifica se a nova posição calculada applyAfter é válida. Se for, o código insere o elemento arrastado imediatamente após o elemento applyAfter 
        // usando o método insertAdjacentElement("afterend", dragging). 
        // Essa ação move o elemento arrastado para uma posição após o elemento applyAfter.
        if (applyAfter) {
            applyAfter.insertAdjacentElement("afterend", dragging);
        } 
        // Essa ação move o elemento arrastado para o início do elemento item.
        else {
            item.prepend(dragging);
        }
    })
});

// Essa função getNewPosition é usada para obter o elemento de referência onde o elemento arrastado deve ser posicionado 
// com base em sua posição vertical (positionY). Ela percorre todos os elementos com a classe CSS "item" que não possuem 
// a classe "dragging" e verifica se a posição fornecida positionY está abaixo ou no mesmo nível do centro vertical (refer_card) de cada elemento. 
// O primeiro elemento encontrado com essa condição é retornado como resultado. 
// Se nenhum elemento for encontrado, o valor retornado será undefined.
function getNewPosition(columns, positionY){
    // Seleciona todos os elementos com a classe .item e que não possui a classe .dragging
    const cards = document.querySelectorAll(".item:not(.dragging)");
    let result;

    for (let refer_card of cards) {
        // Obtém o retângulo de posicionamento do elemento refer_card usando o método getBoundingClientRect()
        const box = refer_card.getBoundingClientRect();
        // Calcula-se o valor do centro vertical do elemento refer_card usando a posição vertical (box.y) e a metade da altura (box.height / 2).
        const boxCenterY = box.y + box.height / 2;

        if (positionY >= boxCenterY) result = refer_card
    }
    return result;
}

    // (e) é o que se chama de função de callback,  é uma função passada como argumento para outra função, a fim de ser executada posteriormente.

    // Ao utilizar uma função callback, você está essencialmente delegando a execução de determinada tarefa para outra função. 
    // A função que recebe a função callback é responsável por chamar essa função em um momento adequado, geralmente quando ocorre um evento,
    // quando uma operação assíncrona é concluída ou em outros pontos de execução específicos.