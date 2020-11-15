---
title: Escreva CSS BEM
description: Uma ótima forma de escrever css
date: 2020-11-14 03:20:18
imagePost: assets/img/css-problems.gif
category: css
background: "#2DA0C3"
---
# BEM

BEM é basicamente uma metodologia para escrever CSS, que eu em particularmente gosto muito e uso no dia a dia. 

Sua sintaxe pode parecer estranha e verbosa, mas basta entender e se acostumar que depois você vai achar estranho quando não usar.

A sigla significa *Block Element Modifier*, em português, *Bloco Elemento Modificador,* que são os três grandes pilares dessa metodologia.

## Bloco

O bloco, ou mais comumente chamado de componente é uma parte independente do seu código, que pode ser reutilizada. Um menu, por exemplo, pode ser tratado como um componente.

HTML

```
<ul class="menu">
  <li></li>
  <li></li>
  <li></li>
  <li></li>
</ul>
```

SCSS

```scss
.menu { }
```

Até ai, nada novo, mas geralmente também precisamos estilizar o que esta dentro do menu, e é ai que entra os elementos.

## Elementos

Elementos são pedaços do componente e no BEM usamos dois underlines seguidos de um nome para denomina-los.

```
<ul class="menu">
  <li class="menu__item"></li>
  <li class="menu__item"></li>
  <li class="menu__item"></li>
  <li class="menu__item"></li>
</ul>
```

SCSS

```scss
.menu {
  &__item { }
}
```



Assim podemos ver claramente de qual componente um elemento se trata. Contudo ai mora uma pegadinha, imagine que este item possua um elemento dentro dele no HTML, o mais intuitivo a se pensar é sair escrevendo desta forma

HTML

```
<ul class="menu">
  <li class="menu__item">
    <h2 class="menu__item__name"></h2> 
  </li>
  <li class="menu__item"></li>
  <li class="menu__item"></li>
  <li class="menu__item"></li>
</ul>
```

SCSS

```scss
.menu {
  &__item { 
    &__name {
    }
  }
}
```

Contudo não é uma boa pratica, não precisamos seguir a estrutura do html. O Componente definido é o menu e não o item dele, então podemos apenas dizer que o nome é outro elemento de menu e escrever assim:

HTML

```
<ul class="menu">
  <li class="menu__item">
    <h2 class="menu__name"></h2>
  </li>
  <li class="menu__item"></li>
  <li class="menu__item"></li>
  <li class="menu__item"></li>
</ul>
```

SCSS

```scss
.menu {
  
  &__item { }
  
  &__name { }
}
```

Agora você deve estar se perguntando, e se eu quiser deixar algum elemento diferente, seja colocando de outra cor ou aumentando o seu tamanho? E é ai que entra os modificadores.

## Modificadores

Tanto o bloco como o elemento podem ter modificadores, e como próprio nome já diz ele serve para atribuir uma modificação, como por exemplo: 

HTML

```
<ul class="menu menu--main">
  <li class="menu__item">
    <h2 class="menu__name"></h2>
  </li>
  <li class="menu__item menu__item--selected"></li>
  <li class="menu__item"></li>
  <li class="menu__item menu__item--red"></li>
</ul>
```

SCSS

```scss
.menu {
  
  &__item {
    &--selected {}
    
    &--red {}
  }
  
  &__name { }
  
  &--main {
   &__name { }
    
   &__name { }
  }
}
```

Fácil, não? Considere fazer alguns testes e ter um CSS mais organizado com o BEM.