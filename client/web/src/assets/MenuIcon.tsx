import { props } from './propsTypes';

export const MenuIcon = ({primaryColor}: props) => {
  return (
    <svg width="32" height="32">
      <path d="M 1 11 L 50 11 C 51 12 51 13 50 14 L 1 14 C 0 13 0 12 1 11 M 1 19 L 50 19 C 51 20 51 21 50 22 L 1 22 C 0 21 0 20 1 19 M 1 27 L 50 27 C 51 28 51 29 50 30 L 1 30 C 0 29 0 28 1 27" fill={primaryColor}/>  
    </svg>
  )
};