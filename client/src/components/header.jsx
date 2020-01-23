import React from 'react';
import PropTypes from 'prop-types';
import translation from '../decorators/translate';

const Header = ({ i18n, t }) => {
  const { language } = i18n;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand mr-auto mr-lg-0" href="#">{t('header.title')}</a>
      <button type="button" className={`btn btn-${language !== 'en' ? 'outline-' : ''}light mr-3`} onClick={() => changeLanguage('en')}>EN</button>
      <button type="button" className={`btn btn-${language !== 'lv' ? 'outline-' : ''}light mr-3`} onClick={() => changeLanguage('lv')}>LV</button>
      <button type="button" className={`btn btn-${language !== 'ru' ? 'outline-' : ''}light`} onClick={() => changeLanguage('ru')}>RU</button>
    </nav>
  );
};

Header.propTypes = {
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default translation()(Header);
