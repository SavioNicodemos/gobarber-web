import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import signInSchema from '../../schemas/signInSchema';
import { AnimationContainer, Background, Container, Content } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(signInSchema),
  });

  const submitForm = useCallback(
    async (data: SignInFormData) => {
      try {
        await signIn({
          email: data.email,
          password: data.password,
        });

        navigate('/dashboard');
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [signIn, addToast, navigate],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <form onSubmit={handleSubmit(submitForm)}>
            <h1>Faça seu login</h1>

            <Controller
              name="email"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  icon={FiMail}
                  placeholder="E-mail"
                  error={error?.message}
                  autoComplete="email"
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  icon={FiLock}
                  type="password"
                  placeholder="Senha"
                  error={error?.message}
                  autoComplete="current-password"
                />
              )}
            />

            <Button type="submit">Entrar</Button>

            <Link to="/forgot-password">Esqueci minha senha</Link>
          </form>

          <Link to="signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
