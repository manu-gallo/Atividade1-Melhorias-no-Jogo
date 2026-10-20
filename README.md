# Atividade 1 — Melhorias no Jogo
## Jogo: Coletor de Moedas

**Aluna:** Manuela Gallo Baldessini  
**Curso:** Técnico em Desenvolvimento de Sistemas — SENAI  
**Linguagens:** HTML, CSS e JavaScript

## Objetivo
Modificar um jogo existente e aplicar variáveis, condicionais, operadores lógicos, eventos e detecção de colisões para melhorar a experiência de jogo.

## Melhorias implementadas
- Sistema de pontuação pela coleta de moedas.
- Sistema de cinco vidas e perda de vida ao tocar nos espinhos.
- Vida extra ao alcançar cinco pontos.
- Cronômetro de 45 segundos.
- Inimigos/obstáculos que se movimentam automaticamente.
- Três níveis de dificuldade, com velocidade maior conforme a pontuação.
- Condição de vitória ao coletar dez moedas.
- Condições de derrota quando as vidas ou o tempo acabam.
- Pausa e retomada com a tecla **P**.
- Botão para reiniciar a partida.
- Mensagens para colisões, pausa, vitória e derrota.
- Limites de movimentação para o jogador.

## Como executar
1. Baixe ou extraia a pasta do projeto.
2. Mantenha `index.html`, `style.css`, `script.js` e a pasta `imagens` juntos.
3. Abra `index.html` em um navegador (ou use a extensão Live Server no VS Code).
4. Use as setas do teclado para mover o jogador e pressione **P** para pausar/retomar.

## Conceitos utilizados
- Variáveis (`let` e `const`) para pontuação, vidas, tempo, nível e posições.
- `if`, `else` e operador ternário para tomar decisões.
- Operadores lógicos e comparação para verificar colisões e estados.
- `setInterval()` para cronômetro e movimento dos obstáculos.
- `Math.random()` para posicionar a moeda.
- Eventos `keydown` e `click`.
- Funções para separar responsabilidades e facilitar a manutenção.

## Testes recomendados
- Mover o personagem com as quatro setas e verificar os limites.
- Coletar moedas e conferir se a pontuação aumenta.
- Encostar nos espinhos e conferir a perda de vida.
- Chegar a cinco pontos e verificar a vida extra.
- Chegar a dez pontos e conferir a vitória.
- Esperar o cronômetro zerar ou perder todas as vidas para testar a derrota.
- Pressionar P para pausar e retomar.
- Usar o botão Reiniciar jogo para começar uma nova partida.

## Observação
Os efeitos sonoros não foram incluídos porque o projeto original não continha arquivos de áudio funcionais. O código e os caminhos das imagens foram organizados para funcionar localmente.
