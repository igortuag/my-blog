import React from "react"

import Layout from "../components/Layout/"
import SEO from "../components/seo"

import { MainContent } from "../components/AboutPage/styled"
import SocialLinks from "../components/SocialLinks"

const AboutPage = () => (
  <Layout>
    <SEO
      title="Sobre mim"
      description="Conheça um pouco sobre o desenvolvedor Igor Tuag"
    />
    <MainContent>
      <h1>Sobre mim</h1>
      <p>
        Me chamo Igor Tuag, nasci em Ariquemes/RO e sou um desenvolvedor de soluções através de softwares. Atuo pricipalmente no{" "}
        <a
          href="https://tgmarinho.github.io/resume/"
          rel="noopener noreferrer"
          target="_blank"
        >
        desenvolvimento
        </a>
        {" "}web front-end e desktop.
      </p>

      <p>
        Apesar de ser formado em Engenharia Civil, a paixão por desenvolvimento de softwares falou mais alto. Desde então, tenho me dedicado em aprimorar meus conhecimentos e abraçar de vez esta maravilhosa área da tecnologia da informação.
      </p>

      <p>
        Hoje moro em Vila Velha/ES e faço parte do time de desenvolvedores da {" "}
        <a
          href="https://uppersoft.com.br/"
          rel="noopener noreferrer"
          target="_blank"
        >
        Uppersoft
        </a>
        {" "}, atuando principalmente com as seguintes tecnologias: JavaScript e seus frameworks como Vue e Electron, HTML e CSS com pré-processadores.
      </p>

      <p>Sou muito bem casado e feliz com minha esposa{" "}
        <a
          href="https://www.linkedin.com/in/polyanetuag/"
          rel="noopener noreferrer"
          target="_blank"
        >
        Polyane,
        </a>
        {" "}
        que também é desenvolvedora.</p>

      <p>
        Nas horas vagas, gosto de caminhar na praia, ler livros, assistir um bom filme ou série, e receber e compartilhar conhecimento.
      </p>

      <h2>Experiências</h2>

      <p>
        Um curioso por natureza, já tive contato com diversas tecnologias. Desde infra estrutura, com manutenção de computadores, gerenciamento de banco de dados (SQL, PostGress, MySQL...), dockers, criação de APIs com C# .net, node JS, mobile com react native e fluter, até o frontend, onde me encontro hoje e me sinto muito satisfeito. 
      </p>

      <h2>Contato</h2>

      <p>
        Você pode entrar em contato comigo através de qualquer uma das minhas
        redes sociais.
      </p>

      <SocialLinks />
    </MainContent>
  </Layout>
)

export default AboutPage