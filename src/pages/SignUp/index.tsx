import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useToast } from '../../hooks/toast';
import signUpSchema from '../../schemas/signUpSchema';
import api from '../../services/api';
import { AnimationContainer, Background, Container, Content } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const { addToast } = useToast();
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<SignUpFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(signUpSchema),
  });

  const submitForm = useCallback(
    async (data: SignUpFormData) => {
      try {
        await api.post('/users', data);

        navigate('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Você já pode fazer seu login no GoBarber',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer seu cadastro, tente novamente',
        });
      }
    },
    [addToast, navigate],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <form onSubmit={handleSubmit(submitForm)}>
            <h1>Faça seu cadastro</h1>

            <Controller
              name="name"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  icon={FiUser}
                  placeholder="Nome"
                  error={error?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  icon={FiMail}
                  placeholder="E-mail"
                  error={error?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  icon={FiLock}
                  placeholder="Senha"
                  type="password"
                  autoComplete="new-password"
                  error={error?.message}
                  {...field}
                />
              )}
            />

            <Button type="submit">Cadastrar</Button>
          </form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
