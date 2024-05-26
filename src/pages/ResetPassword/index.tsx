import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FiLock } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useToast } from '../../hooks/toast';
import passwordResetSchema from '../../schemas/passwordResetSchema';
import api from '../../services/api';
import { AnimationContainer, Background, Container, Content } from './styles';

interface ResetPasswordFormData {
  password: string;
  password_confirmation?: string;
}

const ResetPassword: React.FC = () => {
  const { addToast } = useToast();

  const { control, handleSubmit } = useForm<ResetPasswordFormData>({
    defaultValues: {
      password: '',
      password_confirmation: '',
    },
    resolver: yupResolver(passwordResetSchema),
  });

  const navigate = useNavigate();
  const location = useLocation();

  const submitForm = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        navigate('/');
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description:
            'Ocorreu um erro ao tentar resetar sua senha, tente novamente.',
        });
      }
    },
    [addToast, navigate, location],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <form onSubmit={handleSubmit(submitForm)}>
            <h1>Resetar senha</h1>

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  icon={FiLock}
                  type="password"
                  placeholder="Nova senha"
                  error={error?.message}
                  {...field}
                />
              )}
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />

            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmação da senha"
            />

            <Button type="submit">Alterar senha</Button>
          </form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
