import { useState } from "react"
import TradeToken from "./TradeToken"

const Trade = () =>{
    const [order, setOrder]:any = useState('')

    const getToken = async(event:any) =>{
        if(!event.target.token1.value || !event.target.token2.value){
            alert(`Some input empty`)
            event.preventDefault()
        }
        else{
            event.preventDefault()
            const nameToken1 = event.target.token1.value.toUpperCase()
            const nameToken2 = event.target.token2.value.toUpperCase()
            
            setOrder({Token1: nameToken1, Token2: nameToken2})
            
        }
    }

    return(
        <div className="">
            <div className='flex bg-white rounded-2xl '>
                <div className="flex flex-col justify-center w-full ">
                    <h1 className="text-center font-bold text-4xl m-12">Trade</h1>
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
                            <button type="submit" className='m-10 text-xl text-white rounded-lg bg-[#0C1831] w-40 h-14'>Fetch</button>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <TradeToken props={order}/>
            </div>
        </div>
    )
}
export default Trade