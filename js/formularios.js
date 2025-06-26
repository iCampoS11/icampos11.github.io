// js/formularios.js
document.addEventListener('DOMContentLoaded', () => {
    // ======================
    // FUNÇÕES DE FORMATAÇÃO
    // ======================
    
    // Formatar CPF: xxx.xxx.xxx-xx
    const formatarCPF = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 11) {
            value = value.substring(0, 11);
        }
        
        let formatted = '';
        for (let i = 0; i < value.length; i++) {
            if (i === 3 || i === 6) {
                formatted += '.';
            } else if (i === 9) {
                formatted += '-';
            }
            formatted += value[i];
        }
        
        e.target.value = formatted;
    };

    // Formatar Data de Nascimento: dd/mm/yyyy
    const formatarNascimento = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 8) {
            value = value.substring(0, 8);
        }
        
        let formatted = '';
        for (let i = 0; i < value.length; i++) {
            if (i === 2 || i === 4) {
                formatted += '/';
            }
            formatted += value[i];
        }
        
        e.target.value = formatted;
    };

    // Formatar CEP: 00000-000
    const formatarCEP = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 8) {
            value = value.substring(0, 8);
        }
        
        let formatted = '';
        for (let i = 0; i < value.length; i++) {
            if (i === 5) {
                formatted += '-';
            }
            formatted += value[i];
        }
        
        e.target.value = formatted;
    };

    // Formatar Celular: (xx) xxxxx-xxxx
    const formatarCelular = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 11) {
            value = value.substring(0, 11);
        }
        
        let formatted = '';
        for (let i = 0; i < value.length; i++) {
            if (i === 0) {
                formatted += '(';
            }
            if (i === 2) {
                formatted += ') ';
            }
            if (i === 7) {
                formatted += '-';
            }
            formatted += value[i];
        }
        
        e.target.value = formatted;
    };

    // Aceitar apenas números no campo número
    const formatarNumero = (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    };

    // ======================
    // CONFIGURAÇÃO DE EVENTOS
    // ======================
    
    // Configurar eventos de formatação
    document.getElementById('cpf')?.addEventListener('input', formatarCPF);
    document.getElementById('nascimento')?.addEventListener('input', formatarNascimento);
    document.getElementById('cep')?.addEventListener('input', formatarCEP);
    document.getElementById('telefone')?.addEventListener('input', formatarCelular);
    document.getElementById('numero')?.addEventListener('input', formatarNumero);

    // ======================
    // VALIDAÇÃO DO FORMULÁRIO
    // ======================
    
    const formCadastro = document.getElementById('form-cadastro');
    
    if (formCadastro) {
        // Criar usuário admin padrão se não existir
        if (!localStorage.getItem('usuarios')) {
            const adminUser = {
                id: 1,
                nome: "Administrador",
                email: "admin@superrp.com",
                senha: "0123",
                hierarquia: "admin",
                cpf: "000.000.000-00",
                telefone: "(16) 99999-9999"
            };
            localStorage.setItem('usuarios', JSON.stringify([adminUser]));
        }

        formCadastro.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Resetar estados de validação
            formCadastro.classList.add('was-validated');
            const campos = formCadastro.querySelectorAll('input, select');
            campos.forEach(campo => campo.classList.remove('is-invalid'));
            
            let valido = true;

            // Validação específica para CPF
            const cpf = document.getElementById('cpf');
            const cpfNumerico = cpf.value.replace(/\D/g, '');
            if (cpf && cpfNumerico.length !== 11) {
                valido = false;
                cpf.classList.add('is-invalid');
            }
            
            // Validação do CEP (deve começar com 14 e ter 8 dígitos)
            const cep = document.getElementById('cep');
            const cepNumerico = cep.value.replace(/\D/g, '');
            if (cep && (cepNumerico.length !== 8 || !cepNumerico.startsWith('14'))) {
                valido = false;
                cep.classList.add('is-invalid');
                
                // Mensagem customizada para CEP
                const feedback = document.createElement('div');
                feedback.className = 'invalid-feedback';
                feedback.textContent = 'O mercado só entrega em Ribeirão Preto! CEP deve começar com "14"';
                if (!cep.nextElementSibling) {
                    cep.parentNode.appendChild(feedback);
                }
            }
            
            // Validação de data de nascimento (opcional)
            const nascimento = document.getElementById('nascimento');
            const nascimentoNumerico = nascimento.value.replace(/\D/g, '');
            if (nascimento.value && nascimentoNumerico.length !== 8) {
                valido = false;
                nascimento.classList.add('is-invalid');
            }
            
            // Validação de celular (11 dígitos)
            const telefone = document.getElementById('telefone');
            const telefoneNumerico = telefone.value.replace(/\D/g, '');
            if (telefone && telefoneNumerico.length !== 11) {
                valido = false;
                telefone.classList.add('is-invalid');
            }
            
            // Validação básica de campos obrigatórios
            const camposObrigatorios = formCadastro.querySelectorAll('[required]');
            camposObrigatorios.forEach(campo => {
                if (!campo.value.trim()) {
                    valido = false;
                    campo.classList.add('is-invalid');
                }
            });
            
            if (valido) {
                // Salva o usuário no sistema
                const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
                
                // Verifica se email já existe
                const email = document.getElementById('email').value;
                if (usuarios.some(u => u.email === email)) {
                    alert('Este email já está cadastrado!');
                    return;
                }
                
                const novoUsuario = {
                    id: usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 2, // Começa em 2 porque o admin é 1
                    nome: document.getElementById('nome').value,
                    email: email,
                    senha: document.getElementById('senha').value,
                    cpf: cpf.value,
                    telefone: telefone.value,
                    sexo: document.querySelector('input[name="sexo"]:checked')?.value || '',
                    nascimento: nascimento.value,
                    endereco: {
                        cep: cep.value,
                        logradouro: document.getElementById('logradouro').value,
                        numero: document.getElementById('numero').value,
                        complemento: document.getElementById('complemento').value,
                        bairro: document.getElementById('bairro').value
                        // Cidade e estado removidos
                    },
                    hierarquia: "usuario" // Padrão
                };
                
                usuarios.push(novoUsuario);
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                
                // Loga o usuário automaticamente
                sessionStorage.setItem('usuarioLogado', JSON.stringify(novoUsuario));
                
                alert('Cadastro realizado com sucesso! Você está logado.');
                formCadastro.reset();
                
                // Redireciona
                if (localStorage.getItem('redirecionarParaCarrinho')) {
                    localStorage.removeItem('redirecionarParaCarrinho');
                    window.location.href = 'carrinho.html';
                } else {
                    window.location.href = 'index.html';
                }
            }
        });
    }
});

// Função de validação de CPF (mantida para compatibilidade)
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    return cpf.length === 11;
}