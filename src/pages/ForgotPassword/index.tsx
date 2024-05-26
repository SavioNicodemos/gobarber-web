import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useToast } from '../../hooks/toast';
import mandatoryEmailSchema from '../../schemas/mandatoryEmailSchema';
import api from '../../services/api';
import { AnimationContainer, Background, Container, Content } from './styles';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  const { control, handleSubmit } = useForm<ForgotPasswordFormData>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(mandatoryEmailSchema),
  });

  const formSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);

        await api.post('/password/forgot', { email: data.email });

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na Recuperação de senha',
          description:
            'ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <form onSubmit={handleSubmit(formSubmit)}>
            <h1>Recuperar senha</h1>

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

            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </form>

          <Link to="/">
            <FiArrowLeft />
            Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
