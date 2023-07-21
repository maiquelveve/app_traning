interface EncryptPasswordProps {
  password: string;
}

interface DecryptPasswordProps {
  passwordUser: string;
  passwordHashDB: string;
}

interface GeneretorTokenProps {
  user_id: number;
}
