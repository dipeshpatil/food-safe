import React, { Fragment } from 'react';
import clsx from 'clsx';

import { Container } from 'react-bootstrap';

const isDark = false;

const DEFAULT_OPTIONS = {
  fluidContainer: true,
  excludeNavbar: false,
  excludeFooter: false,
  useContainer: true,
  additionalClasses: [isDark && 'dark-page'],
};

function BasePage({ children, pageOptions = DEFAULT_OPTIONS }) {
  const {
    // excludeNavbar,
    // excludeFooter,
    fluidContainer,
    // useContainer,
    // navBarOptions,
    // additionalClasses,
  } = pageOptions;
  return (
    <Fragment>
      <Container
        className={clsx([...DEFAULT_OPTIONS.additionalClasses])}
        fluid={fluidContainer ?? DEFAULT_OPTIONS.fluidContainer}
      >
        {children}
      </Container>
    </Fragment>
  );
}

export default BasePage;
