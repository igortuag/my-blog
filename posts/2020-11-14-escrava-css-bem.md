---
title: Escrava CSS BEM
description: Uma ótima forma de escrever css
date: 2020-11-14 03:20:18
thumbnail: assets/img/css-problems.gif
category: css
background: "#2DA0C3"
---
<!--StartFragment-->

Título direto e conteúdo mais ainda — nesse texto, quero explicar para você o que é, como se usa, por que se usa e alguns exemplos de uso do BEM em projetos web. Vamos lá?

# Primeiro, o que é BEM?

BEM é uma metodologia, uma convenção, um padrão de nomenclatura que utilizamos para manter o nosso projeto simples e organizado. O principal objetivo dessa metodologia, além de manter os códigos simples na hora da escrita e (principalmente) da manutenção, é fazer com que qualquer desenvolvedor possa ter total autonomia para mexer em qualquer tipo de projeto — seja um projeto que você já conheça ou um projeto no qual você acabou de entrar.

Essa metodologia é aplicada na nomenclatura das classes CSS dos nossos elementos HTML. A sigla BEM significa *Block Element Modifier*, em português, *Bloco Elemento Modificador* — esses 3 pilares são as bases dessa metodologia e também são as categorias nas quais vamos dividir nossos elementos.

Mostrando diretamente isso em um código simples, imagine a seguinte situação: ***construir um newsfeed***.

Basicamente, se trata de uma lista (ordenada ou não) com alguns elementos dentro de cada item**\***. Embora listas sejam um exemplo saturado para usar, elas cabem muito bem na explicação de como utilizar a metodologia.

> **\***poderíamos utilizar também uma estrutura composta por várias `<div>` e apenas ajustar o CSS, **porém isso não é uma boa prática** — não segue os web standards e, em consequência, o SEO da sua página ficará horrível.

Construindo o nosso newsfeed utilizando o padrão BEM, a estrutura ficaria mais ou menos assim:

```

```

No exemplo acima, temos um bloco e alguns elementos. Onde:

* `.list` é um **bloco;**
* `.list__item`, `.list__title`, `.list__author` e `.list__text` são **elementos;**

Para contemplar os modificadores no exemplo, imagine que algumas publicações terão um certo destaque em relação as outras. Dessa forma, nossa estrutura ficaria assim:

```

```

Ou seja, explicando agora o padrão da nomenclatura que utilizamos:

* Nossa primeira classe sempre será o bloco: `.list`
* Para criarmos os elementos, utilizamos 2 underlines ( __ ) após o nome do nosso bloco: `.list__item`, `.list__title`
* Para criarmos os modificadores, utilizamos 2 traços (— ) no nosso bloco ou elemento: `.list__item--highlight`, `.list__author--active`

# Como saber o que é um elemento e o que é um modificador?

Um **elemento** sempre será uma parte, um complemento da estrutura do bloco. Seguindo nossos exemplos acima, um item de uma lista, o título de uma publicação.

*Os **modificadores** são estados que os nossos blocos ou elementos poderão ter: um botão com diferentes aparências, uma situação de destaque.*

Geralmente, os modificadores fazem com que algumas propriedades dos blocos/elementos sejam complementadas — *background-color*, *font-weight*, *borders*, *opacity*, ou até mesmo o *display* e o *position*.

É importante lembrar também que **um elemento não pode estar dentro de outro**. Por exemplo:

```

```

Quando nos deparamos com essa situação, devemos utilizar a seguinte estrutura:

```

```

E eis aqui o porque disso:

> Um bloco é uma entidade independente, um componente de uma aplicação. Um bloco pode ser simples ou composto — contendo outros blocos.

É uma questão de contexto: `.list` é o nosso *bloco composto* (compound block), que possui outro bloco composto, `.list__item`. E `.list__title` é apenas um bloco, contido dentro de `.list__item`.

Também, podemos utilizar o esquema de 2 classes:

```

```

É uma solução que funciona, porém deve ser utilizada com moderação para não saturar seu elemento com diversas classes.

Não é uma regra, mas é uma boa prática utilizar o padrão `__` apenas 1x dentro do nome da sua classe (apenas 1 elemento). Se você está chegando em nomenclaturas com mais de um elemento, é bom rever a estrutura utilizada!

# Boas práticas com BEM

Algumas boas práticas são associadas ao BEM, porém, não necessariamente, fazem parte da metodologia — a metodologia aliada a essas boas práticas comuns acabam formando um conjunto sensacional.

Independente do uso da metodologia, uma boa prática que você pode/deve seguir quando escreve CSS é em relação a **especificidade** — quanto menor ela for, melhor será seu código, pois assim você não terá problemas para sobrescrever propriedades e evitará utilizar `!important`.

Assim como dito ali em cima, outra boa prática é evitar um grande número de classes nos elementos HTML; a exceção para esse caso seria apenas a aplicação de modificadores:\
`<button class="button button--blue button--outline">Click Me</button>`

Recentemente, eu encontrei um post maravilhoso falando sobre 5 problemas comuns com o uso do BEM e como resolvê-los de maneira elegante:

> Battling BEM — 5 common problems and how to avoid them
>
> <https://medium.com/fed-or-dead/battling-bem-5-common-problems-and-how-to-avoid-them-5bbd23dee319>

# Conclusão

Essa metodologia é incrivelmente fácil de usar e é um excelente aliado. Ela pode ser aplicada em qualquer projeto web — seja um site, sistema, webapp, landing page, hotsite… E também ela é independente aos frameworks/ferramentas que você está utilizando em seu projeto — React, Vue, jQuery, Angular, Ember, Meteor, Sass, PostCSS…

No começo pode ser um pouco estranho — até você se acostumar com a ideia do padrão; mas, além de proporcionar uma grande organização do projeto e facilidade na escrita/leitura do código, ele também proporciona maior desempenho — você ganha tempo durante o desenvolvimento e consegue fazer muito mais em menores períodos de tempo.

<!--EndFragment-->