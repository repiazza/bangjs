Recriação e Atualização do jogo Bang! do Windows 95

- 2 (ou mais) jogadores - (PC ou Humanos)
- Turnos
- Angulação e Velocidade
- Terreno randomicamente gerado, diferença de altura e obstaculos
- movimento parabolico
- interaçao tiro terreno/obstaculos
- materiais (elementos)

Adicionais

- *velocidade adiconal (Vento?)


Motor Movimento tiro (lançamento obliquo)
  - Angulação * velocidade
  - S = So + vt
  - t = (S - SO) / v 
  - S = So + v * ((S - SO) / v)
Motor de geração randomica de terrenos
Game loop Motor de Turno + Interação I/O
Motor do Inimigo PC (maquina)

senoide com prms randomicos ( montanhas )
reta a partir do centro para bordas com comprimento randomico (local dos canhoes)

Efeitos
  - Troca de turno 
    fade out e fade in com "popup/cartao" central estiliza ?

Jogabilidade
  - Controles
    setas cima baixo (Angulação)
    while onkeypress spacebar (velocidade++)
    while onkeyup spacebar (shoot)


  
