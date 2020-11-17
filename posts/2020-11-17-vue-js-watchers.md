---
title: Vue.js Watchers
description: Watchers em vue lhe permitem configurar reações toda vez que uma
  informação mudar.
date: 2020-11-17 06:44:48
image: assets/img/screenshot_1.png
category: vue
background: "#42b883"
---
Os watchers são recursos do Vue, similares ao evento onchange do JavaScript. Eles lhe permitem configurar uma ação a ser executada sempre que uma propriedade sofrer alteração.

Uma opção muito intuitiva, contudo deve ser usada com moderação e seu uso não deve ser exagerado, na maioria dos casos é preferível usar uma [computed prop](https://br.vuejs.org/v2/guide/computed.html).

## Quando não usar

Caso você precise apenas alterar uma propriedade sempre que outra sofrer alteração é preferível usar uma computed prop.

Exemplo, imagine que você precise mostrar o nome completo de um usuário em tela. Ou seja, seu código precisa reagir à mudanças tanto da propriedade nome, quanto da propriedade sobrenome. Logo, é preferível usar uma computed prop, ficando o codigo assim:

```javascript
<template>
  <form>
    <label for="nome">Nome:</label>
    <input type="text" v-model="nome">

    <label for="sobreNome">Sobrenome:</label>
    <input type="text" v-model="sobreNome">

    {{ nomeCompleto }}
  </form>
</template>

<script>
  export default {
    data() {
      return {
        nome: "",
        sobreNome: ""
      }
    },
    computed: {
      nomeCompleto() {
        return this.nome + this.sobreNome
      }
    },
  }
</script>
```

## Quando Usar

Costumo usar o watcher quando preciso escutar uma propriedade e alterar duas, ou quando preciso executar uma ação.

Imagine o seguinte cenário: você precisa emitir uma notificação toda vez que seu usuário atingir o limite de acessos a um serviço restrito para não assinantes. Sendo assim, é preciso observar o contador de acessos e dentre outras coisas, emitir uma notificação quando o limite for atingido.

Um exemplo de implementação seria:

```javascript
<template>
  <aside>
    <div>
      <p>Acessos:</p>
      <span> {{ acessos }} </span>
    </div>
  </aside>
</template>

<script>
  export default {
    data() {
      return {
        acessos: 0,
      };
    },
    watcher: {
      acessos() {
        new Notification("Aviso:", {
          body: "Você atingiu o limite máximo de acessos para não assinantes!",
        });
      },
    },
  };
</script>
```

Eai, gostou? Já usa ou pretende usar? Vale a pena ler um pouco mais a respeito: [Dados Computados e Observadores ](https://br.vuejs.org/v2/guide/computed.html)

<iframe src="https://giphy.com/embed/1kkxWqT5nvLXupUTwK" width="475" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>