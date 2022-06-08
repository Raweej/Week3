import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState, useRef } from "react"
import { createChart } from "lightweight-charts"
import { ChartGet } from "../lib/chartGet";
import dynamic from "next/dynamic";

export function getChart (){
    const data = ChartGet()
    return {props:data}
}

const Chart = () => {
    const [datas, setDatas]:any = useState([])
    let arr:any = [];
    const chartRef = useRef(null);

    const ChartToken = dynamic(() => import("./chartToken"),{
        ssr:false
    })
    
    const t = [
        { time: '2018-10-19', open: 54.62, high: 55.50, low: 54.52, close: 54.90 },
        { time: '2018-10-22', open: 55.08, high: 55.27, low: 54.61, close: 54.98 },
        { time: '2018-10-23', open: 56.09, high: 57.47, low: 56.09, close: 57.21 },
        { time: '2018-10-24', open: 57.00, high: 58.44, low: 56.41, close: 57.42 },
        { time: '2018-10-25', open: 57.46, high: 57.63, low: 56.17, close: 56.43 },
        { time: '2018-10-26', open: 56.26, high: 56.62, low: 55.19, close: 55.51 },
    ]

    const getToken = async(event:any) => {
        if(!event.target.token1.value || !event.target.token2.value){
            alert(`Some input empty`)
            event.preventDefault()
        }
        else{
            event.preventDefault()
            const nameToken1 = event.target.token1.value.toUpperCase()
            const nameToken2 = event.target.token2.value.toUpperCase()


            const ulrBinance = await fetch(`https://api1.binance.com/api/v3/klines?interval=1h&symbol=${nameToken1}${nameToken2}`)
                .then(res => res.json())
                .catch((err) => console.error(err))

            

            for(let i = 0; i < ulrBinance.length; i++){
                
                const time = ulrBinance[i][0]
                const date = new Date(time).getTime()/1000
                 
                // const dateFull = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

                let op: number = ulrBinance[i][1]
                let hi: number = ulrBinance[i][2]
                let lo: number = ulrBinance[i][3]
                let clo: number = ulrBinance[i][4]

                const obj = {
                    time: date,
                    open: op,
                    high: hi,
                    low: lo,
                    close: clo
                }
                arr.push(obj)
                setDatas(arr)   
            }
        }
    }
 

    return(
        <div>
            <div className="container">
                <div className='flex bg-white rounded-2xl '>
                    <div className="flex flex-col justify-center w-full ">
                        <h1 className="text-center font-bold text-4xl m-12">Chart</h1>
                        <form onSubmit={getToken} className='flex flex-col'>
                            <div className="md:flex flex-warp justify-center md:px-20 ">
                                <div className='px-4 py-3 w-full'>
                                    <label className="font-bold text-lg">Token 1</label><br/>
                                    <input type="text" id="token1" name="token1" placeholder="Fill in token" className='shadow-md rounded-md w-full h-14' /><br/>
                                </div>
                                <div className='px-4 py-3 w-full'>
                                    <label className="font-bold text-lg">Token 2</label><br/>
                                    <input type="text" id="token2" name='token2'placeholder="Fill in token" className="shadow-md rounded-md w-full h-14 "/><br/>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button type="submit" className='m-10 justify-center text-xl text-white rounded-lg bg-[#0C1831] w-40 h-14'>Fetch</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="flex bg-white rounded-2xl mt-5">
                <div className="flex justify-center w-full mt-6 ">
                    <ChartToken props={datas}/>
                </div>
            </div>
            
        </div>
    )
}
export default Chart