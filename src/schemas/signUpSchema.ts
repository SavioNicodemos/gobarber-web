import { z } from 'zod';

export default z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  email: z
    .string()
    .min(1, 'E-mail obrigatório')
    .email('Digite um e-mail válido'),
  password: z
    .string()
    .min(1, 'Senha obrigatória')
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
});
