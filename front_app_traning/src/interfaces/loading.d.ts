type EnumColorLoading = "inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning";

interface ITextLoadingButton {
  text: string;
  isLoading: boolean,
  size?: number,
  color?: string,
}

interface ILoadingText {
  text?: string;
  size?: number;
  color?: EnumColorLoading;
}
