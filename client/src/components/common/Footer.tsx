import { 
  TwitterLogo, 
  InstagramLogo, 
  GithubLogo 
} from "phosphor-react"

export function Footer(){
  return (
    <div className="p-8 bg-primaryColor-640">
        <h1 className="text-2xl text-white">
          TheBestFoods
        </h1>
        <p className="text-white py-4">
          Todos os direitos reservados à TheBestFoods©
        </p>
        <ul className="flex py-4 gap-2">
          <li>
            <a href="">
              <InstagramLogo
                width={35}
                height={35}
                className="text-zinc-50 hover:text-zinc-200 duration-200"
              />
            </a>
          </li>
          <li>
            <a href="">
              <TwitterLogo
                width={35}
                height={35}
                className="text-zinc-50 hover:text-zinc-200 duration-200"
              />
            </a>
          </li>
          <li>
            <a href="">
              <GithubLogo
                width={35}
                height={35}
                className="text-zinc-50 hover:text-zinc-200 duration-200"
              />
            </a>
          </li>
        </ul>
    </div>
  )
}