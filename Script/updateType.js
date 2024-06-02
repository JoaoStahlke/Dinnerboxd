function updateType() {
    var form = document.getElementById('changeType');
    var restaurantCategory = form.restaurantCategory.value;
    var restaurantModality = form.restaurantModality.value;

    var formData = new FormData();
    formData.append('restaurantCategory', restaurantCategory);
    formData.append('restaurantModality', restaurantModality);


    fetch('../PHP/typeApi.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector(".sucess").innerHTML="Tipo atualizado com sucesso!";
        wichNavBar();
    
    })
    .catch(error => console.error('Erro no update:', error));
}

function loadSelectTypes(){
    fetch(`../PHP/typeApi.php?loadModality=${true}`)
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            document.querySelector("#restaurantModality").innerHTML += `<option value="${element.modalityId}">${element.modality}</option>`;
        });
        
    })
    .catch(error => {
        setTimeout(() => {
            loadSelectTypes()
        }, 10000)
        });
    fetch(`../PHP/typeApi.php?loadCategory=${true}`)
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            document.querySelector("#restaurantCategory").innerHTML += `<option value="${element.categoryId}">${element.category}</option>`;
        });
        
    })
    .catch(error => {
        setTimeout(() => {
            loadSelectTypes()
        }, 10000)
        });
        
}loadSelectTypes();