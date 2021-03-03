import React, { useState } from 'react';
import PropTypes from 'prop-types';
import translate from '../../common/decorators/translate';

const NicknameForm = ({ submitNickname, t }) => {
  const [ nickname, setNickname ] = useState('');

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
  submitNickname: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default translate()(NicknameForm);
