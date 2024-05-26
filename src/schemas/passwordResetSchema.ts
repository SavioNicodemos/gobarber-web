import { z } from 'zod';

const passwordSchema = z.object({
  password: z.string().min(6, 'Senha obrigatória'),
  password_confirmation: z.string(),
});

export default passwordSchema.refine(
  data => data.password === data.password_confirmation,
  {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
  },
);
