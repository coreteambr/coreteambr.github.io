const modal = document.querySelector("#modal");
const form = document.querySelector("#form");
let alertDiv = document.querySelector("#alert");

// Modal

document.querySelector("#show-modal").onclick = function() {
  modal.style.display = "block";
}

document.querySelector("#hide-modal").onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function changeModalContent() {
  const title = document.querySelector("#modal-title");
  const body = document.querySelector("#modal-body");
  const footnote = document.querySelector("#modal-footnote");
  
  let p = document.createElement("p");
  p.classList.add("text-center");
  p.innerHTML = "Agradecemos o seu contato.";

  title.innerHTML = "Mensagem enviada!";
  body.innerHTML = "";
  body.prepend(p);
  footnote.innerHTML = "Todas as mensagens são respondidas por ordem de recebimento em até 3 dias úteis.";
}

// Phone Input

document.querySelector("#phone").oninput = function() {
  let phone = this.value.replace(/\D/g, "");

  if (phone.length < 3)
    phone = phone.replace(/^(\d+)/, "($1");
  else if (phone.length < 8)
    phone = phone.replace(/^(\d{2})(\d+)/, "($1) $2");
  else
    phone = phone.replace(/^(\d{2})(\d{5})(\d+)/g, "($1) $2-$3");

  this.value = phone;
}

// Form Submit

form.onsubmit = function(event) {
  event.preventDefault();

  const url = this.getAttribute("action");
  const method = this.getAttribute("method");
  const data = new FormData(form);
  
  sendRequest(url, method, data);
}

function toggleButton(button) {
  if (button.hasAttribute("disabled")) 
    button.removeAttribute("disabled");
  else
    button.setAttribute("disabled", "disabled");
}

// Alert message

function showAlert(style, message) {
  let p = document.createElement("p");

  alertDiv.innerHTML = "";
  p.classList.add("text-center");
  alertDiv.classList.add(`alert-${style}`);
  p.textContent = message;
  alertDiv.prepend(p);
  alertDiv.classList.remove("hidden");
}

// XMLHttpRequest (XHR)

function sendRequest(url, method, data) {
  const button = form.querySelector("button[type=submit]");
  const req = new XMLHttpRequest();

  toggleButton(button);
  showAlert("info", "Enviando mensagem...");

  req.open(method, url);
  req.send(data);

  req.onload = function() {
    if (req.status == 200) {
      changeModalContent()
      // console.log(req.response);
    } else {
      showAlert("error", `Erro ${req.status}: ${req.statusText}`);
    }
  }

  req.onloadend = function() {
    toggleButton(button);
  }

  req.onerror = function() {
    showAlert("error", "Ocorreu um erro desconhecido.");
  };
}

