import { defaultAlert } from ".";

export const catchDefalutAlert = () => {
  defaultAlert({ title: "Ocorreu um erro, tente mais tarde!", type: "error", position: "top-start" });
};
