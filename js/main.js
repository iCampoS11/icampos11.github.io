// js/main.js
document.addEventListener('DOMContentLoaded', function() {
    // Atualiza o ano no footer
    const anoAtual = new Date().getFullYear();
    document.querySelectorAll('footer p:first-child').forEach(el => {
        el.textContent = `© ${anoAtual} Super RP - Todos os direitos reservados`;
    });
    
    // Inicializa o carrinho se não existir
    if (!localStorage.getItem('carrinho')) {
        localStorage.setItem('carrinho', JSON.stringify([]));
    }
    
    // Atualiza contador do carrinho
    atualizarContadorCarrinho();
    
    // Função de acessibilidade: Alto Contraste
    const toggleContraste = () => {
        document.body.classList.toggle('alto-contraste');
        const modoAtual = document.body.classList.contains('alto-contraste') ? 'on' : 'off';
        localStorage.setItem('contraste', modoAtual);
        
        // Feedback para leitores de tela
        const feedback = document.getElementById('contraste-feedback');
        if (feedback) {
            feedback.textContent = modoAtual === 'on' ? 
                'Modo alto contraste ativado' : 'Modo alto contraste desativado';
        }
    };

    // Verifica preferência salva
    if (localStorage.getItem('contraste') === 'on') {
        document.body.classList.add('alto-contraste');
    }

    // Cria botão de alto contraste
    const btnContraste = document.createElement('button');
    btnContraste.id = 'btn-contraste';
    btnContraste.className = 'btn btn-outline-secondary';
    btnContraste.innerHTML = '<i class="bi bi-contrast"></i> Alto Contraste';
    btnContraste.setAttribute('aria-label', 'Alternar modo de alto contraste');
    btnContraste.onclick = toggleContraste;
    
    document.body.appendChild(btnContraste);

    // Cria elemento para feedback de acessibilidade
    const feedbackElement = document.createElement('div');
    feedbackElement.id = 'contraste-feedback';
    feedbackElement.className = 'visually-hidden';
    feedbackElement.setAttribute('aria-live', 'polite');
    document.body.appendChild(feedbackElement);

    

    const navbar=document.querySelector('.navbar');
    window.addEventListener('scroll',()=>{ 
    navbar.classList.toggle('shadow', window.scrollY>10);
    });

    const root=document.documentElement;
    let fontRem=parseFloat(localStorage.getItem('fontRem'))||1;
    aplicarFonte();

    ['-','+'].forEach(sinal=>{
    const btn=document.createElement('button');
    btn.className='btn btn-outline-secondary btn-sm ms-2';
    btn.textContent=`A${sinal}`;
    btn.setAttribute('aria-label', (sinal==='+'?'Aumentar':'Diminuir')+' fonte');
    btn.onclick=()=>{ 
    fontRem=Math.min(1.25, Math.max(0.875,fontRem+(sinal==='+'?0.125:-0.125)));
    aplicarFonte();
    };
    document.body.appendChild(btn);
    });

    function aplicarFonte(){
    root.style.fontSize=fontRem+'rem';
    localStorage.setItem('fontRem',fontRem);
    }

    // Verifica se precisa redirecionar para cadastro após adicionar ao carrinho
    if (localStorage.getItem('redirecionarParaCadastro') === 'true') {
        localStorage.removeItem('redirecionarParaCadastro');
        window.location.href = 'cadastro.html';
    }
});

// Função para atualizar o contador do carrinho (usada globalmente)
function atualizarContadorCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    
    document.querySelectorAll('#contador-carrinho').forEach(span => {
        span.textContent = totalItens;
    });
}

// Função para adicionar ao carrinho (compatibilidade)
function adicionarAoCarrinho(id, nome, preco, imagem) {
    // Recuperar o carrinho do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    // Verificar se o item já está no carrinho
    let itemExistente = carrinho.find(item => item.id === id);
    
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            id: id,
            nome: nome,
            preco: preco,
            quantidade: 1,
            imagem: imagem
        });
    }
    
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarContadorCarrinho();
    
    // Mostrar feedback visual
    const feedback = document.createElement('div');
    feedback.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3';
    feedback.style.zIndex = '1050';
    feedback.textContent = `${nome} adicionado ao carrinho!`;
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 2000);
}