import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'El correo es obligatorio' })
    .nonempty('El correo es obligatorio')
    .email('Correo no válido'),

  password: z
    .string({ required_error: 'La contraseña es obligatoria' })
    .nonempty('La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});
