// @flow strict

import React from 'react';
import styled, { type StyledComponent, css } from 'styled-components';

import type { ThemeInterface } from 'theme';
import Version from 'util/Version';
import { IfPermitted } from 'components/common';

import { ExtendedFooter } from 'components/footer';


const StyledFooter: StyledComponent<{}, ThemeInterface, HTMLElement> = styled.footer(({ theme }) => css`
  text-align: center;
  font-size: ${theme.fonts.size.small};
  color: ${theme.colors.gray[70]};
  margin-bottom: 15px;
  height: 20px;

  @media print {
    display: none;
  }
`);

const Footer = () => {
  return (
    <StyledFooter>
      Graylog {Version.getFullVersion()}
        <IfPermitted permissions="buffers:read">
          <ExtendedFooter />
        </IfPermitted>
    </StyledFooter>
  );
};


export default Footer;
