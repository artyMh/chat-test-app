import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';

const NicknameForm = memo(function NicknameForm({ submitNickname }) {
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
        <input id="nickname" type="text" value={nickname} onChange={e => setNickname(e.target.value)} className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
      </div>
      <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={nickname.length < 3}>Connect</button>
    </form>
  );
});

export default NicknameForm;
