---
title: 7 Dicas para aprender Vue.js
description: 7 dicas para ir do iniciante ao avançado no Vue.js
date: 2020-11-22 10:26:50
image: assets/img/vuejs.png
category: vue
background: "#42b883"
---
Hoje o framework frontend, que uso para desenvolver aplicações desktop e web no trabalho é Vue.js. Há muitos motivos para isso: sua simplicidade, recursos poderosos e do excelente desempenho.

Comecei achando Vue fácil e quanto mais aprendo mas me impressiono com sua arquitetura e forma de lidar com as diferentes situações e problemas do desenvolvimento front-end.

As dicas a seguir podem lhe ajudar a entender melhor este exclente framework. 

# **1. Compreenda totalmente a reatividade**

## **Como funciona a reatividade**

Reatividade é um conceito simples em bibliotecas e estruturas de desenvolvimento frontend. No entanto, entender como isso funciona em um nível profundo pode ser difícil. Mas vale a pena dedicar um pouco do seu tempo.

Aqui está um pequeno exemplo:

```jsx
<h1> {{name}} </h1>
```

Quando o valor de `name `mudar, a interface será atualizada, ou seja, reagirá a mudança. Essa é uma maneira muito básica de explicar a reatividade, mas existem muitos exemplos mais avançados para ajudá-lo a entender como ela funciona.

## **Onde a reatividade dá errado**

As coisas podem dar errado se você estiver acessando uma propriedade dentro de um objeto, conforme explicado neste exemplo:

No exemplo acima, definimos `myObject`como um objeto vazio no método de dados. Depois, damos `myObject.message`um valor.

Isso resulta em `{{ myObject.message }}`nunca exibir nada, embora receba um valor em algum ponto. Por que é que?

Isso ocorre basicamente porque a Vue não sabe da existência do `myObject.message`imóvel e, portanto, não pode reagir às mudanças em seu valor.

## **Como faço para corrigir isso?**

Existem algumas maneiras de garantir que o Vue reaja às mudanças na `myObject.message`propriedade. O mais simples é inicializá-lo com um valor vazio ou nulo:

```jsx
meuObjeto: { 
  mensagem: '' 
}
```

Se `myObject.message`existir no método de dados, o Vue ouvirá e reagirá às mudanças em seu valor e atualizará a IU de acordo.

Outra maneira de garantir que a IU seja atualizada é atualizar o `myObject`objeto completo desta forma:

```jsx
this.myObject = {mensagem: 'Olá'}
```

Uma vez que o Vue ouve e reage às mudanças em `myObject`, ele vai pegar essa mudança e atualizar a IU de acordo.

Resumindo, o Vue não ouve mudanças de propriedade em um objeto, a menos que conheça essas propriedades. As propriedades precisam ser definidas no método de dados ou você precisa atualizar o objeto inteiro em vez das propriedades para garantir que o Vue rastreie as alterações.

Saiba mais sobre reatividade lendo a seção “ [Reatividade em profundidade](https://vuejs.org/v2/guide/reactivity.html) ” da documentação oficial.

Ao compreender bem a reatividade, você pode:

* Cenários de depuração em que a IU não é atualizada quando você espera.
* Identifique quando as visualizações são atualizadas e renderizadas novamente.
* Entenda como as propriedades computadas são calculadas.
* Meça o custo dos valores reativos que requerem algum esforço da CPU para cálculos (por exemplo, condições de formulário).

# **2. Comunicação ideal entre pais e filhos**

Uma dúvida que eu tinha o tempo todo como um novato era como passar os dados de um filho para um componente pai. Ou como posso ter certeza de que um componente filho é atualizado quando algo muda no componente pai?

Essas questões se relacionam a como os componentes devem se comunicar uns com os outros. A maneira mais básica de fazer isso é usar adereços. Os suportes transmitem dados de pai para filho. Eles são imutáveis e podem ser de vários tipos, como strings, booleanos, matrizes, etc.

```jsx
<component: message = "myObject.message" />
```

Os adereços formam um fluxo de dados unilateral, o que significa que sempre que houver `myObject.message`alterações no componente pai, o `message`prop será atualizado de acordo. O oposto *não* é *verdade* .

Você não deve alterar o valor dos acessórios em componentes filhos, pois eles são imutáveis. Atualizá-los causará um aviso Vue e não acionará uma atualização no componente pai.

Então, se os adereços “caem”, como você faz os valores “subirem”? Para fazer os valores subirem, você precisa usar eventos. Você pode facilmente lembrar disso observando o seguinte: Apoios para baixo, eventos para cima.

Você pode usar adereços para transmitir valores aos componentes filhos, como viu no exemplo anterior. Se você precisar passar valores de um componente filho para um componente pai, você pode emitir eventos. Aqui está um exemplo que ilustra como isso é feito:

Você pode usar `$emit`para emitir valores ou eventos de componentes filhos para componentes pais. Você pode ouvir os eventos dos componentes pai usando `v-on:`ou `@`junto com o nome do evento ( `@button-clicked`neste caso). Com `$emit`, você pode passar um ou mais valores e eles podem ser de qualquer tipo.

Se você está sempre se perguntando como passar valores entre os componentes pai e filho, lembre-se da estratégia “abaixe os apoios, suba os eventos” e você poderá fazer com que funcione de maneira limpa.

# **3. Saiba mais sobre os gargalos de desempenho**

Aplicações lentas são um pé no saco. Nosso trabalho como desenvolvedores de software é garantir que nossos aplicativos funcionem sem problemas. É fácil cair em certas armadilhas ao escrever aplicativos Vue, então, para ir do iniciante ao avançado, você precisará entendê-los bem e ser capaz de lidar com eles.

## **Perdas de memória**

Vazamentos de memória são um problema comum de desempenho em aplicativos da web. Mesmo que o próprio Vue não cause vazamentos de memória sem motivo, isso pode acontecer incorporando bibliotecas de terceiros ou escrevendo código com defeito. É especialmente importante evitar vazamentos de memória ao criar aplicativos de página única (SPAs) porque, por design, os usuários não atualizam seu navegador, portanto, o aplicativo tem que fazer toda a coleta de lixo.

Sem entrar em muitos detalhes, Vue tem um guia oficial sobre como [evitar vazamentos de memória](https://vuejs.org/v2/cookbook/avoiding-memory-leaks.html) . Se você é um desenvolvedor que está tentando dominar o Vue, sugiro que o leia.

## **Custos de renderização**

Bibliotecas e estruturas de front-end como React e Vue estão nos tornando “preguiçosos”. Não vemos exatamente o que está acontecendo quando se trata de renderização. Apenas usamos um `v-for`e esperamos que as coisas funcionem. E isso é ótimo - mais poder para nós!

O problema é que é difícil entender quanto “custa” a renderização. Existem muitas maneiras inesperadas pelas quais um aplicativo Vue pode ter altos custos de renderização:

* Muitos elementos DOM estão sendo produzidos.
* A página está sendo atualizada com muita frequência.
* Componentes de terceiros são usados e precisam de muito tempo para serem renderizados.

Existem muitos cenários possíveis em que seu aplicativo tem altos custos de renderização e, como resultado, seus usuários terão atrasos. Em [este artigo](https://medium.com/better-programming/6-ways-to-speed-up-your-vue-js-application-2673a6f1cde4) , eu ir muito mais profundo em como você pode lidar com problemas de desempenho no Vue.

## **Otimize o tratamento de eventos**

Isso se relaciona mais com o JavaScript do que estritamente Vue, mas é importante observar de qualquer maneira. Existem certos eventos que podem ser disparados com muita frequência. Se você adicionar um ouvinte de rolagem ou um `@mouseover`evento, o manipulador de eventos pode ser chamado muitas vezes.

Se o manipulador de eventos não fizer muito, pode não ser um problema. Mas se o seu manipulador de eventos faz muitos cálculos e leva tempo para ser executado, ele pode causar sérias lentidões em seu aplicativo. A razão pela qual isso acontece é que a rolagem, o mouseover e outros eventos podem acionar o manipulador de eventos dezenas de vezes a cada segundo.

A solução para isso é usar uma função `throttle`ou `debounce`em seu manipulador de eventos que limita o número de vezes que seu manipulador de eventos faz cálculos reais. [Lodash](http://lodash.com/) inclui ambas as funções e fornece uma maneira fácil de usá-las. Eu sugiro experimentar.

Saber sobre isso o ajudará a escrever melhor JavaScript para o navegador em geral, mas como é um problema que pode ocorrer facilmente no Vue, é importante aprender sobre ele durante sua jornada para o domínio do Vue.

# **4. Aprenda o ecossistema Vue**

Para se tornar avançado no desenvolvimento do Vue, você terá que aprender sobre os pacotes e componentes que compõem o ecossistema do Vue. A maioria dos aplicativos exigirá pelo menos um dos seguintes, mas para dominar a estrutura, acredito que você deve se familiarizar com todos os três.

## **Vuex**

A maioria dos aplicativos front-end modernos, especialmente SPAs, depende de algum tipo de gerenciamento de estado. [Vuex](https://vuex.vuejs.org/) é a biblioteca oficial de gerenciamento de estado para aplicativos Vue e se integra bem com as ferramentas de desenvolvimento oficiais do Vue.

Ele serve como um armazenamento centralizado que todos os componentes podem acessar para buscar ou modificar os dados globais do aplicativo. Os componentes podem e devem ter dados locais, mas usar o gerenciamento de estado é fundamental para os aplicativos, pois eles se tornam mais complexos e vários componentes dependem dos mesmos dados globais.

## **Vue Router**

Usar o Vue sem o [Vue Router](https://router.vuejs.org/) pode ser raro, mas já vi isso em alguns projetos. Como a maioria das pessoas aqui já está familiarizada com o Vue Router, não entrarei em muitos detalhes. Mencionarei apenas que o aprendizado `vue-router`é fundamental para a criação de SPAs, e os SPAs são o caminho a percorrer para a maioria dos aplicativos front-end modernos.

## **Vue SSR**

Para realmente fazer-se sobressair, você deve aprender SSR ou usando o oficial [biblioteca Vue](https://ssr.vuejs.org/) ou aprendendo [Nuxt.js](https://nuxtjs.org/) . A necessidade de renderização do lado do servidor geralmente surge quando o desempenho de um aplicativo de navegador começa a cair ou quando você não pode contar com o dispositivo do usuário para lidar com a renderização e é preferível fazê-lo no lado do servidor. Ajuda a otimizar o tempo até o conteúdo - especialmente em dispositivos lentos ou Internet lenta - e também é útil por motivos de SEO.

Uma vez que a maioria dos trabalhos e projetos freelance exigirá pelo menos dois dos três acima, acredito que aprendê-los é uma rua de mão única para os desenvolvedores do Vue.

# **5. Use os componentes da maneira certa**

Uma das coisas que vejo dar errado com os desenvolvedores Vue inexperientes é como eles estruturam os componentes. Muitas vezes, os aplicativos Vue contêm apenas um ou alguns mega-componentes que fazem todo o trabalho. Obviamente, essa não é a maneira certa de estruturar seus componentes.

Quanto mais experiente você se tornar, mais perceberá a importância de estruturar seu aplicativo em componentes menores, onde cada um faz bem uma (ou algumas) coisas. Existem muitos motivos pelos quais o uso de componentes menores ajuda seu aplicativo:

* Você pode reutilizar pequenos componentes em todo o seu aplicativo.
* Seu código está mais limpo e organizado.
* O Vue pode renderizar componentes filhos com mais eficiência em `v-for`

    loops.

Se você tiver uma entrevista com a Vue e for solicitado a fazer um projeto de teste, entregar um aplicativo bem organizado certamente impressionará seus entrevistadores!

# **6. Faça do Mixins seus melhores amigos**

Eu realmente amo Mixins in Vue e os uso em todos os meus projetos. Infelizmente, vejo muitos desenvolvedores que nem mesmo os usam e é uma pena. Mixins permitem que você:

* Reutilize o código em todo o seu projeto.
* Escreva o código apenas uma vez (princípio DRY).
* Refatore e mantenha seu código mais facilmente.

Mixins oferecem muita liberdade e você pode usá-los como quiser. Por exemplo, você pode ter um grupo de componentes com recursos semelhantes, então você pode querer criar um mixin que inclui todos os recursos comuns, componentes e propriedades computadas. Ou você pode ter certas ações, filtros ou condições que são muito usados em todo o seu aplicativo para que você possa criar um pequeno mixin para incluí-los.

As possibilidades são infinitas, mas a lição é clara: você precisa começar a usar mixins para se tornar um desenvolvedor Vue avançado.

# **7. Aprenda as Diretivas Avançadas**

Além de `v-for`, `v-if`e outras diretrizes comuns, Vue tem algumas directivas que são menos comum mas ainda muito útil para conhecer.

## **v-uma vez**

Você pode usar `v-once`para gerar um valor uma vez e torná-lo não reativo. Isso significa que nas alterações subsequentes, o valor não será renderizado novamente. Isso pode ajudá-lo a otimizar o desempenho em determinados cenários:

```
<span v-once> {{name}} </span>
```

## **Modificadores de diretiva de evento**

Para `v-on`eventos, existem alguns modificadores muito úteis que você pode usar. Um que eu pessoalmente uso com frequência é o `@click.prevent`, que chama automaticamente `preventDefault()`no evento de clique.

```
<a href="#" @click.prevent="processClick"> Clique aqui </a>
```

Você pode ver uma [lista completa de modificadores de eventos](https://vuejs.org/v2/guide/events.html#Event-Modifiers) na documentação.

## **Diretivas personalizadas**

O Vue permite que você registre suas próprias diretivas personalizadas, conforme explicado na [documentação](https://vuejs.org/v2/guide/custom-directive.html) . Se você estiver replicando o mesmo comportamento várias vezes em todo o seu aplicativo, pode fazer sentido criar uma diretiva personalizada que possa ser reutilizada.

Além disso, muitos pacotes de terceiros apresentarão suas próprias diretivas personalizadas que você pode usar.

A chave quando se trata de diretivas personalizadas é criá-las apenas quando necessário e evitar exagerar com as diretivas personalizadas que são usadas apenas uma ou duas vezes.

# **Continue praticando**

Você pode começar lendo mais sobre todos os conceitos que descrevi ou pode ler uma seção da documentação oficial que não leu. Leia, aprenda e certifique-se de colocar em prática. Mesmo que você apenas dê um pequeno passo em direção ao domínio do Vue hoje, ele pode percorrer um longo caminho se você mantê-lo consistentemente.