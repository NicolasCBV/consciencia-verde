import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button } from "../common/Button";

export function Start() {
  const routes = useRouter();

  return (
    <div className="grid w-[100vw] max-w-[25rem] place-self-center text-center pt-[4.5rem] px-8 pb-[3.2rem] relative tablet:grid-cols-2 tablet:max-w-[80vw] tablet:h-[90vh] tablet:gap-16 tablet:pt-[8rem]">
      <div id="image">
        <Image 
          className="rounded-xl object-cover"
          src="https://images.unsplash.com/photo-1602777778160-73bbd50ab756?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" 
          alt="cooker working"
          height="240"
          width="350"
        />
      </div>
      <div id="text" className="grid relative place-content-center">
        <h1 className="text-2xl mt-4 mb-4 tablet:text-md">
          O melhor da cidade!!!
        </h1>
        <p className="tablet:text-sm">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet omnis porro voluptatibus molestiae recusandae repudiandae ut possimus rem reprehenderit saepe quod excepturi sapiente nulla molestias nesciunt rerum, expedita error odit.
        </p>
        <Button
          name="Desfrutar"
          type="button"
          onClick={() => routes.push("/news")}
        />
      </div>
    </div>
  )
}
