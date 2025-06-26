// Atualiza o contador do carrinho em todas as páginas
document.addEventListener('DOMContentLoaded', function() {
    atualizarContadorCarrinho();
});

function atualizarContadorCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    
    document.querySelectorAll('#contador-carrinho').forEach(span => {
        span.textContent = totalItens;
    });
}

// Função para adicionar item ao carrinho (mantida para compatibilidade)
function adicionarAoCarrinho(id, nome, preco, imagem) {
    // Recuperar o carrinho do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    // Verificar se o item já está no carrinho
    let itemExistente = carrinho.find(item => item.id === id);
    
    if (itemExistente) {
        // Incrementa a quantidade se o item já existe
        itemExistente.quantidade += 1;
    } else {
        // Adiciona novo item ao carrinho com imagem
        carrinho.push({
            id: id,
            nome: nome,
            preco: preco,
            quantidade: 1,
            imagem: imagem // Nova propriedade
        });
    }
    
    // Salvar o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    
    // Atualizar o contador do carrinho
    atualizarContadorCarrinho();
}