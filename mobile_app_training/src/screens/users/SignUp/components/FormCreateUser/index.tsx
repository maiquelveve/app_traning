import { FormControl, Input, Button, Text, WarningOutlineIcon, Stack } from "native-base";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuthUserContext } from "@src/context/AuthUserContext";

export const FormCreateUser = () => {

  const { createUser } = useAuthUserContext();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      // name: Yup
      //   .string()
      //   .min(3, "Nome deve conter 3 caracteres no mínimo.")
      //   .max(50, "Nome deve conter 50 caracteres no máximo.")
      //   .required("Nome é obrigatório."),
      // email: Yup
      //   .string()
      //   .email("Email Invalido.")
      //   .max(255)
      //   .required("Email é obrigatório."),
      // password: Yup
      //   .string()
      //   .min(5, "Senha não pode ser menor que 5 caracteres.")
      //   .max(255, "Senha não pode ser maior que 255 caracteres.")
      //   .required("Senha é obrigatória.")
    }),
    onSubmit: async (values) => {
    

      await createUser(values);
      // alert();
    },
  });

  return (
    <Stack space={3}>
      <FormControl isInvalid={!!formik.touched.name && !!formik.errors.name} >
        <FormControl.Label>Nome</FormControl.Label>
        <Input
          placeholder="Informe o Nome"
          onChangeText={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
          value={formik.values.name}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {formik.touched.name && formik.errors.name}
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!formik.touched.email && !!formik.errors.email} >
        <FormControl.Label>Email</FormControl.Label>
        <Input
          placeholder="Email"
          onChangeText={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          value={formik.values.email}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {formik.touched.email && formik.errors.email}
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!formik.touched.password && !!formik.errors.password} >
        <FormControl.Label>Senha</FormControl.Label>
        <Input
          placeholder="Informe a Senha"
          onChangeText={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          value={formik.values.password}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {formik.touched.password && formik.errors.password}
        </FormControl.ErrorMessage>
      </FormControl>
            
      <Button 
        mt="2" 
        size="lg" 
        onPress={formik.submitForm} 
        variant="solid"
      >
        <Text fontSize="lg" fontWeight="semibold" color="white">CADASTRAR</Text>
      </Button>
    </Stack>
  );
};
