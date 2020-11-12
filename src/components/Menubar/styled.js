import styled from "styled-components"
import media from "styled-media-query"

import AniLink from "gatsby-plugin-transition-link/AniLink"

export const MenuBarWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  right: 0;
  justify-content: space-between;

  height: 100vh;
  width: 3.75rem;
  padding: 0.8rem 0;
  border-left: 1px solid var(--borders);
  background: var(--mediumBackground);

  text-align: center;
  transition: background 0.5s;

  ${media.lessThan("large")`
    border-top: 1px solid var(--borders);
    bottom: 0;
    flex-direction: row;
    height: auto;
    padding: 0;
    position: fixed;
    width: 100%;
  `}
`

export const MenuBarGroup = styled.div`
  display: flex;
  flex-direction: column;

  ${media.lessThan("large")`
    flex-direction: row;
  `}
`

export const MenuBarLink = styled(AniLink)`
  display: block;

  &.active {
    span {
      color: var(--highlight);
    }
  }
`

export const MenuBarItem = styled.span`
  color: var(--texts);
  cursor: pointer;
  display: block;
  height: 3.75rem;
  width: 3.75rem;
  padding: 1.1rem;
  transition: color 0.5s;

  &.light {
    color: #d4d400;

    &:hover {
      color: #e2e240;
    }
  }

  &:hover {
    color: var(--highlight);
  }

  &.display {
    ${media.lessThan("large")`
      display: none;
    `}
  }
  ${media.greaterThan("large")`
    &:hover {
      color: var(--highlight);
    }
  `}
  ${media.lessThan("large")`
    height: 3.2rem;
    padding: .9rem;
    position: relative;
    width: 3.2rem;
  `}
`