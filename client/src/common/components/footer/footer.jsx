import React from 'react';
import { Trans } from 'react-i18next';

const Footer = () => (
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

export default Footer;
