# SchwiBot

<div>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" height="28"/>
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" height="28"/>
  <img src="https://img.shields.io/badge/discord.js-5865F2?style=for-the-badge&logo=discord&logoColor=white" height="28"/>
</div>

<br/>

Bot de Discord inspirado em **Schwi (Shuvi) Dola**, a Ex-Machina de *No Game No Life: Zero*. Todas as respostas seguem a personalidade analítica e sincera da personagem — direta, levemente mecânica, e sempre tentando entender o coração humano.

---

## Funcionalidades

### 🎵 Música
Reprodução de áudio direto do YouTube com suporte a fila de reprodução.

| Comando | Descrição |
|---|---|
| `s!play <url>` | Toca uma música pelo link do YouTube. Se já houver algo tocando, adiciona à fila |
| `s!skip` | Pula para a próxima música da fila |
| `s!stop` | Para a música e limpa toda a fila de reprodução |
| `s!queue` | Exibe a fila de reprodução atual |

### 🐱 Neko
Imagens anime aleatórias via [Nekos API v4](https://nekosapi.com). As imagens são exibidas com a cor dominante da imagem como cor do embed.

| Comando | Descrição |
|---|---|
| `s!neko [tags...]` | Retorna uma imagem aleatória. Aceita aliases de tags ou nomes diretos |
| `s!nekotags` | Lista todas as tags disponíveis com seus aliases |

**Exemplos de uso:**
```
s!neko
s!neko -c -pu
s!neko catgirl purple_hair night
```

#### Aliases de tags disponíveis

| Alias | Tag | Alias | Tag |
|---|---|---|---|
| `-c` | `catgirl` | `-bk` | `black_hair` |
| `-g` | `girl` | `-bl` | `blonde_hair` |
| `-b` | `boy` | `-bu` | `blue_hair` |
| `-ke` | `kemonomimi` | `-br` | `brown_hair` |
| `-us` | `usagimimi` | `-pk` | `pink_hair` |
| `-yr` | `yuri` | `-pu` | `purple_hair` |
| `-bi` | `bikini` | `-wh` | `white_hair` |
| `-su` | `school_uniform` | `-be` | `beach` |
| `-ma` | `maid` | `-ni` | `night` |
| `-dr` | `dress` | `-sn` | `sunny` |
| `-sk` | `skirt` | `-lb` | `large_breasts` |
| `-sh` | `shorts` | `-mb` | `medium_breasts` |
| `-gl` | `gloves` | `-sb` | `small_breasts` |
| `-sw` | `sword` | `-fc` | `flat_chest` |
| `-wp` | `weapon` | `-pl` | `plants` |
| `-gt` | `guitar` | `-fl` | `flowers` |
| `-we` | `wet` | `-tr` | `tree` |

### 🎲 Outros

| Comando | Descrição |
|---|---|
| `s!help` | Exibe todos os comandos disponíveis |
| `s!ping` | Exibe a latência do bot |
| `s!touch <@usuário>` | Toca no ombro de um usuário |
| `s!leftright` | Schwi analisa e escolhe: esquerda ou direita |

### 👋 Boas-vindas
Quando um novo membro entra no servidor, o bot envia uma mensagem de boas-vindas automaticamente no canal `#boas-vindas`.

---

## Estrutura do projeto

```
SchwiBot/
├── bot.js                  # Entry point: cliente Discord, eventos e inicialização
├── config.json             # Configurações (prefixo do bot)
├── .env                    # Token do bot (não commitado)
├── commands/
│   ├── handler.js          # Despachante de comandos
│   ├── help.js
│   ├── play.js
│   ├── skip.js
│   ├── stop.js
│   ├── queue.js
│   ├── ping.js
│   ├── touch.js
│   ├── leftright.js
│   ├── neko.js
│   └── nekotags.js
└── res/
    ├── embeds.js           # Todos os templates de embed do bot
    ├── nekoTags.js         # Mapa de aliases e categorias de tags neko
    └── utils.js            # Funções utilitárias (ex: formatação de tempo)
```

---

## Instalação

**Pré-requisitos:** Node.js 16+, FFmpeg (incluído via `ffmpeg-static`)

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/SchwiBot.git
cd SchwiBot

# 2. Instale as dependências
npm install

# 3. Configure o token
# Crie um arquivo .env na raiz com:
TOKEN=seu_token_aqui

# 4. Inicie o bot
node bot.js
```

### config.json

```json
{
  "prefix": "s!"
}
```

---

## Dependências

| Pacote | Função |
|---|---|
| `discord.js` v12 | Biblioteca principal do Discord |
| `@discordjs/opus` | Encoding de áudio para voz |
| `@distube/ytdl-core` | Download de áudio do YouTube |
| `ffmpeg-static` | Processamento de áudio |
| `dotenv` | Carregamento de variáveis de ambiente |

---

## Personalidade

Schwi é uma Ex-Machina — uma raça de máquinas de *No Game No Life: Zero*. Suas respostas são analíticas e diretas, com um tom sincero de quem está aprendendo a entender as emoções humanas. Todos os textos do bot refletem essa personalidade.

> *"Schwi ainda está tentando entender o coração humano."*
