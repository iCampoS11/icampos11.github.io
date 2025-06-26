// Função para obter caminho da imagem baseado no ID
function obterCaminhoImagem(id) {
    const produtos = {
        1: {categoria: 'frutas', arquivo: 'maca.png'},
        2: {categoria: 'frutas', arquivo: 'alface.png'},
        3: {categoria: 'alimentos', arquivo: 'arroz.png'},
        4: {categoria: 'alimentos', arquivo: 'feijao.png'},
        5: {categoria: 'higiene', arquivo: 'sabonete.jpg'},
        6: {categoria: 'higiene', arquivo: 'detergente.jpg'},
        7: {categoria: 'bebidas', arquivo: 'pergola.jpg'},
        8: {categoria: 'bebidas', arquivo: 'naturalone.jpg'},
        9: {categoria: 'higiene', arquivo: 'amaciante.jpg'},
    };
    
    const produto = produtos[id];
    if (produto) {
        return `imagens/${produto.categoria}/${produto.arquivo}`;
    }
    return 'imagens/sem-imagem.png';
}

// Função para adicionar ao carrinho
function adicionarAoCarrinho(id, nome, preco, imagem) {
    // Recuperar o carrinho do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    // Verificar se o item já está no carrinho
    let itemExistente = carrinho.find(item => item.id === id);
    
    if (itemExistente) {
        // Incrementa a quantidade se o item já existe
        itemExistente.quantidade += 1;
    } else {
        // Adiciona novo item ao carrinho
        carrinho.push({
            id: id,
            nome: nome,
            preco: preco,
            quantidade: 1,
            imagem: imagem
        });
    }
    
    // Salvar o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    
    // Atualizar o contador do carrinho
    atualizarContadorCarrinho();
    
    // Mostrar feedback visual
    mostrarFeedback(`${nome} foi adicionado ao carrinho!`);
}

// Função para atualizar o contador do carrinho
function atualizarContadorCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    
    // Atualizar todos os elementos do contador
    document.querySelectorAll('#contador-carrinho').forEach(span => {
        span.textContent = totalItens;
    });
}

// Função para mostrar feedback visual
function mostrarFeedback(mensagem) {
    // Criar elemento de feedback
    const feedback = document.createElement('div');
    feedback.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3';
    feedback.style.zIndex = '1050';
    feedback.textContent = mensagem;
    
    // Adicionar ao corpo do documento
    document.body.appendChild(feedback);
    
    // Remover após 2 segundos
    setTimeout(() => {
        feedback.remove();
    }, 2000);
}

// Configurações iniciais ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    // Atualizar o contador do carrinho
    atualizarContadorCarrinho();
    
    // Configurar botões de filtro
    const botoesFiltro = document.querySelectorAll('.list-group-item');
    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', function() {
            botoesFiltro.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filtrarProdutos(this.getAttribute('data-categoria'));
        });
    });
    
    // Configurar botões de adicionar ao carrinho
    document.querySelectorAll('.btn-adicionar').forEach(botao => {
        botao.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const nome = this.getAttribute('data-nome');
            const preco = parseFloat(this.getAttribute('data-preco'));
            const imagem = obterCaminhoImagem(id);
            
            adicionarAoCarrinho(id, nome, preco, imagem);
        });
    });
});

// Função para filtrar produtos por categoria
function filtrarProdutos(categoria) {
    const produtos = document.querySelectorAll('.produto');
    
    produtos.forEach(produto => {
        if (categoria === 'todos') {
            produto.style.display = 'block';
            produto.style.opacity = '1';
        } else {
            if (produto.getAttribute('data-categoria') === categoria) {
                produto.style.display = 'block';
                produto.style.opacity = '1';
            } else {
                produto.style.opacity = '0';
                setTimeout(() => {
                    produto.style.display = 'none';
                }, 300);
            }
        }
    });
}