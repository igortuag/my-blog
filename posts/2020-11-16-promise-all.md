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

Antes do ES8, as funções assíncrona tinham que aceitar callbacks. Isso significava que o código ficava confuso quando você precisava realizar *várias etapas assíncronas* .

Exemplo:

```javascript
function main() {
  return doSomethingAsync('Foo').then(result1 => {
    return doSomethingElseAsync('Foo').then(result2 => {

      // Agora que já tenho as informações, chame a etapa final
      return finallySomethingAsync(result1, result2);
    });
  });
}
```

Vê como o código muda para a direita? O famoso hadouken, não é o ideal. O exemplo tem apenas duas etapas, mas você pode imaginar um caso três, cinco ou dez etapas.

## Promises agora - simplesmente adorável

Com o surgimento de Async / Await, o mesmo código poderia ser expresso de maneira muito mais agradável.

```javascript
async function main() {
  const result1 = await doSomethingAsync('Foo');
  const result2 = await doSomethingElseAsync('Foo');

  // Agora que já tenho as informações, chame a etapa final
  return await finallySomethingAsync(result1, result2);
}
```

Vê como isso se parece mais com código síncrono? Belos passos bem definidos que são fáceis de entender.

E é geralmente aí que os tutoriais deste tópico terminam. No entanto, gostaria de explicar por que você pode querer ir mais longe e refatorar este código.

Semelhante ao primeiro caso, o código espera duas vezes. Uma vez para obter `result1` e novamente para obter `result2`. Eles são usados ​​juntos para fazer a etapa final.

Você começa a ter problemas quando percebe que não precisa esperar por uma informação para dai obter a outra *em sequência*. Elas podem ser obtidas *em paralelo*. E para resolver este problema que vem o Promise.all

## Promise.all

Promise.all espera por uma série de promessas serem resolvidas antes de continuar. Portanto, se alterarmos nosso código para usar Promise.all, ficaria assim:

```javascript
async function main() {
  console.log('This is my code');
  const [result1, result2] = await Promise.all([
    doSomethingAsync('Foo'),
    doSomethingElseAsync('Foo'),
  ]);

  // Agora que já tenho as informações, chame a etapa final
  return await finallySomethingAsync(result1, result2);
}
```

Podendo ainda obter os resultados de forma direta usando [Atribuição via desestruturação (destructuring assignment)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Atribuicao_via_desestruturacao), aguardamos a chamada para Promise.all.

A partir daí, podemos usar as duas variáveis ​​na chamada final.

O que fizemos essencialmente foi cortar nosso tempo de espera pela metade. Em vez de esperar por 2 métodos de x que levam um segundo cada, resultando em duas etapas da segunda série. Obtemos elas em paralelo e agora demoram cerca de um segundo. É uma grande economia de tempo para você e seu usuário.

Agora, uma sutileza aqui: realmente, a definição de Promise.all não está sendo executada em paralelo. Ela está *aguardando uma lista para terminar* . A diferença é que a chamada para `doSomethingAsync` provavelmente iniciou alguns ciclos de clock antes de `doSomethingElseAsync`. Normalmente essa diferença não importa, mas espere ver as operações de longas de duração igual terminarem em uma ordem indeterminística.

Portanto: **se você tem um código que precisa fazer uma série de chamadas assíncronas - pense consigo mesmo - qualquer uma delas pode ser feita em paralelo?** No exemplo acima, fizemos dois dos três em paralelo porque o terceiro precisava dos resultados dos dois primeiros. No entanto, o segundo não precisava do resultado do primeiro, então poderia ser feito ao mesmo tempo.

## Await em arrays de promises

Isso é realmente útil quando você está mapeando uma lista de, digamos, usuários e atualizando um registro deles.

Frequentemente, programadores inexperientes evitarão `map` e optarão por um padrão for ... of. Talvez o loop costumava ser síncrono e agora tem algum código assíncrono. De qualquer maneira, isso acontece. No entanto, quando os loops são combinados com async await, isso pode causar alguns códigos muito lentos.

```javascript

```

Aqui, na verdade estamos esperando que o loop anterior do `for..of`loop termine antes de iniciar o próximo. No entanto, não deveríamos fazer isso de maneira alguma, já que as solicitações não dependem umas das outras e podem ser iniciadas juntas e `await`paralelamente

```javascript
async function main2() {
  const users = ['Sam', 'Hannah', 'Craig', 'Morgan'];

  let results = [];

  for await (const user of users) {
    const result = await doSomethingAsync(user);

    results.push('Hello, ' + result);
  }

  return results;
}
```

Aqui, usamos `Array.map` para criar uma série de promises, em seguida, usamos `await` para cada promises com Promise.all novamente.

Mais uma vez, se `doSomethingAsync` levar um segundo, o tempo sequencial será de quatro segundos para nossos quatro usuários, mas, paralelamente, provavelmente será mais próximo de um segundo. Uma grande melhoria!

## Considerações finais

Escrever código assim leva uma curva de aprendizado, mas com o tempo fica mais fácil de ler e escrever. Um bom controle `.map` e `Promises` irá atendê-lo bem no desenvolvimento de JavaScript. Todos os itens acima se aplicam ao TypeScript, fluxo é o mesmo, não importa se você está no Node ou na web, usando react, vue ou qualquer outra coisa. Este é um problema de JavaScript básico com uma solução de JavaScript básico.

Fonte: [Sam Jarman](https://www.samjarman.co.nz/blog/promisedotall)

![Gif do Papaleguas](assets/img/papaleguas.gif "Gif do Papaleguas")