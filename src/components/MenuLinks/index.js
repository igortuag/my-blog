import React from "react"

import links from "./content"

import * as S from "./styled"
import getThemeColor from '../../utils/getThemeColor'

const MenuLinks = () => (
  <S.MenuLinksWrapper>
    <S.MenuLinksList>
      {links.map((link, i) => (
        <S.MenuLinksItem key={i}>
          <S.MenuLinksLink
            to={link.url}
            direction="left"
            cover
            bg={getThemeColor()}
            duration={0.6}
            activeClassName="active"
          >
            {link.label}
          </S.MenuLinksLink>
        </S.MenuLinksItem>
      ))}
    </S.MenuLinksList>
  </S.MenuLinksWrapper>
)

export default MenuLinks
