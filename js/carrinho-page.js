document.addEventListener('DOMContentLoaded', function() {
    // Função para renderizar os itens do carrinho
    function renderizarCarrinho() {
        const listaCarrinho = document.getElementById('lista-carrinho');
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        
        // Limpa o container
        listaCarrinho.innerHTML = '';
        
        if (carrinho.length === 0) {
            listaCarrinho.innerHTML = '<div class="alert alert-info text-center">Seu carrinho está vazio.</div>';
            document.getElementById('btn-finalizar').disabled = true;
            atualizarResumoCompra();
            return;
        }
        
        carrinho.forEach(item => {
            const subtotal = item.preco * item.quantidade;
            const itemElement = document.createElement('div');
            itemElement.className = 'list-group-item mb-3';
            itemElement.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        ${item.imagem ? 
                            `<img src="${item.imagem}" alt="${item.nome}" class="carrinho-imagem me-3">` : 
                            '<div class="carrinho-imagem-placeholder me-3"></div>'
                        }
                        <div>
                            <h5 class="mb-1">${item.nome}</h5>
                            <p class="mb-1">Preço unitário: R$ ${item.preco.toFixed(2)}</p>
                            <div class="d-flex align-items-center mt-2">
                                <button class="btn btn-sm btn-outline-secondary" data-id="${item.id}" data-action="decrease">
                                    <i class="bi bi-dash"></i>
                                </button>
                                <input type="number" class="form-control form-control-sm mx-2" 
                                    value="${item.quantidade}" min="1" 
                                    style="width: 60px;" data-id="${item.id}">
                                <button class="btn btn-sm btn-outline-secondary" data-id="${item.id}" data-action="increase">
                                    <i class="bi bi-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="text-end">
                        <p class="mb-1 fw-bold">R$ ${subtotal.toFixed(2)}</p>
                        <button class="btn btn-sm btn-danger mt-2" data-id="${item.id}" data-action="remove">
                            <i class="bi bi-trash"></i> Remover
                        </button>
                    </div>
                </div>
            `;
            listaCarrinho.appendChild(itemElement);
        });
        
        document.getElementById('btn-finalizar').disabled = false;
        atualizarResumoCompra();
        configurarEventos();
    }

    // Função para configurar eventos
    function configurarEventos() {
        document.querySelectorAll('[data-action="decrease"]').forEach(botao => {
            botao.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                alterarQuantidade(id, -1);
            });
        });
        
        document.querySelectorAll('[data-action="increase"]').forEach(botao => {
            botao.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                alterarQuantidade(id, 1);
            });
        });
        
        document.querySelectorAll('[data-action="remove"]').forEach(botao => {
            botao.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                removerItem(id);
            });
        });
        
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener('change', function() {
                const id = parseInt(this.getAttribute('data-id'));
                const novaQuantidade = parseInt(this.value);
                alterarQuantidade(id, 0, novaQuantidade);
            });
        });
    }

    // Funções para manipulação do carrinho
    function alterarQuantidade(id, delta, novaQuantidade = null) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const item = carrinho.find(item => item.id === id);
        
        if (item) {
            if (novaQuantidade !== null) {
                item.quantidade = novaQuantidade;
            } else {
                item.quantidade += delta;
            }
            
            if (item.quantidade < 1) item.quantidade = 1;
            
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            renderizarCarrinho();
            atualizarContadorGlobal();
        }
    }
    
    function removerItem(id) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho = carrinho.filter(item => item.id !== id);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        renderizarCarrinho();
        atualizarContadorGlobal();
    }
    
    function atualizarContadorGlobal() {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
        document.querySelectorAll('#contador-carrinho').forEach(span => {
            span.textContent = totalItens;
        });
    }

    // Função para atualizar o resumo da compra
    function atualizarResumoCompra() {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const subtotal = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
        
        document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
        document.getElementById('total').textContent = `R$ ${subtotal.toFixed(2)}`;
    }

    // Inicialização da página
    const lista=document.getElementById('lista-carrinho');
    for(let i=0;i<3;i++){
    const ph=document.createElement('div');
        ph.className='row g-0 align-items-center py-2 skeleton';
        ph.style.height='72px';
     lista.appendChild(ph);
}
    setTimeout(()=>{ 
        lista.innerHTML='';
    renderizarCarrinho();
    },400);
    
    // Configurar evento para o botão finalizar
document.getElementById('btn-finalizar').addEventListener('click', function() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    // Verificar forma de pagamento selecionada
    const formaPagamento = document.querySelector('input[name="forma-pagamento"]:checked').value;
    
    // Validar dados do cartão se necessário
if (formaPagamento === 'cartao') {
    const numero = document.getElementById('numero-cartao').value;
    const mes = document.getElementById('validade-mes').value;
    const ano = document.getElementById('validade-ano').value;
    const cvv = document.getElementById('cvv-cartao').value;
    const nome = document.getElementById('nome-cartao').value;
    
    // Validar campos
    if (!numero || !mes || !ano || !cvv || !nome) {
        alert('Por favor, preencha todos os campos do cartão!');
        return;
    }
    
    // Validar número do cartão (deve ter 19 caracteres com espaços)
    if (numero.replace(/\s/g, '').length !== 16) {
        alert('Número do cartão inválido! Deve conter 16 dígitos.');
        return;
    }
}
    
    // Verificar autenticação (AGORA REDIRECIONA PARA LOGIN)
    const usuarioLogado = sessionStorage.getItem('usuarioLogado');
    if (!usuarioLogado) {
        localStorage.setItem('redirecionarParaCarrinho', 'true');
        window.location.href = 'login.html'; // Mudança para login
        return;
    }
    
    // Criar objeto de pedido
    const tipoServico = document.querySelector('input[name="tipo-servico"]:checked').value;
    
    const pedido = {
        id: Date.now(),
        data: new Date().toISOString(),
        itens: carrinho,
        formaPagamento: formaPagamento,
        tipoServico: tipoServico,
        status: 'Concluído',
        usuario: JSON.parse(usuarioLogado).id
    };

    // Salvar pedido no histórico
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidos.push(pedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    
    // Salvar pedido e forma de pagamento para a página de resumo
    localStorage.setItem('ultimoPedido', JSON.stringify(pedido));
    localStorage.setItem('formaPagamento', formaPagamento);
    
    // Limpar carrinho
    localStorage.removeItem('carrinho');
    atualizarContadorGlobal();
    
    // Redirecionar para página de resumo
    window.location.href = 'resumo-compra.html';
});
    document.querySelectorAll('input[name="tipo-servico"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const camposEntrega = document.getElementById('tele-entrega-campos');
            camposEntrega.style.display = this.value === 'entrega' ? 'block' : 'none';
            
            // Atualizar resumo com frete se necessário
            if (this.value === 'entrega') {
                calcularFrete();
            } else {
                document.getElementById('frete-info').style.display = 'none';
                atualizarResumoCompra();
            }
        });
    });

    // Função para calcular frete (exemplo simplificado)
    function calcularFrete() {
        // Exemplo de cálculo de frete - implementação real dependeria de API
        const frete = 15.00;
        const tempo = 45;
        
        document.getElementById('valor-frete').textContent = `R$ ${frete.toFixed(2)}`;
        document.getElementById('tempo-entrega').textContent = `${tempo} minutos`;
        document.getElementById('frete-info').style.display = 'block';
        
        atualizarResumoCompra();
    }

    // Inicializar Flatpickr para seleção de data
    flatpickr("#data-agendamento", {
        locale: "pt", 
        minDate: "today",
        dateFormat: "d/m/Y",
        disableMobile: "true", // Para melhor experiência em desktop
        onChange: function(selectedDates) {
            carregarHorariosDisponiveis();
        }
    });

    // Função para carregar horários disponíveis
    function carregarHorariosDisponiveis() {
        const selectHorario = document.getElementById('horario-agendamento');
        selectHorario.innerHTML = '<option value="">Selecione um horário</option>';
        
        // Horários de exemplo
        const horarios = [
            '08:00 - 10:00',
            '10:00 - 12:00',
            '14:00 - 16:00',
            '16:00 - 18:00',
            '18:00 - 20:00'
        ];
        
        horarios.forEach(horario => {
            const option = document.createElement('option');
            option.value = horario;
            option.textContent = horario;
            selectHorario.appendChild(option);
        });
    }

    // Carregar horários ao iniciar (se já tiver data selecionada)
    if (document.getElementById('data-agendamento').value) {
        carregarHorariosDisponiveis();
    }

    // Configurar evento para o CEP
    document.getElementById('cep-entrega')?.addEventListener('blur', function() {
        if (this.value.length > 7) {
            calcularFrete();
        }
    });

    // Atualizar resumo quando houver mudanças
    function atualizarResumoCompra() {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const subtotal = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
        
        // Calcular frete se necessário
        let frete = 0;
        const tipoEntrega = document.querySelector('input[name="tipo-servico"]:checked')?.value;
        if (tipoEntrega === 'entrega') {
            frete = 15.00; // Valor exemplo
        }
        
        document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
        document.getElementById('total').textContent = `R$ ${(subtotal + frete).toFixed(2)}`;
    }
    
    // Inicializar campos
    const tipoServicoSelecionado = document.querySelector('input[name="tipo-servico"]:checked');
    if (tipoServicoSelecionado && tipoServicoSelecionado.value === 'entrega') {
        document.getElementById('tele-entrega-campos').style.display = 'block';
    }
});