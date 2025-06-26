// js/pedidos.js
document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticação
    const usuario = JSON.parse(sessionStorage.getItem('usuarioLogado'));
    if (!usuario) {
        alert('Por favor, faça login para ver seus pedidos!');
        window.location.href = 'login.html';
        return;
    }
    
    // Carregar pedidos do usuário
    const todosPedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const pedidosUsuario = todosPedidos.filter(p => p.usuario === usuario.id);
    
    const listaPedidos = document.getElementById('lista-pedidos');
    
    if (pedidosUsuario.length === 0) {
        listaPedidos.innerHTML = `
            <div class="alert alert-info text-center">
                <i class="bi bi-cart-x"></i> Você ainda não fez nenhum pedido.
            </div>
        `;
        return;
    }
    
    // Ordenar pedidos por data (mais recente primeiro)
    pedidosUsuario.sort((a, b) => new Date(b.data) - new Date(a.data));
    
    // Exibir pedidos
    pedidosUsuario.forEach(pedido => {
        const total = pedido.itens.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
        const dataFormatada = new Date(pedido.data).toLocaleString('pt-BR');
        
        const pedidoElement = document.createElement('div');
        pedidoElement.className = 'card mb-3 pedido-card';
        pedidoElement.innerHTML = `
            <div class="card-header d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="mb-0">Pedido #${pedido.id}</h5>
                    <small class="text-muted">${dataFormatada}</small>
                </div>
                <span class="badge bg-success">${pedido.status || 'Concluído'}</span>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-4">
                        <p><i class="bi bi-box"></i> <strong>Itens:</strong> ${pedido.itens.length}</p>
                    </div>
                    <div class="col-md-4">
                        <p><i class="bi bi-credit-card"></i> <strong>Pagamento:</strong> ${pedido.formaPagamento}</p>
                    </div>
                    <div class="col-md-4">
                        <p><i class="bi bi-truck"></i> <strong>Entrega:</strong> ${pedido.tipoServico}</p>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-2">
                    <h5 class="mb-0">Total: R$ ${total.toFixed(2)}</h5>
                    <button class="btn btn-sm btn-outline-success toggle-detalhes">
                        <i class="bi bi-chevron-down"></i> Detalhes
                    </button>
                </div>
                
                <div class="pedido-detalhes mt-3">
                    <h6>Itens do pedido:</h6>
                    <ul class="list-group">
                        ${pedido.itens.map(item => `
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 class="mb-1">${item.nome}</h6>
                                    <small>${item.quantidade} x R$ ${item.preco.toFixed(2)}</small>
                                </div>
                                <span class="badge bg-success">R$ ${(item.quantidade * item.preco).toFixed(2)}</span>
                            </li>
                        `).join('')}
                    </ul>
                    
                    <div class="mt-3 row">
                        <div class="col-md-6">
                            <h6>Método de Pagamento:</h6>
                            <p>${pedido.formaPagamento === 'pix' ? 'PIX (Pagamento instantâneo)' : 'Cartão de Crédito/Débito'}</p>
                        </div>
                        <div class="col-md-6">
                            <h6>Tipo de Entrega:</h6>
                            <p>${pedido.tipoServico === 'entrega' ? 
                                'Tele-Entrega' : 'Retirada no Local'}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        listaPedidos.appendChild(pedidoElement);
        
        // Configurar toggle de detalhes
        const toggleBtn = pedidoElement.querySelector('.toggle-detalhes');
        const detalhes = pedidoElement.querySelector('.pedido-detalhes');
        
        toggleBtn.addEventListener('click', function() {
            detalhes.classList.toggle('detalhes-aberto');
            const icon = toggleBtn.querySelector('i');
            
            if (detalhes.classList.contains('detalhes-aberto')) {
                icon.classList.remove('bi-chevron-down');
                icon.classList.add('bi-chevron-up');
                toggleBtn.innerHTML = '<i class="bi bi-chevron-up"></i> Ocultar';
            } else {
                icon.classList.remove('bi-chevron-up');
                icon.classList.add('bi-chevron-down');
                toggleBtn.innerHTML = '<i class="bi bi-chevron-down"></i> Detalhes';
            }
        });
    });
});