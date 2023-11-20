function myDone(data) {
    console.log("Done");
    console.log(data);
    $("#follower-content").text(data.followerCount);
}
function onFail() {
    console.log("Fail");
}
function myCall() { 
    console.log("interval timer...");
    $.getJSON("http://localhost:3000/getFollowerCount").done(myDone).fail(onFail);
}
function myInit() {
    console.log("OK!");
    setInterval(myCall, 1000);  //chiama la funzione myCall ogni 1000ms
}
// Recupera il conteggio iniziale dei follower dal server
fetch('http://localhost:3000/getFollowerCount')
.then(response => {
    // Controlla se lo stato della risposta è ok (codice di stato HTTP 200-299)
    if (!response.ok) {
        // Handle non-ok responses
        if (response.status === 404) {
            // Genera un errore se l'endpoint non viene trovato
            throw new Error('Endpoint not found');
        } else {
            return response.text();
        }
    }
    //Se la risposta è ok, ritorna un JSON
    return response.json();
})
.catch(error => console.error(error));
$(document).ready(myInit);

document.addEventListener('DOMContentLoaded', function() {
    // Mostra il contenuto principale
    document.querySelector('.main-content').style.display = 'block';

    // Nascondi la pagina di caricamento
    document.querySelector('.loader-container').style.display = 'none';
});