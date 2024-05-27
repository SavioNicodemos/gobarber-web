import { zodResolver } from '@hookform/resolvers/zod';
import React, { ChangeEvent, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import { Image } from '../../components/Image';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import editProfileSchema from '../../schemas/editProfileSchema';
import api from '../../services/api';
import { AvatarInput, Container, Content } from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  old_password?: string;
  password?: string;
  password_confirmation?: string;
}

const Profile: React.FC = () => {
  const { addToast } = useToast();
  const navigate = useNavigate();

  const { user, updateUser } = useAuth();

  const { handleSubmit, control } = useForm<ProfileFormData>({
    defaultValues: {
      name: user.name,
      email: user.email,
      old_password: '',
      password: '',
      password_confirmation: '',
    },
    resolver: zodResolver(editProfileSchema),
  });

  const submitForm = useCallback(
    async (data: ProfileFormData) => {
      try {
        const { name, email, old_password, password, password_confirmation } =
          data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        navigate('/dashboard');

        addToast({
          type: 'success',
          title: 'Perfil Atualizado',
          description: 'Suas informações foram atualizadas com sucesso',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description: 'Ocorreu um erro ao atualizar perfil, tente novamente',
        });
      }
    },
    [addToast, navigate, updateUser],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch('/users/avatar', data).then(response => {
          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Avatar atualizado',
          });
        });
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <form onSubmit={handleSubmit(submitForm)}>
          <AvatarInput>
            <Image src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />

              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <h1>Meu perfil</h1>

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
            name="old_password"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                containerStyle={{ marginTop: 24 }}
                icon={FiLock}
                type="password"
                placeholder="Senha atual"
                autoComplete="new-password"
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
                type="password"
                placeholder="Nova senha"
                error={error?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="password_confirmation"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                icon={FiLock}
                type="password"
                placeholder="Confirmação de senha"
                error={error?.message}
                {...field}
              />
            )}
          />

          <Button type="submit">Confirmar mudanças</Button>
        </form>
      </Content>
    </Container>
  );
};

export default Profile;
