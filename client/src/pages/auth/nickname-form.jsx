import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const NicknameForm = ({ submitNickname }) => {
  const [ nickname, setNickname ] = useState('');
  const { t } = useTranslation();

  const submit = (e) => {
    e.preventDefault();
    submitNickname(nickname);
  };

  return (
    <form onSubmit={submit}>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">@</span>
        </div>
        <input
          id="nickname"
          type="text"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          className="form-control"
          placeholder={t('auth.form.inputPlaceholder')}
          aria-label={t('auth.form.inputPlaceholder')}
          aria-describedby="basic-addon1" />
      </div>
  <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={nickname.length < 3}>{t('auth.form.buttonText')}</button>
    </form>
  );
};

NicknameForm.propTypes = {
  submitNickname: PropTypes.func.isRequired
};

export default NicknameForm;
