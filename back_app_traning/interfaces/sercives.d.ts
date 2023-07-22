interface ISendMailServicesProps {
  emails: string[];
  subject: string;
  text: string;
  html?: string;
  messageReturn?: string;
}

interface ISendMailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  }
}

interface ISendMailReturn {
  error: boolean;
  success: boolean;
  message: string;
}
