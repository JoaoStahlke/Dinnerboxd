function loadSideBar(link) {
    fetch(link) // Carrega o conteúdo da barra de navegação do arquivo 'navbar.html'
    .then(response => response.text()) // Converte a resposta em texto
    .then(html => {
        // Insere o HTML da barra de navegação no elemento com id 'navbarContainer'
        document.getElementById('SideBarContainer').innerHTML = html;
        
        
    })
    .catch(error => console.error('Erro ao carregar a barra de lateral:', error));

}
loadSideBar("../HTML/sideBar.html");
