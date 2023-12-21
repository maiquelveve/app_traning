
interface IMenusGeneratorProps {
  tag: string;
  title: string;
  description: string;
  navigationRoute: EnumRoutesSystem;
  Icon: (props: any) => React.JSX.Element;
}
