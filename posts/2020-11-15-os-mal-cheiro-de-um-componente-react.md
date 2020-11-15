---
title: Os mal cheiros de um componente react
description: Uma lista de características ruins para um componente react ter.
date: 2020-11-15 10:55:37
image: assets/img/dog-bad-smell.png
category: react
background: "#00d8ff"
---
Arquitetura de código é muito importante para escalabilidade de um código e futuras manutenções. Mas se você é iniciante, não se preocupe com isso de imediato, primeiro aprenda resolver o problema.

Gosto de exemplificar fazendo um paralelo com a cozinha. Caso não saiba cozinhar, pouco adianta saber fazer o misa en place. Minhas avós cozinham super bem e não se preocupam com isso, mas você há de convir que em uma cozinha grande de um restaurante, isso se torna fundamental para garantir uma entrega de qualidade.

Dito isso, gostaria de abordar aspectos que podem tornar seu componente difícil de manter.

### Os cheiros 💩

* [Muitas propriedades (props)](#too-many-props) 
* [Props incompatíveis](#incompatible-props)
* [Pegando props direto do estado global (state)](#props-in-state)
* [Retornar JSX direto da funções](#jsx-returns)
* [Vários booleanos no state](#multiple-booleans)
* [Muitos useState em um componente](#many-usestate)
* [useEffect muito longos](#large-useeffect)

### <a id="too-many-props"> Muitas propriedades (props) </a>

Passar muitas props em um único componente pode ser um sinal de que o componente deve ser dividido.

Aí você pergunta... mas quantas props são demais? Bem, isto depende". Você pode encontrar uma situação em que um componente tenha 20 props ou mais e ainda estar ok, porque faz apenas uma coisa. Mas quando você se depara com um componente que já tem muitas props e  sente o desejo de adicionar apenas mais uma para esta longa lista, há algumas coisas a se considerar:

#### Este componente está fazendo várias coisas?

Assim como as funções, os componentes devem fazer apenas uma coisa e bem feito. Por isso, é sempre bom verificar se é possível dividir o componente em vários componentes menores. Por exemplo, se o componente tem props incompatíveis ou retorna JSX de funções.

#### Posso usar composição?

Um padrão muito bom, mas frequentemente esquecido, é compor componentes em vez de lidar com toda a lógica em apenas um. Digamos que temos um componente que lida com um aplicativo de usuário para alguma organização:

```jsx
<ApplicationForm
  user={userData}
  organization={organizationData}
  categories={categoriesData}
  locations={locationsData}
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  ...
/>
```

Olhando para as props deste componente, podemos ver que todas elas estão relacionadas ao que o componente faz, mas ainda há espaço para melhorar isso movendo algumas das responsabilidades dos componentes para seus filhos:

```jsx
<ApplicationForm onSubmit={handleSubmit} onCancel={handleCancel}>
  <ApplicationUserForm user={userData} />
  <ApplicationOrganizationForm organization={organizationData} />
  <ApplicationCategoryForm categories={categoriesData} />
  <ApplicationLocationsForm locations={locationsData} />
</ApplicationForm>
```

Agora nos certificamos de que o ApplicationForm tem apenas uma responsabilidade: enviar ou cancelar o formulário. Os componentes filhos podem lidar com tudo relacionado à sua parte no quadro geral. Esta também é uma ótima oportunidade de usar o React Context para a comunicação entre os filhos e seus pais.

#### Estou passando muitas props para 'configuração'?

Em alguns casos, é uma boa ideia agrupar adereços em um objeto de opções, por exemplo, para tornar mais fácil trocar esta configuração. Se tivermos um componente que exibe algum tipo de grade ou tabela:

```jsx
<Grid
  data={gridData}
  pagination={false}
  autoSize={true}
  enableSort={true}
  sortOrder="desc"
  disableSelection={true}
  infiniteScroll={true}
  ...
/>
```

Todos essas props, exceto `data` , podem ser consideradas configurações. Nesses casos, às vezes é uma boa ideia alterar o `Grid` para que ele aceite um objeto de opções: `options`.

```jsx
const options = {
  pagination: false,
  autoSize: true,
  enableSort: true,
  sortOrder: 'desc',
  disableSelection: true,
  infiniteScroll: true,
  ...
}

<Grid
  data={gridData}
  options={options}
/>
```

Isso também significa que é mais fácil excluir opções de configuração que não queremos usar se estivermos passando apenas um objeto de `options`.

### <a id="incompatible-props"> Props incompatíveis </a>

Evite passar props incompatíveis entre si para um componente.

Por exemplo, podemos começar criando um componente comum de `<Input />` que se destina apenas a lidar com texto, mas depois de um tempo também adicionamos a possibilidade de usá-lo para números de telefone. A implementação pode ser semelhante a esta:

```jsx
function Input({ value, isPhoneNumberInput, autoCapitalize }) {
  if (autoCapitalize) capitalize(value)

  return <input value={value} type={isPhoneNumberInput ? 'tel' : 'text'} />
}
```

O problema com isso é que as props `isPhoneNumberInput` e  `autoCapitalize` não fazem sentido juntas. Não podemos realmente capitalizar números de telefone, não é mesmo?

Nesse caso, a solução provavelmente é dividir o componente em outros componentes menores. Se ainda temos alguma lógica que queremos compartilhar entre eles, podemos movê-la para um custom hook (mixin):

```jsx
function TextInput({ value, autoCapitalize }) {
  if (autoCapitalize) capitalize(value)
  useSharedInputLogic()

  return <input value={value} type="text" />
}

function PhoneNumberInput({ value }) {
  useSharedInputLogic()

  return <input value={value} type="tel" />
}
```

Embora este exemplo seja um pouco superficial, encontrar props incompatíveis uns com os outros é geralmente uma boa indicação de que você deve verificar se o componente precisa ser quebrado.

### <a id="props-in-state"> Pegando props do estado global (state) </a>

Não interrompa o fluxo de dados copiando props do state.

Exemplo:

```jsx
function Button({ text }) {
  const \[buttonText] = useState(text)

  return <button>{buttonText}</button>
}
```

Ao passar a props `text` como o valor inicial para o useState, o componente agora praticamente ignora todos os valores atualizados de `text`. Se a props `text` for atualizada, o componente ainda iria renderizar seu primeiro valor. Para a maioria das props, esse é um comportamento inesperado que, por sua vez, torna o componente mais sujeito a bugs.

Um exemplo mais prático desse acontecimento é quando queremos derivar algum novo valor de uma props e especialmente se isso requer algum cálculo lento. No exemplo abaixo, executamos a função `slowlyFormatText` para formatar nossa props `text`, que leva muito tempo para ser executado.

```jsx
function Button({ text }) {
  const \[formattedText] = useState(() => slowlyFormatText(text))

  return <button>{formattedText}</button>
}
```

Ao colocá-lo no state, resolvemos o problema de que ele será executado novamente sem necessidade, mas também impedimos a atualização do componente. A melhor maneira de resolver esse problema é usar o hook useMemo para memorizar o resultado:

```jsx
function Button({ text }) {
  const formattedText = useMemo(() => slowlyFormatText(text), \[text])

  return <button>{formattedText}</button>
}
```

Agora `slowlyFormatText` só funciona quando `text` muda e não interrompemos a atualização do componente.

> Às vezes, precisamos de uma props onde todas as atualizações sejam ignoradas, por exemplo, um seletor de cores onde precisamos da opção de definir uma cor inicialmente escolhida, mas quando o usuário escolher uma cor, não queremos que uma atualização substitua a escolha do usuário. Nesse caso, não há problema em copiar a props do state, mas para indicar esse comportamento ao usuário, a maioria dos desenvolvedores prefixa o props com initial ou default ( initialColor/ defaultColor).

### <a id="jsx-returns">Retornando JSX de funções</a>

Não retorne JSX de funções dentro de um componente.

Este é um padrão que desapareceu amplamente quando os componentes de função se tornaram mais populares, mas ainda o encontro de vez em quando. Só para dar um exemplo do que quero dizer:

```jsx
function Component() {
  const topSection = () => {
    return (
      <header>
        <h1>Component header</h1>
      </header>
    )
  }

  const middleSection = () => {
    return (
      <main>
        <p>Some text</p>
      </main>
    )
  }

  const bottomSection = () => {
    return (
      <footer>
        <p>Some footer text</p>
      </footer>
    )
  }

  return (
    <div>
      {topSection()}
      {middleSection()}
      {bottomSection()}
    </div>
  )
}
```

Embora possa parecer bom de início, torna mais difícil raciocinar sobre o código, desencoraja bons padrões e deve ser evitado. Para resolvê-lo, é melhor usar JSX inline, mesmo que o retorno fique grande, mas de novo: esta seria uma razão para quebrar esse componente em outros menores.

Lembre-se de que, só porque você criou um novo componente, você não precisa movê-lo para um novo arquivo também. Às vezes, faz sentido manter vários componentes no mesmo arquivo se eles estiverem fortemente acoplados.

### <a id="multiple-booleans"> Vários booleanos no state </a>

Evite usar vários booleanos para representar o state de um componente.

Ao escrever um componente e, subsequentemente, estender suas funcionalidades, é fácil acabar em uma situação onde você tem vários booleanos para indicar em qual estado o componente está. Exemplo:

```jsx
function Component() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchSomething = () => {
    setIsLoading(true);

    fetch(url)
      .then(() => {
        setIsLoading(false);
        setIsFinished(true);
      })
      .catch(() => {
        setHasError(true);
      });
  };

  if (isLoading) return <Loader />;
  if (hasError) return <Error />;
  if (isFinished) return <Success />;

  return <button onClick={fetchSomething} />;
}
```

Quando o botão é clicado, definimos `isLoading` como verdadeiro e fazemos uma solicitação da api. Se a solicitação for bem-sucedida, definimos `isLoading` como falso e `isFinished` verdadeiro e, caso contrário, definimos `hasError` como verdadeiro se houver um erro.

Embora isso tecnicamente funcione bem, é difícil raciocinar sobre em que state o componente está e o quão está mais sujeito a erros do que as alternativas. Também podemos acabar em um “state impossível”, como se acidentalmente, definíssemos ambos `isLoading` e `isFinished` como verdadeiro ao mesmo tempo.

A melhor maneira de lidar com isso é gerenciar o estado com um **“enum”**. Em outras linguagens, enums são uma maneira de definir uma variável que só pode ser definida como uma coleção predefinida de valores constantes e, embora enums não existam tecnicamente em Javascript, podemos usar uma string como enum e ainda obter muitos benefícios:

```jsx
function Component() {
  const [state, setState] = useState("idle");

  const fetchSomething = () => {
    setState("loading");

    fetch(url)
      .then(() => {
        setState("finished");
      })
      .catch(() => {
        setState("error");
      });
  };

  if (state === "loading") return <Loader />;
  if (state === "error") return <Error />;
  if (state === "finished") return <Success />;

  return <button onClick={fetchSomething} />;
}
```

Ao fazer assim, removemos a possibilidade de estados impossíveis e tornamos muito mais fácil raciocinar sobre esse componente. Finalmente, se você estiver usando algum sistema de tipagem como o TypeScript, é ainda melhor, pois você pode especificar os estados possíveis:

```jsx
const [state, setState] =  (useState < "idle") | "loading" | "error" | ("finished" > "idle");
```

### <a id="many-usestate"> Muitos useState em um componente</a>

Evite usar muitos hooks `useState` no mesmo componente.

Um componente com muitos hooks `useState` está fazendo muitas coisas️ e provavelmente é um bom candidato a ser quebrado em vários componentes, mas também existem alguns casos complexos em que precisamos gerenciar algum estado em um único componente.

Aqui está um exemplo do excesso de useState:

```jsx
function AutocompleteInput() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [items, setItems] = useState(\[])
  const [selectedItem, setSelectedItem] = useState(null)
  const [activeIndex, setActiveIndex] = useState(-1)

  const reset = () => {
    setIsOpen(false)
    setInputValue('')
    setItems(\[])
    setSelectedItem(null)
    setActiveIndex(-1)
  }

  const selectItem = (item) => {
    setIsOpen(false)
    setInputValue(item.name)
    setSelectedItem(item)
  }

}
```

Temos uma função `reset` que redefine todo o estado e uma função `selectItem` que atualiza parte dele. Essas funções precisam usar algumas configurações de estado de todos os nossos useStates para realizar a tarefa pretendida. Agora imagine que temos muito mais ações que precisam atualizar o state, ficando difícil manter o código livre de bugs a longo prazo. Nesses casos, pode ser benéfico gerenciar nosso state com um hook `useReducer`:

```jsx
const initialState = {
  isOpen: false,
  inputValue: "",
  items: [],
  selectedItem: null,
  activeIndex: -1,
};
function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return {
        ...initialState,
      };
    case "selectItem":
      return {
        ...state,
        selectedItem: action.payload,
      };
    default:
      throw Error();
  }
}

function AutocompleteInput() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const reset = () => {
    dispatch({ type: "reset" });
  };

  const selectItem = (item) => {
    dispatch({ type: "reset", payload: item });
  };
}
```

Usando um redutor, encapsulamos a lógica para gerenciar nosso state e removemos a complexidade de nosso componente. Isso torna muito mais fácil entender o que está acontecendo, agora que podemos pensar sobre nosso state e nosso componente separadamente.

Ambos useState e useReducer vêm com seus prós e contras.

### <a id="large-useeffect"> useEffect muito longos </a>

Evite escrever useEffect muito longos. Eles tornam seu código sujeito a erros, além de ser mais difícil raciocinar.

Um erro comum são muitas ações em apenas um useEffect. Para ilustrar, aqui está um componente com um único useEffect:

```jsx
function Post({ id, unlisted }) {
  ...
  useEffect(() => {
    fetch(`/posts/${id}`).then(/ *do something* /);

    setVisibility(unlisted);
  }, \[(id, unlisted)]);
}
  ...
}
```

Embora esse useEffect não seja tão grande, ele ainda faz várias coisas. Quando a props `unlisted` mudar, iremos buscar a postagem, mesmo que o `id` não tenha mudado.

Para detectar erros como esse, tento descrever os useEffect que escrevo dizendo: “quando `\[dependencies]`mudar, faça isso ” para mim mesmo. Aplicando isso ao efeito acima, obtemos “quando `id ` ou `unlisted` mudar, busque a postagem e atualize a visibilidade”. Se esta frase contiver as palavras "ou" ou "e", geralmente indica um problema.

Dividindo esse useEffect em dois, temos:

```jsx
function Post({ id, unlisted }) {
  ...

  useEffect(() => { // when id changes fetch the post
    fetch(`/posts/${id}`).then(/* ... */)
  }, [id])

  useEffect(() => { // when unlisted changes update visibility
    setVisibility(unlisted)
  }, [unlisted])

  ...
}
```

Ao fazer isso, reduzimos a complexidade de nosso componente e tornamos mais fácil raciocinar, diminuindo assim o risco de criarmos bugs.

## Considerações

Tudo bem, isso é tudo por agora! Lembre-se de que, de forma alguma, essas não são regras, mas sinais de que algo pode estar "errado". Você certamente se deparará com situações em que deseja fazer algumas das coisas acima por um bom motivo.

Tem algum feedback sobre por que estou errado sobre isso? Sugestões para outros odores de código que você encontrou em seus componentes? Entre em contato!

Adaptado de [React component code smells](https://antongunnarsson.com/react-component-code-smells/)

![Thats all folks](assets/img/giphy-1-.gif "Thats all folks")