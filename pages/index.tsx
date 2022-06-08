import type { NextPage } from 'next'
import Image from 'next/image'
import fin from './fin.png'
import Link from 'next/link'
import { useRouter } from "next/router"
import { useState } from "react"
import Market_list from './component/market_list'
import Trade from './component/trade'
import dynamic from 'next/dynamic'

const Chart= dynamic(() => import("../pages/component/chart_"), {
  ssr: false
});

const Home: NextPage = () => {

  const [page,setPage]:any = useState('Market Diff')
  const [isMarket,setIsmarket]:any = useState(true)
  const [isChart, setIschart]:any = useState(false)
  const [isTrade, setIstrade]:any = useState(false)

  return (
 
      <main className='bg-split overflow:h-screen h-screen'>
        <div className='ss:container  ss:mx-auto py-4'>
          <div className='flex justify-between '>
              <div className='flex items-center space-x-2'>
                  <Image
                    src={fin}
                    alt='Picture Luna'
                    width={42}
                    height={39}/>
                  <div>
                    <span className='text-white'>FINSTABLE</span><br/>
                    <span className='text-blue-400'>Training</span>
                  </div>
              </div>
              <div className="hidden md:flex items-center space-x-10">
							  <button  onClick={(()=>{setIsmarket(true), setIschart(false), setIstrade(false)})} className="py-4 px-2 text-white font-semibold hover:text-blue-400 transition duration-300 active:text-blue-500">Market Diff</button>
							  <button  onClick={(()=>{setIschart(true), setIsmarket(false), setIstrade(false)})} className="py-4 px-2 text-white font-semibold hover:text-blue-400 transition duration-300">Chart</button>
							  <button  onClick={(()=>{setIstrade(true), setIsmarket(false), setIschart(false)})} className="py-4 px-2 text-white font-semibold hover:text-blue-400 transition duration-300">Trade</button>
              </div>
              <div className="md:hidden flex items-center">
                <button className="outline-none mobile-menu-button">

					      </button>
              </div>
            </div>
          {isMarket && <div className='mt-10'>
            <Market_list/>
          </div>}
          {isChart && <div className='mt-10'>
            <Chart />
          </div>}
          {isTrade && <div className='mt-10'>
            <Trade />
          </div>}

        </div>
      </main>


  )
}

export default Home
