// Atividade 1 - Melhorias no Jogo | Coletor de Moedas
// Melhorias: vidas, colisões, cronômetro, níveis, pausa, vitória e reinício.

const jogador = document.getElementById("jogador");
const moeda = document.getElementById("moeda");
const painelPontos = document.getElementById("pontuacao");
const painelVida = document.getElementById("valorVida");
const painelTempo = document.getElementById("tempo");
const painelNivel = document.getElementById("nivel");
const mensagemColisao = document.getElementById("mensagemColisao");
const mensagemCentral = document.getElementById("mensagemCentral");
const botaoReiniciar = document.getElementById("reiniciar");
const obstaculos = [1, 2, 3, 4, 5].map(n => document.getElementById(`obstaculo${n}`));

const LARGURA = 600;
const ALTURA = 500;
const TAM_JOGADOR = 40;
const TAM_OBSTACULO = 35;
const TAM_MOEDA = 30;

let pontuacao, vida, tempo, nivel, posX, posY, jogoAtivo, pausado;
let vidasExtras, podePerderVida, intervaloTempo, intervaloMovimento;
let obstaculosEstado = [];

function iniciarJogo() {
  clearInterval(intervaloTempo);
  clearInterval(intervaloMovimento);
  pontuacao = 0;
  vida = 5;
  tempo = 45;
  nivel = 1;
  posX = 280;
  posY = 180;
  jogoAtivo = true;
  pausado = false;
  vidasExtras = 0;
  podePerderVida = true;
  obstaculosEstado = [
    { x: 100, y: 80, vx: 3, vy: 0 },
    { x: 400, y: 200, vx: 0, vy: 2 },
    { x: 500, y: 120, vx: -4, vy: 0 },
    { x: 180, y: 320, vx: 3, vy: 0 },
    { x: 400, y: 350, vx: 0, vy: -2 }
  ];
  jogador.style.left = posX + "px";
  jogador.style.top = posY + "px";
  mensagemCentral.style.display = "none";
  mensagemColisao.textContent = "";
  novaMoeda();
  atualizarPainel();
  desenharObstaculos();
  intervaloTempo = setInterval(() => {
    if (!jogoAtivo || pausado) return;
    tempo--;
    atualizarPainel();
    if (tempo <= 0) finalizarJogo("⏰ TEMPO ESGOTADO!");
  }, 1000);
  intervaloMovimento = setInterval(moverObstaculos, 20);
}

function atualizarPainel() {
  painelPontos.textContent = pontuacao;
  painelVida.textContent = vida;
  painelTempo.textContent = tempo;
  painelNivel.textContent = nivel;
}

function mostrarMensagem(texto) {
  mensagemCentral.textContent = texto;
  mensagemCentral.style.display = "block";
}

function novaMoeda() {
  // Evita colocar a moeda muito perto das bordas.
  moeda.style.left = Math.floor(Math.random() * (LARGURA - TAM_MOEDA)) + "px";
  moeda.style.top = Math.floor(Math.random() * (ALTURA - TAM_MOEDA)) + "px";
}

function desenharObstaculos() {
  obstaculos.forEach((elemento, i) => {
    elemento.style.left = obstaculosEstado[i].x + "px";
    elemento.style.top = obstaculosEstado[i].y + "px";
  });
}

function moverObstaculos() {
  if (!jogoAtivo || pausado) return;
  obstaculosEstado.forEach((o, i) => {
    // O nível aumenta a velocidade dos inimigos.
    const velocidadeNivel = (nivel - 1) * 0.8;
    o.x += o.vx === 0 ? 0 : Math.sign(o.vx) * (Math.abs(o.vx) + velocidadeNivel);
    o.y += o.vy === 0 ? 0 : Math.sign(o.vy) * (Math.abs(o.vy) + velocidadeNivel);
    if (o.x <= 0 || o.x >= LARGURA - TAM_OBSTACULO) o.vx *= -1;
    if (o.y <= 0 || o.y >= ALTURA - TAM_OBSTACULO) o.vy *= -1;
    o.x = Math.max(0, Math.min(LARGURA - TAM_OBSTACULO, o.x));
    o.y = Math.max(0, Math.min(ALTURA - TAM_OBSTACULO, o.y));
    obstaculos[i].style.left = o.x + "px";
    obstaculos[i].style.top = o.y + "px";
  });
  verificarColisoesObstaculos();
}

function colidiu(a, b, larguraA, alturaA, larguraB, alturaB) {
  return a.offsetLeft < b.offsetLeft + larguraB &&
    a.offsetLeft + larguraA > b.offsetLeft &&
    a.offsetTop < b.offsetTop + alturaB &&
    a.offsetTop + alturaA > b.offsetTop;
}

function verificarColisaoMoeda() {
  if (!jogoAtivo || pausado || !colidiu(jogador, moeda, TAM_JOGADOR, TAM_JOGADOR, TAM_MOEDA, TAM_MOEDA)) return;
  pontuacao++;
  mensagemColisao.textContent = "🪙 Moeda coletada!";
  if (pontuacao >= 5 && vidasExtras < 1) {
    vida++;
    vidasExtras++;
    mensagemColisao.textContent = "🪙 Moeda coletada! Você ganhou uma vida extra!";
  }
  if (pontuacao >= 10) {
    atualizarPainel();
    finalizarJogo("🏆 VOCÊ VENCEU!");
    return;
  }
  nivel = pontuacao >= 7 ? 3 : pontuacao >= 3 ? 2 : 1;
  atualizarPainel();
  novaMoeda();
  setTimeout(() => { if (mensagemColisao.textContent.includes("Moeda")) mensagemColisao.textContent = ""; }, 900);
}

function verificarColisoesObstaculos() {
  if (!jogoAtivo || pausado || !podePerderVida) return;
  const bateu = obstaculos.some(o => colidiu(jogador, o, TAM_JOGADOR, TAM_JOGADOR, TAM_OBSTACULO, TAM_OBSTACULO));
  if (!bateu) return;
  vida--;
  podePerderVida = false;
  mensagemColisao.textContent = "⚠️ Você bateu em um espinho!";
  atualizarPainel();
  setTimeout(() => { podePerderVida = true; }, 1000);
  setTimeout(() => { mensagemColisao.textContent = ""; }, 1000);
  if (vida <= 0) finalizarJogo("💀 FIM DE JOGO!");
}

function finalizarJogo(texto) {
  if (!jogoAtivo) return;
  jogoAtivo = false;
  clearInterval(intervaloTempo);
  mostrarMensagem(texto + " Pontuação: " + pontuacao);
}

document.addEventListener("keydown", event => {
  if (event.key.toLowerCase() === "p" && jogoAtivo) {
    pausado = !pausado;
    mostrarMensagem(pausado ? "⏸ JOGO PAUSADO — pressione P para continuar" : "");
    if (!pausado) mensagemCentral.style.display = "none";
    return;
  }
  if (!jogoAtivo || pausado) return;
  const tecla = event.key;
  if (!["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(tecla)) return;
  event.preventDefault();
  if (tecla === "ArrowRight") posX += 20;
  if (tecla === "ArrowLeft") posX -= 20;
  if (tecla === "ArrowUp") posY -= 20;
  if (tecla === "ArrowDown") posY += 20;
  posX = Math.max(0, Math.min(LARGURA - TAM_JOGADOR, posX));
  posY = Math.max(0, Math.min(ALTURA - TAM_JOGADOR, posY));
  jogador.style.left = posX + "px";
  jogador.style.top = posY + "px";
  verificarColisaoMoeda();
  verificarColisoesObstaculos();
});

botaoReiniciar.addEventListener("click", iniciarJogo);
iniciarJogo();
