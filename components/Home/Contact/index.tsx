import { Fragment, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Item from './Item';
import { get } from 'lodash';
import axios from 'axios';
import { Contact } from '../../../types/Contact';

type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact = () => {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setSent(false);

    axios
      .post<Contact>('/contacts', data, {
        baseURL: process.env.API_URL,
      })
      .then((response) => {
        setSent(true);
        reset();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section id="contact">
      <h2>Entre em Contato</h2>

      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <header className="page-title">
            <h1>Formulário</h1>
            <hr />
          </header>

          <p>Envie o formulário abaixo para entrar em contato conosco.</p>

          {Object.keys(errors).length > 0 && (
            <div className="alert danger">
              {Object.keys(errors).map((key) => (
                <Fragment key={key}>
                  {get(errors, `${key}.message`, 'Confira as informações')}{' '}
                  &nbsp;
                </Fragment>
              ))}
            </div>
          )}

          {sent && (
            <div className="alert success">Contato enviado com sucesso</div>
          )}

          <div className="fields">
            <div className="field">
              <input
                type="text"
                id="name"
                {...register('name', {
                  required: 'O campo nome é obrigatório',
                })}
              />
              <label htmlFor="name">Nome Completo</label>
            </div>
            <div className="field">
              <input
                type="email"
                id="email"
                {...register('email', {
                  required: 'O campo e-mail é obrigatório',
                })}
              />
              <label htmlFor="email">E-mail</label>
            </div>
          </div>
          <div className="field">
            <textarea
              id="message"
              {...register('message', {
                required: 'O campo messagem é obrigatório',
              })}
            ></textarea>
            <label htmlFor="message">Mensagem</label>
          </div>
          <div className="actions">
            <button type="submit">Enviar</button>
          </div>
        </form>
        <div id="map"></div>
      </section>
      <hr className="divider" />
      <ul className="contacts">
        <Item
          image="/images/icon-google-place.svg"
          title="OUR HEADQUARTERS"
          text="Modena, Itália"
        ></Item>
        <Item
          image="/images/icon-phone.svg"
          title="SPEAK TO US"
          text="(123) 456 7890"
        ></Item>
        <Item
          image="/images/icon-skype.svg"
          title="MAKE A VIDEO CALL"
          text="FerrariOnSkype"
        ></Item>
        <Item
          image="/images/icon-twitter.svg"
          title="FOLLOW ON TWITTER"
          text="2.3M Followers"
        ></Item>
      </ul>
    </section>
  );
};

export default Contact;
