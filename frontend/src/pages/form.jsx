import * as yup from 'yup';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useRef, useEffect } from 'react';
import axios from 'axios';

const addProxy = (url) => {
  const urlWithProxy = new URL('/get', 'https://allorigins.hexlet.app');
  urlWithProxy.searchParams.set('url', url);
  urlWithProxy.searchParams.set('disableCache', 'true');
  return urlWithProxy.toString();
};

export const AuthorizationForm = () => {
  const inputNick = useRef();
  useEffect(() => {
    inputNick.current.focus();
  });
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
              const response = await axios.post(addProxy('/api/v1/login'), {username: values.name, password: values.password});
              console.log(response);
            } catch (e) {
              console.log(e);
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
                          isInvalid={!!errors.nickname} />
                      </Form.Group>
                  <Form.Group className="mb-3" controlId="formAuthorization1">
                      <Form.Control type="password"
                          name="password"
                          placeholder="Введите пароль"
                          onChange={handleChange}
                          value={values.password}
                          isValid={touched.password && !errors.password}
                          isInvalid={!!errors.password} />
                      </Form.Group>
                  <Button variant="primary" type="submit" disabled={isSubmitting}>
                      Отправить
                  </Button>
              </Form>
          ) }
    </Formik></>
  )
}