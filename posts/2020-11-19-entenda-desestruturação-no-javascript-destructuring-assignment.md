---
title: Entenda desestruturação no Javascript (destructuring assignment)
description: Pegando apenas o que precisa de um elemento.
date: 2020-11-19 07:37:24
image: assets/img/quebra-cabeca-2_xl.jpeg
category: js
background: "#D6BA32"
---
À medida que avançamos no mundo do JavaScript (JS), nos deparamos com uma técnica chamada atribuição de desestruturação. Uma técnica muito útil quando você precisa de apenas partes de um determinado dado que você recebe.

Normalmente em JS, você pode atribuir um valor a uma variável como este.

`let myString = 'Hello World!';`

Mas e se o valor não for literal e vier de outro lugar? E se for um objeto gigante e você precisar apenas de algumas informações? Nesses casos, você pode escrever algo assim.

```javascript
let someObject = {myString: 'foo', myInt: 42, myBool: true};

// Pegando apenas myString e myInt
let myString = someObject.myString; // ou podemos usar myObject['myString']
let myInt = myObject.myInt; // ou myObject['myInt']
```

Mas o Javascript oferece outra forma, mais compacta e fácil de ler: a atribuição de desestruturação:

```javascript
let {myString, myInt} = {myString: 'foo', myInt: 42};
```

Bem melhor, não? Note, usamos as chaves do objeto no lado esquerdo.\
E isso também funciona para arrays ...

```javascript
let myArray = ['hello', 'there', 'sam']
let [wordOne, wordTwo] = myArray;
// wordOne = 'hello'
// wordTwo = 'there'
```

Você também pode pular valores, deixando um espaço entre as vírgulas ...

```javascript
let myArray = ['hello', 'there', 'sam']
let [greeting,,name] = myArray;
// greeting = 'hello'
// name = 'sam'
```

Neste cenário, algo que também ajuda muito é o parâmetros Rest, que permite passar todos parâmetros de algum objeto ou Array.

```javascript
// Com arrays
let arr = [0, 1, 2, 3, 4];
let [first, second, ...others] = arr;
// first = 0
// second = 1
// others = [2, 3, 4]

// Com objetos

let doc = {
   titulo: 'Destruction Js', 
   author: 'MDN', 
   timeToRead: '5'
};

const author = {
   fullName: 'MDN web docs',
   url: 'https://developer.mozilla.org/'
}

let {timeToRead, ...author} = doc;

// importantThing = '41233219'
// fullName = 'MDN web docs'
// url = 'https://developer.mozilla.org/'
```

Note, apesar de serem muito parecidos, não podemos confundir o Rest com o um outro operador muito útil: o de Espalhamento (Spread operator), [](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)que tende a ser usado apenas no lado direito das atribuições.

Essa é uma introdução muito rápida, mas por que você a usaria?\
\
Primeiro, ele pode dar mais expressão ao seu código. Acima, quando retirei `timeToRead` e deixei o resto, isso diz para outro desenvolvedor, que ler seu código, para ele não se preocupar com o objeto inteiro e sim com apenas aquela variável que você esta usando. \
\
Em segundo lugar, sua documentação, no caso de desestruturação de objetos, pode dar algumas dicas sobre as possíveis propriedades do objeto sem ter que encontrar sua definição, declaração ou instanciação. Isso é útil e economiza tempo.\
\
Gostou, quer saber um pouco mais? Segue alguns links que ajudam a entender melhor:

* [Atribuição via desestruturação (destructuring assignment)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Atribuicao_via_desestruturacao)
* [Parâmetros Rest](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_operator)
* [Spread operator](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/rest_parameters)



<iframe src="https://giphy.com/embed/joXtIlEbFrsA" width="480" height="271" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

[](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/rest_parameters)