import styled from "styled-components"
import media from "styled-media-query"

export const SidebarWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;

  height: 100vh;
  width: 20rem;
  padding: 2rem;
  border-right: 1px solid var(--borders);
  background: var(--mediumBackground);
  
  text-align: center;

  ${media.lessThan("large")`
    align-items: flex-start;
    height: auto;
    padding: 1rem 2rem;
    width: 100%;
  `}
`
