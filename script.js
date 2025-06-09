
const form = document.getElementById('consentForm');
const acompanantesDiv = document.getElementById('acompanantes');
const mensajeDiv = document.getElementById('mensaje');

function agregarAcompanante() {
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Nombre y documento del acompañante';
  input.classList.add('form-group');
  acompanantesDiv.appendChild(input);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    responsableNombre: form.responsableNombre.value,
    responsableDocumento: form.responsableDocumento.value,
    telefono: form.telefono.value,
    email: form.email.value,
    acompanantes: Array.from(acompanantesDiv.querySelectorAll('input')).map(i => i.value).filter(v => v.trim() !== "")
  };

  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbwvjJikQLxYANO4Cdb4eQGj9FOUAiCPClWimA24829Rtjzg2B6yPVxuWpoAL9HSa2fi/exec", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    if (res.ok) {
      mensajeDiv.textContent = "Formulario enviado correctamente ✅";
      form.reset();
      acompanantesDiv.innerHTML = "";
    } else {
      mensajeDiv.textContent = "Error al enviar el formulario ❌";
    }
  } catch (err) {
    mensajeDiv.textContent = "No se pudo conectar al servidor ❌";
  }
});
