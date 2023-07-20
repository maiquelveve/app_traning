interface IVerifyEmailExistProps {
  email: string;
  typeOperation: "edit" | "create";
}

interface IVerifyEmailExistReturn {
  message: string;
  error: boolean;
}
