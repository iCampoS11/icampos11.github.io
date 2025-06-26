// js/auth.js
document.addEventListener('DOMContentLoaded', function() {
    // Atualiza o header em todas as páginas
    atualizarHeaderUsuario();
    // logout
    document.getElementById('logout')?.addEventListener('click', function(e) {
        e.preventDefault();
        sessionStorage.removeItem('usuarioLogado');
        window.location.href = 'index.html';
    });
});

function atualizarHeaderUsuario() {
    const usuario = JSON.parse(sessionStorage.getItem('usuarioLogado'));
    const navUser = document.getElementById('nav-user');
    
    if (!navUser) return;
    
    if (usuario) {
        navUser.innerHTML = `
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                    <i class="bi bi-person"></i> ${usuario.nome.split(' ')[0]}
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                    ${usuario.hierarquia === 'admin' ? 
                        '<li><a class="dropdown-item" href="admin.html">Admin</a></li>' : ''}
                    <li><a class="dropdown-item" href="pedidos.html">Meus Pedidos</a></li>
                    <li><a class="dropdown-item" href="#" id="logout">Sair</a></li>
                </ul>
            </li>
        `;
    } else {
        // Usuário não logado
        navUser.innerHTML = `
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                    <i class="bi bi-person"></i> Login
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="login.html">Entrar</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="cadastro.html">Cadastre-se</a></li>
                </ul>
            </li>
        `;
    }
}

// Função para login (usada na página de login)
function fazerLogin(email, senha) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    
    if (usuario) {
        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        return true;
    }
    return false;
}