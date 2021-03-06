---
title: 7 Dicas para aprender Vue.js
description: 7 dicas para ir do iniciante ao avançado no Vue.js
date: 2020-11-22 10:26:50
image: assets/img/vuejs.png
category: vue
background: "#42b883"
---
Uso o framework frontend Vue diariamente, seja para desenvolver aplicações desktop ou web. Há muitos motivos para isso: sua simplicidade, recursos poderosos e seu excelente desempenho.

Comecei achando Vue fácil e quanto mais aprendo, mais me impressiono com sua arquitetura e forma de lidar com as diferentes situações e problemas do desenvolvimento front-end.

As dicas a seguir podem lhe ajudar a entender melhor este excelente framework. 

# **1. Compreenda totalmente a reatividade**

## **Como funciona a reatividade**

Reatividade é um conceito simples em bibliotecas e estruturas de desenvolvimento frontend. No entanto, entender como isso funciona em um nível profundo pode ser difícil. Mas vale a pena dedicar um pouco do seu tempo.

Aqui está um pequeno exemplo:

```jsx
<h1> {{name}} </h1>
```

Quando o valor de `name` mudar, a interface será atualizada, ou seja, reagirá a mudança. Essa é uma maneira muito básica de explicar a reatividade, mas existem muitos exemplos mais avançados para ajudá-lo a entender como ela funciona.

## **Onde a reatividade dá errado**

As coisas podem dar errado se você estiver acessando uma propriedade dentro de um objeto, conforme explicado neste exemplo:

```javascript
<template>
  <div>
    <p>{{ myObject.message }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        myObject: {}
      }
    },
    mounted() {
      this.myObject.message = 'Hello';
    }
  };
</script>
```

No exemplo acima, definimos `myObject` como um objeto vazio no método de dados. Depois, atribuimos a `myObject.message` um valor.

Isso resulta em `{{ myObject.message }}` nunca exibir nada, embora receba um valor quando o componente é montado. Mas por que isso ocorre?

Isso ocorre basicamente porque o Vue não sabe da existência da propriedade `message` do objeto  `myObject` e, portanto, não pode reagir às mudanças em seu valor.

## **Como corrigir isso?**

Existem algumas maneiras de garantir que o Vue reaja às mudanças na propriedade `myObject.message`. O mais simples é inicializá-lo com um valor vazio ou nulo:

```jsx
meuObjeto: { 
  mensagem: '' 
}
```

Se `myObject.message` existir no método de dados, o Vue ouvirá e reagirá às mudanças em seu valor, atualizando a interface sempre que ocorrer uma mudança.

Outra maneira de garantir a reatividade é atualizar o objeto `myObject` completamente, desta forma:

```jsx
this.myObject = {mensagem: 'Olá'}
```

Uma vez que o Vue ouve e reage às mudanças em `myObject`, ele vai pegar essa mudança e atualizar a interface da forma esperada.

Resumindo, o Vue não ouve mudanças de propriedade em um objeto, a menos que conheça essas propriedades. As propriedades precisam ser definidas no método `data` ou então atualizar o objeto inteiro em vez das propriedades para garantir que o Vue rastreie as alterações.

Saiba mais sobre reatividade lendo a seção “[Reatividade em profundidade](https://br.vuejs.org/v2/guide/reactivity.html)” na documentação oficial do Vuejs.

Ao compreender bem a reatividade, você pode:

* Resolver cenários de depuração em que a interface não é atualizada da forma esperada.
* Identificar quando as visualizações são atualizadas e renderizadas novamente.
* Entender como as propriedades computadas são calculadas.
* Medir o custo dos valores reativos que requerem algum esforço da CPU para cálculos (por exemplo, condições de formulário).

# **2. Comunicação entre pais e filhos**

Uma dúvida que eu tinha o tempo todo quando comecei era como passar os dados de um componente filho para um componente pai. Ou como posso ter certeza de que um componente filho é atualizado quando algo muda no componente pai?

Essas questões se relacionam em como os componentes devem se comunicar uns com os outros. A maneira mais básica de fazer isso é usar propriedades (props). As props transmitem dados de pai para filho. Eles são imutáveis e podem ser de vários tipos, como strings, booleanos, matrizes, etc.

```jsx
<component: message = "myObject.message" />
```

As props formam um fluxo de dados unilateral. Sempre que o `myObject.message` mudar no componente pai, a props `message` será atualizada. Mas o oposto *não* é *verdade*.

Você não deve alterar o valor de uma props em componentes filhos, pois elas são imutáveis. Atualizá-las causará um aviso no console e não acionará uma atualização no componente pai.

Então, se as props servem para passar informações apenas do componente pai para o filho, como é possível passar do componente do filho para o pai? Para fazer isso, você precisa usar eventos. Mais especificamente, será necessário emitir um evento.

Você pode usar `$emit` para emitir valores ou eventos de componentes filhos para componentes pais. Você pode ouvir os eventos dos componentes pai usando `v-on:`ou `@`junto com o nome do evento ( `@button-clicked` neste caso). Com `$emit`, você pode passar um ou mais valores e eles podem ser de qualquer tipo.

Saiba mais sobre como passar eventos na seção “[Manipulação de Eventos](https://br.vuejs.org/v2/guide/events.html)” na documentação oficial do Vuejs.

# **3. Gargalos de desempenho**

Aplicações lentas são um grande problema. E nosso trabalho como desenvolvedores de software é garantir que nossos aplicativos funcionem sem problemas. É fácil cair em certas armadilhas ao escrever aplicativos Vue, então, para ir do iniciante ao avançado, você precisará entendê-las bem e ser capaz de lidar com elas.

## **Perdas de memória**

Vazamentos de memória são um problema comum de desempenho em aplicações web. Mesmo que o próprio Vue não cause vazamentos de memória sem motivo, isso pode acontecer incorporando bibliotecas de terceiros ou escrevendo código de forma errada. É especialmente importante evitar vazamentos de memória ao criar aplicações de página única, as chamadas em inglês: Single Page Aplication (SPAs) porque, por design, os usuários não atualizam seu navegador e o aplicativo tem que fazer toda a coleta de lixo.

Sem entrar em muitos detalhes, Vue tem um guia oficial sobre como [evitar vazamentos de memória](https://br.vuejs.org/v2/cookbook/avoiding-memory-leaks.html). Se você é um desenvolvedor que está tentando dominar o Vue, sugiro que leia.

## **Custos de renderização**

Bibliotecas e estruturas de frontend como React e Vue estão nos tornando “preguiçosos”. Não vemos exatamente o que está acontecendo quando se trata de renderização. Apenas usamos um `v-for` e esperamos que as coisas funcionem. E isso é ótimo - uma coisa a menos para se preocupar!

O problema é que é difícil entender quanto “custa” a renderização. Existem muitas maneiras inesperadas pelas quais um aplicativo Vue pode ter altos custos de renderização:

* Muitos elementos DOM estão sendo produzidos.
* A página está sendo atualizada com muita frequência.
* Componentes de terceiros são usados e precisam de muito tempo para serem renderizados.

Existem muitos cenários possíveis em que seu aplicativo tem altos custos de renderização e, como resultado, seus usuários terão atrasos.

## **Otimize o tratamento de eventos**

Isso é mais com o JavaScript do que especificamente com o Vue, mas é importante observar de qualquer maneira. Existem certos eventos que podem ser disparados com muita frequência. Se você adicionar um evento para ouvir a rolagem ou um evento `@mouseover`, o manipulador de eventos pode ser chamado muitas vezes.

Se o manipulador de eventos não estiver sendo muito utilizado, pode não ser um problema. Mas se o seu manipulador de eventos faz muitos cálculos e leva tempo para ser executado, ele pode causar sérias lentidões em seu aplicativo. A razão pela qual isso acontece é que a rolagem, o mouseover e outros eventos podem acionar o manipulador de eventos dezenas de vezes a cada segundo.

A solução para isso é usar uma função `throttle` ou `debounce` em seu manipulador de eventos, o que limita o número de vezes que seu manipulador de eventos é ativado. [Lodash](http://lodash.com/) inclui ambas as funções e fornece uma maneira fácil de usá-las. Eu sugiro experimentar.

Saber sobre isso o ajudará a escrever melhor JavaScript para o navegador em geral, mas como é um problema que pode ocorrer facilmente no Vue, é importante aprender sobre ele durante sua jornada para o domínio do Vue.

# **4. Aprenda o ecossistema Vue**

Para se tornar avançado no desenvolvimento do Vue, você terá que aprender sobre os pacotes e componentes que compõem o ecossistema do Vue. A maioria das aplicações web exigirá pelo menos um dos seguintes, mas para dominar a estrutura, acredito que você deve se familiarizar com todos os três.

## **Vuex**

A maioria dos aplicativos front-end modernos, especialmente SPAs, depende de algum tipo de gerenciamento de estado. [Vuex](https://vuex.vuejs.org/ptbr/) é a biblioteca oficial de gerenciamento de estado para aplicações em Vue e se integra bem com as ferramentas de desenvolvimento oficiais do Vue.

Ele serve como um armazenamento centralizado que todos os componentes podem acessar para buscar ou modificar os dados globais do aplicativo. Os componentes podem e devem ter dados locais, mas usar o gerenciamento de estado é fundamental para as aplicações, pois eles se tornam mais complexos e vários componentes dependem dos mesmos dados globais.

## **Vue Router**

Usar o Vue sem o [Vue Router](https://bt.router.vuejs.org/) pode ser raro. O aprendizado `vue-router` é fundamental para a criação de SPAs, e os SPAs são o caminho a percorrer para a maioria das aplicações web modernas.

## **Vue SSR (Server Side Render)**

Para realmente se sobressair, você deve aprender SSR(Server Side Render), usando a [biblioteca Vue](https://ssr.vuejs.org/) oficial ou aprendendo [Nuxt.js](https://nuxtjs.org/). A necessidade de renderização do lado do servidor geralmente surge: quando o desempenho da aplicação começa a cair; quando você não pode contar com o dispositivo do usuário para lidar com a renderização, ou quando é necessário otimizar o SEO. Nesses casos, é preferível fazer a renderização no lado do servidor, o que ajuda a otimizar o tempo até o conteúdo - especialmente em dispositivos lentos ou Internet lenta - e também é útil por motivos de SEO.

Uma vez que a maioria dos trabalhos e projetos exigirá pelo menos dois dos três acima, acredito que aprendê-los é um pré-requisito para os desenvolvedores do Vue.

# **5. Use os componentes da maneira certa**

Uma das coisas que pode errado com os desenvolvedores Vue é como eles estruturam os componentes. Muitas vezes, as aplicações em Vue contêm apenas um ou alguns mega-componentes que fazem todo o trabalho. Obviamente, essa não é a maneira certa de estruturar seus componentes.

Quanto mais experiente você se tornar, mais perceberá a importância de estruturar sua aplicação em componentes menores, onde cada um faz bem uma (ou algumas) coisas. Existem muitos motivos pelos quais o uso de componentes menores ajuda seu aplicativo:

* Você pode reutilizar pequenos componentes em toda a sua aplicação.
* Seu código ficará mais limpo e organizado.
* O Vue pode renderizar componentes filhos com mais eficiência em um loop `v-for`.

Se você tiver uma entrevista com Vue e lhe pedirem para fazer um projeto teste, entregar um aplicativo bem organizado certamente impressionará seus entrevistadores!

# **6. Faça do Mixins seus melhores amigos**

Mixins ajudam muito na hora de desenvolver em Vue. Eles permitem que você:

* Reutilize o código em todo o seu projeto.
* Escreva o código apenas uma vez (princípio DRY).
* Refatore e mantenha seu código mais facilmente organizado.

Mixins oferecem muita liberdade e você pode usá-los como quiser. Por exemplo, você pode ter um grupo de componentes com recursos semelhantes. Então você pode querer criar um mixin que inclui todos os recursos comuns, componentes e propriedades computadas, ou você pode ter certas ações, filtros ou condições que são muito usados em todo o seu aplicativo .Nestes casos ao invés de ficar repetindo, você pode criar um pequeno mixin e incluí-lo onde for preciso.

As possibilidades são infinitas, mas a lição é clara: você precisa começar a usar [mixins](https://br.vuejs.org/v2/guide/mixins.html) para se tornar um desenvolvedor Vue avançado.

# **7. Aprenda as Diretivas Avançadas**

Além de `v-for`, `v-if` e outras diretrizes comuns, Vue tem algumas diretivas que são menos usadas, mas ainda muito úteis e vale a pena conhecer.

## **v-once**

Você pode usar `v-once` para gerar um valor uma vez e torná-lo não reativo. Isso significa que nas alterações subsequentes, o valor não será renderizado novamente. Isso pode ajudá-lo a otimizar o desempenho em determinados cenários:

```javascript
<span v-once> {{name}} </span>
```

## **Modificadores de diretiva de evento**

Para diretiva `v-on` que serve para manipular eventos, existem alguns modificadores muito úteis que você pode usar. Um deles é o `@click.prevent`, que chama automaticamente `preventDefault()` no evento de clique.

```javascript
<a href="#" @click.prevent="processClick"> Clique aqui </a>
```

Você pode ver uma [lista completa de modificadores de eventos](https://br.vuejs.org/v2/guide/events.html#Event-Modifiers) na documentação.

## **Diretivas personalizadas**

O Vue permite que você registre suas próprias diretivas personalizadas, conforme explicado na [documentação](https://br.vuejs.org/v2/guide/custom-directive.html) . Se você estiver replicando o mesmo comportamento várias vezes em todo o seu aplicativo, pode fazer sentido criar uma diretiva personalizada que possa ser reutilizada.

Além disso, muitos pacotes de terceiros apresentarão suas próprias diretivas personalizadas que você pode usar.

A chave quando se trata de diretivas personalizadas é criá-las apenas quando necessário e evitar criar diretivas personalizadas que são usadas apenas uma ou duas vezes.

# **Continue praticando**

Você pode começar lendo mais sobre todos os conceitos que descrevi ou pode ler uma seção da documentação oficial. Leia, aprenda e certifique-se de colocar em prática.

> Mesmo que você dê apenas um pequeno passo em direção ao domínio do Vue hoje, pode chegar muito longe dando pequenos passos todos os dias.

<iframe src="https://giphy.com/embed/bAplZhiLAsNnG" width="480" height="288" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>