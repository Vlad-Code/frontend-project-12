import * as yup from 'yup';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import useAuth from '../hooks';

export const AuthorizationForm = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const inputNick = useRef();
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    inputNick.current.focus();
  });
  useEffect(() => {
    const path = '/';
    if (auth.loggedIn) {
      navigate(path);
    }
  }, [auth.loggedIn, navigate]);
  const schema = yup.object().shape({
    nickname: yup.string().min(3, 'Недостаточно символов').required('Нужно заполнить'),
    password: yup.string().min(5, 'Недостаточно символов').required('Нужно заполнить')
  });
  return (
    <><h1 className="text-center">Введите имя</h1>
    <Formik
          validationSchema={schema}
          initialValues={{ nickname: "", password: "" }}
          onSubmit={ async (values, { resetForm }) => {
            console.log(values);
            try {
              const response = await axios.post('/api/v1/login', {username: values.nickname, password: values.password});
              const token = JSON.stringify(response.data);
              console.log(token);
              localStorage.setItem('userId', token);
              auth.logIn();
              console.log(auth.loggedIn);
            } catch (e) {
              console.log(e);
              auth.logOut();
              if (e.isAxiosError && e.response.status === 401) {
                setAuthFailed(true);
                inputNick.current.select();
                return;
              }
              throw e;
            }
            resetForm();
          }}
    >
          {({ handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formAuthorization">
                      <Form.Control type="text"
                          name="nickname"
                          ref={inputNick}
                          placeholder="Введите ник"
                          onChange={handleChange}
                          value={values.nickname}
                          isValid={touched.nickname && !errors.nickname}
                          isInvalid={authFailed} />
                      </Form.Group>
                  <Form.Group className="mb-3" controlId="formAuthorization1">
                      <Form.Control type="password"
                          name="password"
                          placeholder="Введите пароль"
                          onChange={handleChange}
                          value={values.password}
                          isValid={touched.password && !errors.password}
                          isInvalid={authFailed} />
                        <Form.Control.Feedback type="invalid">the username or password is incorrect</Form.Control.Feedback>
                      </Form.Group>
                  <Button variant="primary" type="submit" disabled={isSubmitting}>
                      Отправить
                  </Button>
              </Form>
          ) }
    </Formik></>
  )
}