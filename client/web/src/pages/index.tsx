import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { Start } from '@/components/home/Start';
import { About } from '@/components/home/About';
import { Services } from '@/components/home/Services';

import { Contacts } from '@/components/home/Contacts';
import { GradientLine } from '@/components/common/GradientLine';
import Head from 'next/head';

function Home () {
  return (
    <>
      <Head>
        <title>ConSciência - início</title>
        <meta
          name="description"
          content="Seja bem-vindo ao blog."
        />
      </Head>
      <div className="grid w-screen min-h-screen relative">
        <Header/>
        <main className="grid place-items-center place-content-center w-screen min-h-screen gap-24">
          <Start/> 
          <About/>
          <GradientLine/>
          <Services/>
          <GradientLine/>
          <Contacts/>
          <GradientLine/>
        </main>
        <Footer/>
      </div>
    </>
  )
}

export default Home;
