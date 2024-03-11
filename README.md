Recriação e Atualização do jogo Bang! Bang! do Windows 95

- 2 (ou mais) jogadores - (PC ou Humanos)
- Turnos
- Angulação e Velocidade
- Terreno randomicamente gerado, diferença de altura e obstaculos
- Movimento balistico parabolico(lançamento obliquo)
- Interaçao tiro terreno/obstaculos
- Materiais(elementos)

Motor Movimento tiro:
  - Angulação * velocidade
  [https://www.preparaenem.com/upload/conteudo/images/trajet%C3%B3ria-lancamento-obliquo(1).jpg]
  - Movimento obliquo
  - S = So + vt :
    => t = (S - SO) / v 
    => S = So + v * ((S - SO) / v)
Game loop Motor de Turno + Interação I/O
Motor do Inimigo PC (maquina)

Efeitos:
  - Troca de turno 
    fade out e fade in com "popup/cartao" central estiliza ?

Jogabilidade:
  - Controles
    setas cima baixo (Angulação)
    while onkeypress spacebar (velocidade++)
    while onkeyup spacebar (shoot)

Geração de terreno:
 - Senoide com prms randomicos (montanhas)
 - Reta a partir do centro para bordas com comprimento randomico (local dos canhoes)
 - Dividir o canvas em celulas numeradas em indice
 - Dividir o canvas em celulas numeradas em indice
 - Armazenar na matriz o tipo do terreno por unidade
 - Deverá conter parte do "céu" e "Chão"
 - Deverá conter desníveis gerados "randomicamente"
 

Mecânica do terreno:
   TODO: Criar resistencias diferentes para terrenos e inclinacoes diferentes
 - Criar logica de desenho de deformação do terreno ao ser atingido baseado no angulo e velocidade da bala
 - Verificar posição do jogador em relação ao terreno após ser atingido

Adicionais:
  - Velocidade adicional (Vento?)