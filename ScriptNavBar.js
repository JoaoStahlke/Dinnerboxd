function loadNavbar() {
    fetch("NavBar.html") // Carrega o conteúdo da barra de navegação do arquivo 'navbar.html'
    .then(response => response.text()) // Converte a resposta em texto
    .then(html => {
        // Insere o HTML da barra de navegação no elemento com id 'navbarContainer'
        document.getElementById('NavBarContainer').innerHTML = html;
    })
    .catch(error => console.error('Erro ao carregar a barra de navegação:', error));
}

// Chama a função para carregar a barra de navegação quando a página é carregada
window.onload = loadNavbar;
