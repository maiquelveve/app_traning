interface IAlertProps {
  id: string | number;
  toast: TToast;
}

interface ISettingAlertResponseSystemProps {
  isSuccess: boolean;
  title: string;
  message: string[];
  placement?: TPlacement;
  duration?: number;
  variant?: TVariantAlertSystem;
}

interface IAlertResponseSystemProps extends IAlertProps {
  settings: ISettingAlertResponseSystemProps;
}

type TVariantAlertSystem = "outline" | "solid" | "subtle" | "left-accent" | "top-accent" | "outline-light";
type TPlacement = "top" | "bottom" | "top-right" | "top-left" | "bottom-left" | "bottom-right";
type TToast = {
  show: (props: IToastProps) => any;
  close: (id: any) => void;
  closeAll: () => void;
  isActive: (id: any) => boolean;
}
