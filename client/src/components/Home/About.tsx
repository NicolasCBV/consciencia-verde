import Image from "next/image";

import { InvertWave } from "../../assets/InvertWave";
import { Wave } from "../../assets/Wave";


export function About() {
  return (
    <div id="wrapper" className="grid">
      <div id="wave" className="relative tablet:h-[38vh] tablet:w-[100vw]">
        <Wave primaryColor={"#8B7EC9"}/>
      </div>
      <div id="wrapper" className="grid place-content-center bg-primaryColor-600 w-[100vw] h-[72vh]">
        <div className="grid w-[100vw] max-w-[65rem] text-center px-8 py-20 tablet:grid-cols-2 tablet:gap-24">
            <div id="image" className="tablet:grid tablet:max-w-[25rem]">
              <Image
                className="rounded-md"
                src={"https://images.unsplash.com/photo-1631540223537-8f2d49a4ad9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"}
                alt="Food truck"
                height={250}
                width={350}
              />
            </div>
            <div id="text" className="flex flex-col place-content-center text-center tablet:max-w-[25rem]">
              <h1
                className="py-4 text-2xl text-white tablet:text-md"
              >
                Sobre nos
              </h1>
              <p
                className="text-white tablet:text-sm" 
              >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque quibusdam perferendis quisquam quas necessitatibus recusandae libero? Reprehenderit, incidunt ad. Pariatur natus a voluptatem harum facere amet enim tempora odio iusto!
              </p>
            </div>
        </div>
      </div>
      <InvertWave primaryColor={"#8B7EC9"} />
    </div>
  )
}