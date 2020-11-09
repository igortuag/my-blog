import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import PostItem from "../components/PostItem"

const IndexPage = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query postList {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                background
                category
                date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
                description
                title
              }
              timeToRead
            }
          }
        }
      }
    `
  )

  const postList = allMarkdownRemark.edges

  return (
    <Layout>
      <SEO title="Home" />
      {postList.map(
        ({
          node: {
            fields: { slug },
            frontmatter: { background, category, date, description, title },
            timeToRead,
          },
        }) => (
          <PostItem
            slug={slug}
            category={category}
            date={date}
            background={background}
            timeToRead={timeToRead}
            title={title}
            description={description}
          />
        )
      )}
    </Layout>
  )
}
export default IndexPage
