import { ref, toRaw } from "vue";
import { registerSchema } from "@/validations/registerSchema";

export function useRegisterValidation() {
  const validationErrors = ref({});

  const validateRegisterForm = (form) => {
    const result = registerSchema.safeParse(toRaw(form));

    if (!result.success) {
      const errors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0];
        if (field && !errors[field]) {
          errors[field] = err.message;
        }
      });
      validationErrors.value = errors;
      return false;
    }

    validationErrors.value = {};
    return true;
  };

  return {
    validateRegisterForm,
    validationErrors,
  };
}
