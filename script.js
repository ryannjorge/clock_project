/* ==========================================================================
   1. PRIMEIRO ARQUIVO - RELÓGIO
   ========================================================================== */
function atualizarRelogio() {
  const agora = new Date();
  const horas = String(agora.getHours()).padStart(2, '0');
  const minutos = String(agora.getMinutes()).padStart(2, '0');
  const segundos = String(agora.getSeconds()).padStart(2, '0');
  
  const horarioFormatado = `${horas}:${minutos}:${segundos}`;
  
  const elementoRelogio = document.getElementById('clock');
  if (elementoRelogio) {
    elementoRelogio.textContent = horarioFormatado;
  }
}

atualizarRelogio();
setInterval(atualizarRelogio, 1000);


/* ==========================================================================
   2. SEGUNDO ARQUIVO - VERIFICAÇÃO DE IDADE (CORRIGIDO)
   ========================================================================== */
let botaoVerificar = document.getElementById("botaoVerificar");
let campoIdade = document.getElementById("idade");
let resultado = document.getElementById("resultado");

// Executa a função quando o botão é clicado
if (botaoVerificar && campoIdade && resultado) {

    botaoVerificar.addEventListener("click", function () {
        // Verifica se o campo está vazio
        if (campoIdade.value === "") {
            resultado.textContent = "Digite sua idade.";
            resultado.style.color = document.body.classList.contains('dark') ? "#f44336" : "#b83e38";
            return;
        }

        // Converte o valor digitado em número
        let idade = Number(campoIdade.value);

        // Verifica se a idade é um número válido
        if (!Number.isInteger(idade) || idade < 0) {
            resultado.textContent = "Digite uma idade válida em anos completos.";
            resultado.style.color = document.body.classList.contains('dark') ? "#f44336" : "#b83e38";
            return;
        }

        // Verifica a maioridade e altera a cor do texto dependendo do tema ativo
        if (idade >= 18) {
            resultado.textContent = "Entrada permitida. Bom evento!";
            resultado.style.color = document.body.classList.contains('dark') ? "#4caf50" : "#2e7d32";
        } else {
            resultado.textContent = "Entrada não permitida para menores de 18 anos.";
            resultado.style.color = document.body.classList.contains('dark') ? "#f44336" : "#b83e38";
        }
    });

    // CORREÇÃO AQUI: Agora usamos a variável 'campoIdade' que foi corretamente mapeada acima
    campoIdade.addEventListener('keypress', function(evento) {
        if (evento.key === 'Enter') {
            evento.preventDefault(); // Impede a página de recarregar
            botaoVerificar.click();  // Dispara o clique do botão verificar
        }
    });
}


/* ==========================================================================
   3. TERCEIRO ARQUIVO - TEMA ESCURO (DARK MODE)
   ========================================================================== */
let Tema = document.getElementById("botaoTema");
let corpo = document.body;

if (localStorage.getItem('botaoTema') === 'dark') {
  corpo.classList.add('dark');
}

if (Tema) {
  Tema.addEventListener('click', () => {
    corpo.classList.toggle('dark');
    
    // Atualiza a cor do resultado se ele já estiver na tela no momento do clique
    if (resultado && resultado.textContent !== "") {
        if (resultado.textContent.includes("permitida")) {
            resultado.style.color = corpo.classList.contains('dark') ? "#4caf50" : "#2e7d32";
        } else {
            resultado.style.color = corpo.classList.contains('dark') ? "#f44336" : "#b83e38";
        }
    }
    
    // Salva a preferência no navegador
    if (corpo.classList.contains('dark')) {
      localStorage.setItem('botaoTema', 'dark');
    } else {
      localStorage.setItem('botaoTema', 'light');
    }
  });
}
