interface IAlertContext {
  alertCatch: () => void;
  alertResponse: (props: ISettingAlertResponseSystemProps) => void;
}
