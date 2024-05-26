import { z } from 'zod';

export default z.object({
  email: z
    .string()
    .email('Digite um e-mail válido')
    .min(1, 'E-mail obrigatório'),
});
