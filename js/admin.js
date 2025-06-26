// js/admin.js
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se é admin
    if (!verificarAutenticacao('admin')) return;
    
    // Carregar lista de usuários
    carregarUsuarios();
    
    // Configurar botão novo usuário
    document.getElementById('btn-novo-usuario').addEventListener('click', () => {
        abrirModalUsuario();
    });
});

function carregarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const tbody = document.getElementById('tabela-usuarios');
    tbody.innerHTML = '';
    
    usuarios.forEach(usuario => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td>${usuario.hierarquia}</td>
            <td>
                <button class="btn btn-sm btn-primary editar-usuario" data-id="${usuario.id}">
                    <i class="bi bi-pencil"></i>
                </button>
                ${usuario.hierarquia !== 'admin' ? 
                    `<button class="btn btn-sm btn-danger excluir-usuario" data-id="${usuario.id}">
                        <i class="bi bi-trash"></i>
                    </button>` : ''
                }
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    // Configurar eventos
    document.querySelectorAll('.editar-usuario').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            abrirModalUsuario(id);
        });
    });
    
    document.querySelectorAll('.excluir-usuario').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            excluirUsuario(id);
        });
    });
}

function abrirModalUsuario(id = null) {
    const modal = new bootstrap.Modal(document.getElementById('modal-usuario'));
    const modalTitle = document.getElementById('modal-titulo');
    const modalBody = document.querySelector('#modal-usuario .modal-body');
    
    if (id) {
        // Editar usuário existente
        modalTitle.textContent = 'Editar Usuário';
        const usuario = JSON.parse(localStorage.getItem('usuarios'))
            .find(u => u.id === id);
            
        modalBody.innerHTML = `
            <form id="form-usuario">
                <input type="hidden" id="usuario-id" value="${usuario.id}">
                
                <div class="mb-3">
                    <label for="nome" class="form-label">Nome</label>
                    <input type="text" class="form-control" id="nome" value="${usuario.nome}" required>
                </div>
                
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" value="${usuario.email}" required>
                </div>
                
                <div class="mb-3">
                    <label for="hierarquia" class="form-label">Hierarquia</label>
                    <select class="form-select" id="hierarquia" required>
                        <option value="usuario" ${usuario.hierarquia === 'usuario' ? 'selected' : ''}>Usuário</option>
                        <option value="estoquista" ${usuario.hierarquia === 'estoquista' ? 'selected' : ''}>Estoquista</option>
                        <option value="gerente" ${usuario.hierarquia === 'gerente' ? 'selected' : ''}>Gerente</option>
                        <option value="admin" ${usuario.hierarquia === 'admin' ? 'selected' : ''}>Admin</option>
                    </select>
                </div>
                
                <div class="mb-3">
                    <label for="senha" class="form-label">Nova Senha (opcional)</label>
                    <input type="password" class="form-control" id="senha">
                </div>
                
                <div class="d-grid">
                    <button type="submit" class="btn btn-success">Salvar Alterações</button>
                </div>
            </form>
        `;
    } else {
        // Criar novo usuário
        modalTitle.textContent = 'Novo Usuário';
        modalBody.innerHTML = `
            <form id="form-usuario">
                <div class="mb-3">
                    <label for="nome" class="form-label">Nome</label>
                    <input type="text" class="form-control" id="nome" required>
                </div>
                
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" required>
                </div>
                
                <div class="mb-3">
                    <label for="hierarquia" class="form-label">Hierarquia</label>
                    <select class="form-select" id="hierarquia" required>
                        <option value="usuario">Usuário</option>
                        <option value="estoquista">Estoquista</option>
                        <option value="gerente">Gerente</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                
                <div class="mb-3">
                    <label for="senha" class="form-label">Senha</label>
                    <input type="password" class="form-control" id="senha" required>
                </div>
                
                <div class="d-grid">
                    <button type="submit" class="btn btn-success">Criar Usuário</button>
                </div>
            </form>
        `;
    }
    
    modal.show();
    
    // Configurar envio do formulário
    document.getElementById('form-usuario').addEventListener('submit', (e) => {
        e.preventDefault();
        salvarUsuario(id);
        modal.hide();
    });
}

function salvarUsuario(id) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios'));
    const form = document.getElementById('form-usuario');
    
    if (id) {
        // Editar usuário existente
        const index = usuarios.findIndex(u => u.id === id);
        if (index !== -1) {
            usuarios[index].nome = document.getElementById('nome').value;
            usuarios[index].email = document.getElementById('email').value;
            usuarios[index].hierarquia = document.getElementById('hierarquia').value;
            
            const novaSenha = document.getElementById('senha').value;
            if (novaSenha) {
                usuarios[index].senha = novaSenha;
            }
        }
    } else {
        // Criar novo usuário
        const novoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
        usuarios.push({
            id: novoId,
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            senha: document.getElementById('senha').value,
            hierarquia: document.getElementById('hierarquia').value,
            cpf: '000.000.000-00' // Placeholder
        });
    }
    
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    carregarUsuarios();
}

function excluirUsuario(id) {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;
    
    let usuarios = JSON.parse(localStorage.getItem('usuarios'));
    usuarios = usuarios.filter(u => u.id !== id);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    carregarUsuarios();
}