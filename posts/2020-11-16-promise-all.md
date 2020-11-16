---
title: Promise.All
description: Provavelmente Você Não Está Usando Promise.All Suficiente
date: 2020-11-16 07:11:51
image: assets/img/1_3kqej4rwyrhek783d2kosg.jpeg
category: js
background: "#D6BA32"
---
*Antes de começar: este não é um tutorial completo sobre Promise.All. Este post é apenas uma introdução sobre como usar o Promise.all.*

## Promises antes - "callback hell"

Desde o ES8, os desenvolvedores JavaScript provavelmente estão gostando das novas palavras `async` e `await`. Frequentemente chamando de 'async/await', esse conjunto de palavras-chaves resolve um problema em JavaScript: o chamado "callback hell".

Antes do ES8, as funções assíncrona tinham que aceitar retornos de chamada. Isso significava que o código ficava confuso quando você precisava realizar *várias etapas assíncronas* .

Aqui está um exemplo

```

```

Vê como o código muda para a direita? Não é o ideal. Isso tem duas etapas, mas você pode imaginar o aninhamento com três, cinco ou dez etapas. Bruto.

## Promessas agora - simplesmente adorável

Com o surgimento de Async / Await, o mesmo código poderia ser expresso de maneira muito mais agradável.

```

```

Vê como isso se parece mais com código síncrono? Belos passos definidos que são fáceis de seguir.

E é geralmente aí que os tutoriais deste tópico terminam. No entanto, gostaria de explicar por que você pode querer ir mais longe ao converter este código.

Semelhante ao primeiro snippet, o código espera duas vezes. Uma vez para obter `result1`e novamente para obter `result2`. Eles são usados ​​juntos para fazer a etapa final.

Você começa a ter problemas quando percebe que não precisa esperar por essas coisas *em sequência* . Eles podem acontecer *em paralelo* .

## Promise.all

Então, nós apresentamos `Promise.all`. Promise.all espera por uma série de promessas serem resolvidas antes de continuar. Portanto, se alterarmos nosso código para usar Promise.all em vez disso, ficaria assim:

```

```

Percorrendo, declaramos as variáveis ​​de resultado usando [atribuição de desestruturação](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) e, em seguida, aguardamos a chamada para Promise.all.

A partir daí, podemos usar as duas variáveis ​​na chamada final.

O que fizemos essencialmente foi cortar nosso tempo de espera pela metade. Em vez de esperar por 2 métodos de x que levam um segundo cada, resultando em duas etapas da segunda série. Fizemos neles em paralelo e agora demoram cerca de um segundo. É uma grande economia de tempo para você e seu usuário.

Agora, uma sutileza aqui: realmente, a definição de Promise.all não está sendo executada em paralelo. Ele está *aguardando uma lista para terminar* . A diferença é que a chamada para `doSomethingAsync`provavelmente iniciou alguns ciclos de clock antes de `doSomethingElseAsync`. Normalmente essa diferença não importa, mas espere ver as operações de comprimento de duração igual terminarem em uma ordem indeterminística.

Portanto: **se você tem um código que precisa fazer uma série de chamadas assíncronas - pense consigo mesmo - qualquer uma delas pode ser feita em paralelo?** No exemplo acima, fizemos dois dos três em paralelo porque o terceiro precisava dos resultados dos dois primeiros. No entanto, o segundo não precisava do resultado do primeiro, então poderia ser feito ao mesmo tempo.

## Esperando matrizes dinâmicas de promessas

Isso é realmente útil quando você está mapeando uma lista de, digamos, usuários e atualizando um registro deles.

Freqüentemente, programadores inexperientes evitarão `map`e optarão por um padrão for ... of. Talvez o loop costumava ser síncrono e agora tem algum código assíncrono. De qualquer maneira, isso acontece. No entanto, quando os loops são combinados com async await, isso pode causar alguns códigos muito lentos.

```

```

Aqui, na verdade estamos esperando que o loop anterior do `for..of`loop termine antes de iniciar o próximo. No entanto, não deveríamos fazer isso de maneira alguma, já que as solicitações não dependem umas das outras e podem ser iniciadas juntas e `await`paralelamente

```

```

Aqui, usamos `Array.map`para criar uma série de promessas e, em seguida, usamos `await`essa série de promessas com Promise.all novamente.

Mais uma vez, se `doSomethingAsync`levar um segundo, o tempo sequencial será de quatro segundos para nossos quatro usuários, mas, paralelamente, provavelmente será mais próximo de um segundo. Uma grande melhoria!

## Pensamentos finais

Escrever código como este torna menos fácil de seguir - é definitivamente menos sequencial, mas com o tempo fica mais fácil de ler e escrever. Um bom controle `.map`e `Promises`irá atendê-lo bem no desenvolvimento de JavaScript. Todos os itens acima se aplicam ao TypeScript, flow e é o mesmo, não importa se você está no Node ou na web, usando react, vue ou qualquer outra coisa. Este é um problema de JavaScript básico com uma solução de JavaScript básico.

Flex final: reescrevi um trabalho de nó recentemente, e usando Promise.all passou de cerca de 6 segundos para cerca de 2. Vale a pena fazer.

<!--EndFragment-->