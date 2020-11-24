---
title: CSS em ordem alfabética no VS Code de forma fácil e rápida
description: Deixe os seus blocos de CSS no VS Code em ordem alfabética de
  maneira rápida, fácil e sem instalar nenhuma extensão.
date: 2020-11-24 11:24:07
image: assets/img/css-118-569410.png
category: css
background: "#2DA0C3"
---
Basta acessar as configurações de atalhos, digite o comando F1, após aparecer o dialogo, digite `Preferences: Open Keyboard Shortcuts (JSON) e aperte enter.`

Será apresentado todas suas personalizações de atalho, basta então adicionar a seguinte configurações.

```json
// Place your key bindings in this file to override the defaults
[
  {
    "key": "ctrl+shift+a ctrl+shift+c",
    "command": "editor.action.sortLinesAscending"
  },
  {
    "key": "ctrl+shift+d ctrl+shift+c",
    "command": "editor.action.sortLinesDescending"
  }
]
```

Note que são dois comandos, um para ordenar de forma crescente `"editor.action.sortLinesAscending"` e outro para ordenar de forma decrescente:  `"editor.action.sortLinesDescending"`. Os atalhos escolhidos por mim foram `"ctrl+shift+a ctrl+shift+c"` e `"ctrl+shift+d ctrl+shift+c"`, mas fica a seu critério escolher o que achar mais facil.

```css
.some-class {
   cursor: pointer;
   opacity: 0.5;
   transition: all 0.3s ease-out;
   display: flex;
   align-items: center;
   justify-content: center;
   margin: 0 0.5rem;
}
```

Após a configuração, basta selecionar o trecho de código que deseja ordenar e segurar o `Ctrl`, pressionar e soltar a tecla `A` e então pressionar e soltara tecla `C` e então soltar a tecla `Ctrl`, o resultado será o seguinte:

```css
.some-class {
   cursor: pointer;
   display: flex;
   justify-content: center;
   margin: 0 0.5rem;
   opacity: 0.5;
   transition: all 0.3s ease-out;
}
```

Se quiser inverter esta ordem, basta trocar o `A` pelo `D` no comando anterior.

Cabe ainda ressaltar que isso funciona para qualquer conjunto de linhas do VS Code.