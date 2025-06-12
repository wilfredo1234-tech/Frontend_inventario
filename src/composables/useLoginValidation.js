import { ref } from 'vue';
import { loginSchema } from '@/validations/loginSchema';

export function useLoginValidation() {
  const validationErrors = ref({});

  const validateForm = (formData) => {
    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      validationErrors.value = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        validationErrors.value[field] = issue.message;
      });
      return false;
    }
    validationErrors.value = {};
    return true;
  };

  return {
    validationErrors,
    validateForm,
  };
}
