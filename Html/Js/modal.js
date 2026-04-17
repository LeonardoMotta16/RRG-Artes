function openModal(imagem){
    document.getElementById("modal").style.display = "flex"
    document.getElementById("modal-imagem").src = imagem.src
}
function closeModal(){
    document.getElementById("modal").style.display = "none"
}
document.addEventListener("keydown", function(event){
    if (event.key === "Escape"){
        closeModal()
    }
})