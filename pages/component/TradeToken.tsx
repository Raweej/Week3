import { useRouter } from "next/router";
import { useRef, useEffect } from "react";
import { useState } from "react";

const TradeToken = (props:any) =>{
    const router = useRouter()
    const token = {
        token1: props.props.Token1,
        token2: props.props.Token2
    }
    const initToken = {
        token1: 'BTC',
        token2: 'USDT'
    }
    const [tokens,setTokens]:any = useState(initToken)
    const [time,setTime]:any = useState()
    const [asks,setAsks]:any = useState([])
    const [bids,setBids]:any = useState([])
    const [amout,setAmout]:any = useState(0)
    const [symbol,setSymbol]:any = useState()
    const [order,setOrder]:any = useState([])
 
 
    const orderFetch = async() =>{  

            const JSONdata = JSON.stringify(tokens)
            const endPoint = '/api/order'

            const option ={
                method: 'post',
                header:{
                    'content-Type': 'application/json',
                },
                body: JSONdata,
            }
            const response = await fetch(endPoint, option)
            const result = await response.json()
            if(result.success){
                Object.keys(result).map(key=>{
                    const ask = result.order.asks.slice(0,5)
                    const bid = result.order.bids.slice(0,5)
                    const timeStamp = result.order.lastUpdateId
                    setAsks(ask)
                    setBids(bid)
                    setTime(timeStamp)  
                })
            }

    }
    useEffect(()=>{
        const interval = setInterval(()=>{
            orderFetch()
        },1000)
        return ()=> clearInterval(interval)
    },)

    const onBuy = async() =>{
        const date = time
        const priceAvg = () =>{
            let a:number = 0
            let b:number = 0
            asks.map((item:any)=>{
                a = a + (item[0]*item[1])
                b = b + parseFloat(item[1])
            })
            return a/b
        }
        const objBuy ={
            date: date,
            symbol: `${token.token1}_${token.token2}`,
            type: "Buy",
            price: priceAvg(),
            input: amout,
            output: amout/priceAvg()
        }
        setOrder([...order,objBuy])
    }
    
    const onSell = async() =>{
        const date = time
        const priceAvg = () =>{
            let a:number = 0
            let b:number = 0
            bids.map((item:any)=>{
                a = a + (item[0]*item[1])
                b = b + parseFloat(item[1])
            })
            return a/b
        }
        const objSell ={
            date: date,
            symbol: `${token.token1}_${token.token2}`,
            type: "Sell",
            price: priceAvg(),
            input: amout,
            output: amout/priceAvg()
        }
        setOrder([...order,objSell])
    }
    return(
        <div className="md:flex flex-col flex-warp overflow-y-auto">
            <div className="md:flex flex-warp justify-center  mt-5 ">
                <div className="md:px-10">
                    <h2 className="font-bold text-xl">Ask</h2>
                    <table className="table-fixed w-full  ">
                        <thead className="">
                            <tr>
                                <th className="text-left w-[40%] text-sm">Price(USDT)</th>
                                <th className="text-left w-[40%] text-sm">Amout(BTC)</th>
                                <th className="text-left w-[20%] text-sm">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {asks.map((item:any,index:number)=>{
                                return(
                                    <tr key={index} className='text-red-500'>{item[0]}
                                        <td className="text-black">{item[1]}</td>
                                        <td className="text-black">{(item[0]*item[1]).toFixed(2)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="md:px-10">
                    <h2 className="font-bold text-xl">Bids</h2>
                    <table className="table-fixed w-full  ">
                        <thead>
                            <tr>
                                <th className="text-left w-[40%] text-sm">Price(USDT)</th>
                                <th className="text-left w-[40%] text-sm">Amout(BTC)</th>
                                <th className="text-left w-[20%] text-sm">Total</th>
                            </tr>
                        </thead>
                            <tbody>
                                {bids.map((item:any,index:number)=>{
                                    return(
                                        <tr key={index} className='text-green-500'>{item[0]}
                                            <td className="text-black">{item[1]}</td>
                                            <td className="text-black">{(item[0]*item[1]).toFixed(2)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>    
                    </table>
                </div>
            </div>

            <div className="md:flex flex-warp justify-center mt-5">
                <div className="w-full md:pr-5">
                    <h4 className="text-xl font-bold">Amout</h4>
                    <div className="mt-3">
                        <input type="text" id="amout" className="shadow-md " onChange={event =>setAmout(event.currentTarget.value)}></input>
                        <select value={symbol}
                            onChange={(e)=>{setSymbol(e.target.value)}}>
                            <option value={token.token2}>{token.token2}</option>
                            <option value={token.token1}>{token.token1}</option>
                        </select>
                    </div>
                    <div className="flex justify-center my-4">
                        <button type='button' className='rounded-lg w-full bg-green-500 text-center h-10 text-white' onClick={onBuy}>Buy</button>
                    </div>
                </div>
                <div className="w-full md:pl-5">
                    <h4 className="text-xl font-bold">Amout</h4>
                    <div className="mt-3">
                        <input type="text" id="amout" className='shadow-md' onChange={event =>setAmout(event.currentTarget.value)}></input>
                        <select value={symbol}
                            onChange={(e)=>{setSymbol(e.target.value)}}>
                            <option value={token.token2}>{token.token2}</option>
                            <option value={token.token1}>{token.token1}</option>
                        </select>
                    </div>
                    <div className="flex justify-center my-4">
                        <button type='button' className='rounded-lg w-full bg-red-500 text-center h-10 text-white' onClick={onSell}>Sell</button>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="font-bold text-xl">Order history</h2>
                <div className="bg-white w-full  rounded-xl border-blue-200 overflow-auto">
                    <table className=" min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700 ">
                        <thead className="text-left">
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Symbol</th>
                                <th>Type</th>
                                <th>Price</th>
                                <th>Input</th>
                                <th>Output</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.map((item:any,index:number)=>{
                                return(
                                    <tr key={index}>
                                        <td>{`#${index}`}</td>
                                        <td>{item.date}</td>
                                        <td>{item.symbol}</td>
                                        <td>{item.type}</td>
                                        <td>{item.price}</td>
                                        <td>{item.input}</td>
                                        <td>{(item.output).toFixed(2)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>                   
        </div>
    )
}
export default TradeToken