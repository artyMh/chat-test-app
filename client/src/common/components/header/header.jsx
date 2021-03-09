import React from 'react';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="d-flex flex-grow-1">
        <a className="navbar-brand mr-auto mr-lg-0" href="#">{t('header.title')}</a>
      </div>
      <div className="flex-grow-1 text-right">
        <button type="button" className={`btn btn-${language !== 'en' ? 'outline-' : ''}light mr-3`} onClick={() => changeLanguage('en')}>EN</button>
        <button type="button" className={`btn btn-${language !== 'lv' ? 'outline-' : ''}light mr-3`} onClick={() => changeLanguage('lv')}>LV</button>
        <button type="button" className={`btn btn-${language !== 'ru' ? 'outline-' : ''}light`} onClick={() => changeLanguage('ru')}>RU</button>
      </div>
    </nav>
  );
};

export default Header;
