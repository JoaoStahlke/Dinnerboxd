
function updateOpenHour(){
    var hours = document.getElementsByClassName("hours");
    var mins = document.getElementsByClassName("mins");
    var formData = new FormData();
    
    formData.append('open1', hours[0].value.toString() +mins[0].value.toString());
    formData.append('close1', hours[1].value.toString() +mins[1].value.toString());
    formData.append('open2', hours[2].value.toString() +mins[2].value.toString());
    formData.append('close2', hours[3].value.toString() +mins[3].value.toString());
    formData.append('open3', hours[4].value.toString() +mins[4].value.toString());
    formData.append('close3', hours[5].value.toString() +mins[5].value.toString());
    formData.append('open4', hours[6].value.toString() +mins[6].value.toString());
    formData.append('close4', hours[7].value.toString() +mins[7].value.toString());
    formData.append('open5', hours[8].value.toString() +mins[8].value.toString());
    formData.append('close5', hours[9].value.toString() +mins[9].value.toString());
    formData.append('open6', hours[10].value.toString() +mins[10].value.toString());
    formData.append('close6', hours[11].value.toString() +mins[11].value.toString());
    formData.append('open7', hours[12].value.toString() +mins[12].value.toString());
    formData.append('close7', hours[13].value.toString() +mins[13].value.toString());

    fetch('../PHP/openHourApi.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector(".sucess").innerHTML="Horário de funcionamento alterado com sucesso!";
    })
    .catch(error => {
        console.log("erro");
    }
        
        );
}


function loadSelectionValues(){
    var hours = document.getElementsByClassName("hours");
    var mins = document.getElementsByClassName("mins");
    for (let i = 0; i <= 23; i++) {
        [...hours].forEach(element => {
            element.innerHTML += `<option value="${i.toString().padStart(2, '0')}">${i.toString().padStart(2, '0')}</option>`;
        });    
      }
    for (let i = 0; i <= 55; i+=5) {
        [...mins].forEach(element => {
            element.innerHTML += `<option value="${i.toString().padStart(2, '0')}">${i.toString().padStart(2, '0')}</option>`;
        });    
      }
}
loadSelectionValues();