import React from 'react';
import { Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import translation from '../decorators/translate';

const Footer = ({ t }) => (
  <footer className="row justify-content-md-center bg-dark">
    <div className="col-md-6">
      <p className="text-center text-white mt-3">
        <Trans
          defaults="footer.copyright"
          values={{ date: new Date().getFullYear() }}
          components={<a href="http://github.com/artyMh" className="badge badge-light"></a>}
        />
      </p>
    </div>
  </footer>
);

Footer.propTypes = {
  t: PropTypes.func.isRequired
};

export default translation()(Footer);
