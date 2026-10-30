# PixelCraft --- Jogo 2D de sobrevivência no navegador

PixelCraft é um jogo 2D em estilo pixel art, executado diretamente no
navegador e inspirado em jogos de exploração, coleta de recursos e
criação de itens, como Minecraft. O projeto é desenvolvido com **HTML,
CSS/SCSS e JavaScript**, sem engine de jogos.

> **Status:** projeto em desenvolvimento. Algumas mecânicas e receitas
> podem estar incompletas ou mudar conforme o desenvolvimento continua.

## 🎮 Funcionalidades

-   **Mapa gerado proceduralmente:** árvores, grama, pedras e minérios
    são distribuídos aleatoriamente.
-   **Movimentação em quatro direções:** o jogador explora o mapa usando
    o teclado.
-   **Colisões:** árvores, pedras e entidades podem bloquear o
    movimento.
-   **Recursos coletáveis:** é possível interagir com elementos do
    cenário para obter materiais.
-   **Mineração e ferramentas:** há diferentes tipos de minérios e
    ferramentas, como picaretas e machados, com valores de eficiência
    definidos no código.
-   **Inventário e barra rápida (hotbar):** itens e quantidades podem
    ser organizados entre espaços.
-   **Sistema de crafting:** receitas permitem combinar materiais para
    produzir itens e ferramentas.
-   **Mesa de criação:** o projeto possui áreas de crafting 2×2 e 3×3.
-   **Vida e fome:** a interface apresenta indicadores para esses
    atributos.
-   **Porcos com movimentação automática:** as entidades se movimentam
    pelo mapa e podem ser atacadas para obter carne.
-   **Sprites em pixel art:** personagens, recursos e itens são montados
    com elementos HTML e classes CSS.

## 🕹️ Controles

  -----------------------------------------------------------------------
  Tecla                               Ação
  ----------------------------------- -----------------------------------
  `W`                                 Mover para cima

  `A`                                 Mover para a esquerda

  `S`                                 Mover para baixo

  `D`                                 Mover para a direita

  `1` a `8`                           Selecionar um espaço da hotbar

  `E`                                 Interagir com entidades próximas,
                                      como porcos

  `F`                                 Abrir ou fechar a mesa de criação
                                      quando o item correspondente
                                      estiver selecionado
  -----------------------------------------------------------------------

O funcionamento de algumas interações depende do item selecionado e do
estado atual do jogo.

## 🚀 Como executar

O projeto usa **módulos JavaScript** (`type="module"`). Por isso, é
recomendado executá-lo por meio de um servidor HTTP local, em vez de
abrir o `index.html` diretamente com `file://`.

### Opção 1 --- Visual Studio Code

1.  Extraia os arquivos do projeto.
2.  Abra a pasta `jogo-main` no Visual Studio Code.
3.  Inicie um servidor local usando uma extensão como **Live Server**.
4.  Abra no navegador o endereço local fornecido pela extensão.

### Opção 2 --- Python

Se você tem Python instalado:

1.  Abra o terminal na pasta `jogo-main`.

2.  Execute:

    ``` bash
    python -m http.server 8000
    ```

3.  Acesse <http://localhost:8000> no navegador.

Para encerrar o servidor, pressione `Ctrl+C` no terminal.

## 🧰 Tecnologias utilizadas

-   **HTML5** --- estrutura da página e elementos da interface.
-   **CSS3 / SCSS** --- aparência, layout e estilos dos pixels,
    personagens, itens e HUD.
-   **JavaScript (ES Modules)** --- lógica do jogo, movimentação,
    geração do mapa, interações, inventário e crafting.
-   **DOM API** --- criação e atualização dos elementos do mundo e dos
    sprites.

Não há um `package.json` no pacote analisado; o projeto inclui CSS
compilado para o navegador, então não é necessário instalar dependências
Node.js para executá-lo da forma descrita.

## 📁 Estrutura do projeto

``` text
jogo-main/
├── index.html
├── css/
│   ├── index.scss
│   ├── index.css
│   ├── cores/
│   ├── player/
│   ├── entidade/
│   ├── arvore/
│   ├── pedra/
│   ├── grama/
│   ├── hud/
│   ├── desktop/
│   └── itens/
└── js/
    ├── script.js
    ├── utils.js
    ├── player/
    ├── coordenadas/
    ├── arvore/
    ├── pedra/
    ├── grama/
    ├── entidades/
    ├── interacao/
    ├── desktop/
    └── itens/
```

### Responsabilidade dos principais módulos

-   `js/script.js`: inicializa os módulos principais e centraliza a
    posição inicial da câmera.
-   `js/player/`: sprite, movimentação e estado do jogador.
-   `js/coordenadas/posicoes.js`: gera e posiciona os elementos do mapa.
-   `js/arvore/`, `js/pedra/` e `js/grama/`: criação e aparência dos
    recursos do cenário.
-   `js/entidades/`: entidades móveis, incluindo o porco.
-   `js/interacao/`: ações de interação com elementos do mundo.
-   `js/desktop/`: inventário, hotbar, mesas de crafting e receitas.
-   `js/itens/`: sprites e referências visuais dos itens.
-   `js/utils.js`: funções utilitárias compartilhadas, incluindo a
    atualização de sprites.
-   `css/`: estilos organizados por componente; os arquivos SCSS são a
    fonte organizada dos estilos e `css/index.css` é usado pela página.

## 🌍 Geração do mapa

O mapa tem dimensões definidas no código de **2500 × 1800 pixels**. A
posição dos recursos é sorteada, respeitando margens, distâncias mínimas
entre elementos e uma área protegida ao redor do ponto inicial.

A quantidade de árvores e grama varia aleatoriamente. Pedras e minérios
são distribuídos em categorias com proporções definidas no módulo de
geração do mapa. Como a geração é aleatória, a disposição do cenário
pode mudar a cada carregamento.

## 🛠️ Crafting e recursos

O código contém receitas para criar itens a partir de materiais
coletados. Entre as categorias implementadas estão:

-   Madeira bruta e madeira refinada;
-   Gravetos;
-   Picaretas e machados de diferentes materiais;
-   Itens relacionados à mineração;
-   Mesa de criação e outros itens de suporte.

Consulte `js/desktop/crafts.js` para ver as receitas definidas
atualmente. As receitas podem ser ajustadas durante o desenvolvimento.

## 📌 Observações

-   Este projeto é uma experiência independente inspirada em mecânicas
    de jogos de exploração e crafting.
-   Minecraft é uma referência de gênero e inspiração; este projeto não
    é um produto oficial da Mojang ou da Microsoft.
-   O projeto está em desenvolvimento e pode conter bugs, mecânicas
    incompletas ou receitas que precisem de ajustes.

## 📄 Licença

Nenhuma licença específica foi identificada nos arquivos fornecidos. Se
o projeto for publicado, defina uma licença antes de permitir
formalmente reutilização, modificação ou distribuição.
