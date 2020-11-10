import React from "react"
import { graphql } from "gatsby"

const BlogList = ({ data }) => {
  const post = data.markdownRemark

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
    </>
  )
}

export const query = graphql``

export default BlogList
