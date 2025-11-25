const messageTextarea = document.getElementById('message');

messageTextarea.addEventListener("input", function (event) {
    const textarea = event.target;
    textarea.style.height = "auto";                  
    textarea.style.height = textarea.scrollHeight + "px";
});

function goToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}