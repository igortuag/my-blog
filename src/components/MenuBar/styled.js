import styled from "styled-components"
import { Link } from "gatsby"

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
  border-left: 1px solid #38444d;
  background: #192734;

  text-align: center;
`

export const MenuBarGroup = styled.div`
  display: flex;
  flex-direction: column;
`

export const MenuBarLink = styled(Link)`
  display: block;
`

export const MenuBarItem = styled.span`
  color: #8899a6;
  cursor: pointer;
  display: block;
  height: 3.75rem;
  width: 3.75rem;
  padding: 1.1rem;
  transition: color 0.5s;

  &:hover {
    color: #1fa1f2;
  }
`