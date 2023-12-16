import { useState } from "react";
import { FormControl, Input, Button, Text, WarningOutlineIcon, Stack } from "native-base";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useAuthUserContext } from "@src/context/AuthUserContext";

export const FormLoginUser = () => {
  const [loading, setLoading] = useState(false);
  
  const { loginUser } = useAuthUserContext();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email("Email Invalido.")
        .max(255)
        .required("Email é obrigatório."),
      password: Yup
        .string()
        .min(5, "Senha não pode ser menor que 5 caracteres.")
        .max(255, "Senha não pode ser maior que 255 caracteres.")
        .required("Senha é obrigatória.")
    }),
    onSubmit: async (values) => {
      setLoading(true);
      await loginUser(values);
      setLoading(false);
    },
  });

  return (
    <Stack space={3}>
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
          type="password"
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
        isLoading={loading}
      >
        <Text fontSize="lg" fontWeight="semibold" color="white">ENTRAR</Text>
      </Button>
    </Stack>
  );
};
