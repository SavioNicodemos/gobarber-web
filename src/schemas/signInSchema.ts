import { z } from 'zod';

export default z.object({
  email: z
    .string()
    .email('Digite um e-mail válido')
    .min(1, 'E-mail obrigatório'),
  password: z
    .string()
    .min(1, 'Senha obrigatória')
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
});
