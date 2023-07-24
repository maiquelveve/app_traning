import { sendMail } from "../../../src/services";

describe("HELPERS - Send Mail Helpers", () => {

  let result: ISendMailReturn;
  const myMessageReturn = "Email teste enviado";
  const emailConfigTest = {
    emails: "test@test.com",
    subject: "Test Unit Send Mail",
    text: "Teste send Mail",
    messageReturn: myMessageReturn,
    html: "<p>Teste Send Mail</>"
  };

  beforeAll(async () => {
    result = await sendMail({
      emails: [emailConfigTest.emails],
      subject: emailConfigTest.subject,
      text: emailConfigTest.text,
      messageReturn: emailConfigTest.messageReturn,
      html: emailConfigTest.html
    });
  });

  it("it should be possible to send Email", async () => {
    expect(result.success).toBeTruthy();
  });

  it("it should be possible to send Email and return my message", async () => {
    expect(myMessageReturn).toEqual(result.message);
  });

  it("it should be possible to send email without the non-mandatory properties", async () => {
    const result = await sendMail({
      emails: [emailConfigTest.emails],
      subject: emailConfigTest.subject,
      text: emailConfigTest.text,
    });

    expect(result.success).toBeTruthy();
  });

  it("not it should be possible to send Email without an 'email'", async () => {
    const result = await sendMail({
      emails: [],
      subject: emailConfigTest.subject,
      text: emailConfigTest.text,
    });

    expect(result.error).toBeTruthy();
  });

  it("not it should be possible to send Email without an 'subject'", async () => {
    const result = await sendMail({
      emails: [emailConfigTest.emails],
      subject: "",
      text: emailConfigTest.text,
    });

    expect(result.error).toBeTruthy();
  });

  it("not it should be possible to send Email without an 'text'", async () => {
    const result = await sendMail({
      emails: [emailConfigTest.emails],
      subject: emailConfigTest.subject,
      text: "",
    });

    expect(result.error).toBeTruthy();
  });
});
