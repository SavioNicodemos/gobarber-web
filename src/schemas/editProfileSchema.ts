import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string()
    .email('Digite um e-mail válido')
    .required('E-mail obrigatório'),
  old_password: Yup.string(),
  password: Yup.string().when('old_password', ([old_password], innerSchema) => {
    return old_password
      ? innerSchema.required('Campo obrigatório')
      : innerSchema.notRequired();
  }),
  password_confirmation: Yup.string()
    .when('old_password', ([old_password], innerSchema) => {
      return old_password
        ? innerSchema.required('Campo obrigatório')
        : innerSchema.notRequired();
    })
    .oneOf([Yup.ref('password')], 'Confirmação incorreta'),
});
