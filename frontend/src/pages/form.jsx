import * as yup from 'yup';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import React from 'react';

export const AuthorizationForm = () => {
  const schema = yup.object().shape({
    nickname: yup.string().min(3, 'Недостаточно символов').required('Нужно заполнить'),
    password: yup.string().min(6, 'Недостаточно символов').required('Нужно заполнить')
  })
  return (
    <><h1 className="text-center">Введите имя</h1>
    <Formik
          validationSchema={schema}
          initialValues={{ nickname: "", password: "" }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            resetForm();
          }}
      >
          {({ handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formAuthorization">
                      <Form.Control type="text"
                          name="nickname"
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