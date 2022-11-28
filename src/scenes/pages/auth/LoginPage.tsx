import React from 'react';
import { observer } from 'mobx-react-lite';
import { Formik, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';

import { useMst } from '../../../stores';

import { FormField } from '../../../components/formField';

import * as Styled from './styled';

interface ILoginFormValue {
  email: string;
  password: string;
}

const minCharacters = 8;
const loginFormSchema = Yup.object().shape({
  password: Yup.string().min(minCharacters).required('Password is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const loginFormInitialValues = {
  password: '',
  email: '',
};

export const LoginPage: React.FC = observer(() => {
  const store = useMst();

  const onSubmit = async (
    { email, password }: ILoginFormValue,
    { setSubmitting }: FormikHelpers<ILoginFormValue>
  ) => {
    await store.auth.loginAsync.run({ username: email, password });
    setSubmitting(false);
  };

  return (
    <Styled.Root>
      <Styled.Title>Welcome to AMPM</Styled.Title>
      <Styled.SubTitle>Sign in to your account to continue</Styled.SubTitle>
      <Styled.FormikWrapper>
        <Formik
          autoComplete='off'
          onSubmit={onSubmit}
          initialValues={loginFormInitialValues}
          validationSchema={loginFormSchema}
        >
          {({ isSubmitting }) => {
            return (
              <Form>
                <FormField
                  type='text'
                  name='email'
                  fullWidth
                  label='Enter your email'
                />
                <FormField
                  type='password'
                  name='password'
                  fullWidth
                  label='Enter your password'
                />
                <Styled.ForgotPassword>
                  Forgot your password?
                </Styled.ForgotPassword>
                <FormField
                  type='checkbox'
                  name='rememberMe'
                  label='Remember me next time'
                />
                <Styled.Submit
                  color='secondary'
                  fullWidth
                  type='submit'
                  disabled={isSubmitting}
                >
                  Submit
                </Styled.Submit>
              </Form>
            );
          }}
        </Formik>
      </Styled.FormikWrapper>
    </Styled.Root>
  );
});
