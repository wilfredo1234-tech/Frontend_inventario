import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({ required_error: "El nombre es obligatorio." })
      .min(1, "El nombre es obligatorio.")
      .max(100, "El nombre no puede tener más de 100 caracteres.")
      .regex(/^[a-zA-Z\s]+$/, "El nombre solo puede contener letras y espacios."),
    
    email: z
      .string({ required_error: "El correo es obligatorio." })
      .min(1, "El correo es obligatorio.")
      .email("El correo no es válido."),
    
    password: z
      .string({ required_error: "La contraseña es obligatoria." })
      .min(6, "La contraseña debe tener al menos 6 caracteres.")
      .regex(/[A-Z]/, "La contraseña debe tener al menos una letra mayúscula.")
      .regex(/[a-z]/, "La contraseña debe tener al menos una letra minúscula.")
      .regex(/[0-9]/, "La contraseña debe tener al menos un número.")
      .regex(/[@$!%*?&]/, "La contraseña debe tener al menos un carácter especial."),
    
    password_confirmation: z
      .string({ required_error: "Debes confirmar la contraseña." }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "La confirmación de contraseña no coincide.",
    path: ["password_confirmation"],
  });
