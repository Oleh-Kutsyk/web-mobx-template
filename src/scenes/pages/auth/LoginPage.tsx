/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { useMst } from 'src/store';

// import * as Styled from './styled';

export const LoginPage: React.FC = observer(() => {
  const store = useMst();

  const [name, setname] = useState('');
  const [password, setpassword] = useState('');

  const onSubmit = () => {
    store.auth.loginAsync.run({
      password,
      username: name,
    });
  };

  const onChangeName = (e: any) => {
    setname(e.target.value);
  };
  const onChangePass = (e: any) => {
    setpassword(e.target.value);
  };

  return (
    <div>
      <h1>Welcome to AMPM</h1>
      <h2>Sign in to your account to continue</h2>
      <div>
        <input
          type='text'
          value={name}
          onChange={onChangeName}
          name='name'
          id='name'
        />
        <input
          type='text'
          onChange={onChangePass}
          value={password}
          name='password'
          id='name'
        />
        <button type='button' onClick={onSubmit}>
          login
        </button>
      </div>
    </div>
  );
});
