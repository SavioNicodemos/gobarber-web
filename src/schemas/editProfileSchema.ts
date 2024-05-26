import { z } from 'zod';

const baseSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  email: z
    .string()
    .min(1, 'E-mail obrigatório')
    .email('Digite um e-mail válido'),
  old_password: z.string().optional(),
  password: z.string().optional(),
  password_confirmation: z.string().optional(),
});

const filledFieldsSchema = baseSchema.refine(
  data => {
    const old = !!data.old_password;
    const password = !!data.password;
    const confirm = !!data.password_confirmation;

    return (old && password && confirm) || (!old && !password && !confirm);
  },
  {
    message: 'Na mudança de senha, todos os campos são obrigatórios',
    path: ['old_password'],
  },
);

export default filledFieldsSchema.refine(
  data => {
    if (data.password === data.password_confirmation) {
      return true;
    }

    return false;
  },
  {
    message: 'Senhas não coincidem',
    path: ['password_confirmation'],
  },
);
