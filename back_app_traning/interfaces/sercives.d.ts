interface ISendMailServicesProps {
  emails: string[];
  subject: string;
  text: string;
  html?: string;
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
