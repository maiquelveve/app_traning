import { Box, Heading, VStack, FormControl, Input, Button, ScrollView, Text, WarningOutlineIcon } from "native-base";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Layout } from "@src/components/Layout";

export const SignUp = () => {
  
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .min(3, "Nome deve conter 3 caracteres no mínimo.")
        .max(50, "Nome deve conter 50 caracteres no máximo.")
        .required("Nome é obrigatório."),
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
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Layout headerType={"TAB"}>
      <ScrollView w={"full"}>
        <Box>
          <Heading size="lg" color="coolGray.800" _dark={{ color: "warmGray.50" }} fontWeight="semibold" textAlign="center">
            CADASTRAR
          </Heading>
          <Heading mt="1" color="coolGray.600" _dark={{ color: "warmGray.200" }} fontWeight="medium" size="xs" textAlign="center">
            Crie um conta!
          </Heading>
          <VStack space={3} mt="5">            
            <FormControl isInvalid={!!formik.errors.name} >
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

            <FormControl isInvalid={!!formik.errors.email} >
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

            <FormControl isInvalid={!!formik.errors.password} >
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
              // disabled={!!formik.errors}
            >
              <Text fontSize="lg" fontWeight="semibold" color="white">CADASTRAR</Text>
            </Button> 
          </VStack>
        </Box>
      </ScrollView>
    </Layout>
  );
};
