import { 
  useState, 
  ComponentProps,
  ElementType
} from "react";


interface IProps extends ComponentProps<"input"> {
  name: string;
  icon: ElementType;
  isActiveClasses: ComponentProps<"div">["className"];
  divClasses?: ComponentProps<"div">["className"];
};

export function Input({ 
  name,
  icon: Icon,
  isActiveClasses,
  divClasses,
  ...props
}: IProps){
  const [ active, setActive ] = useState<boolean>(false);

  return (
    <div className={`flex items-center rounded-lg duration-200 w-[60vw] max-w-[15rem] ${active ? isActiveClasses : "bg-white"} ${divClasses ?? ""}`}>
      <input 
        type={props.type} 
        required
        value={props.value}
        onChange={props.onChange}
        minLength={props.minLength ?? 6}
        maxLength={props.maxLength}
        className={`w-[100%] place-self-center outline-none rounded-lg pl-2 py-2`}
        placeholder={props.placeholder}
        onSelect={() => setActive(true)}
        onBlur={() => setActive(false)}
        {...props}
      />
      <Icon width={35} />
    </div>
  )
}
