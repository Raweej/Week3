import { useState,useEffect} from "react"


const Market_list = () =>{
    const [marketDiff,setMarket]:any = useState([]);

    const getToken = async (event:any) => {

        if(!event.target.token1.value || !event.target.token2.value){
            alert(`Some input empty`)
            event.preventDefault()
        }
        else{
            event.preventDefault()
            const data = {
                token1: event.target.token1.value.toUpperCase(),
                token2: event.target.token2.value.toUpperCase() 
            }

            const JSONdata = JSON.stringify(data)
            const endPoint = '/api/market'

            const option ={
                method: 'post',
                header:{
                    'content-Type': 'application/json',
                },
                body: JSONdata,
            }
            const response = await fetch(endPoint, option)
            const result = await response.json()
            console.log("result: ",result)

            if(!result.success){
                alert(`Fail! cannot Fetch`)
            }
            else{
                console.log(result)
                setMarket([...marketDiff,result])          
            }
        }
    }

    const handleRemoveItem = (data:any) =>{
        const findToken = marketDiff.filter((item:any) => item != data)
        setMarket(findToken)
    }

    return(
        <div className="">
            <div className='flex bg-white rounded-2xl '>
                <div className="flex flex-col justify-center w-full ">
                    <h1 className="text-center font-bold text-4xl m-12">Market Diff</h1>
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
            <div>
                <h1 className='mt-3 mb-3 text-2xl font-semibold '>List</h1>
                <div className='bg-white w-full h- rounded-xl border-2 border-blue-200 overflow-auto '>
                    <table className=' min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700 '>
                        <thead className=' h-14'>
                            <tr>
                                <td className='font-bold text-lg text-center w-[15%]'>Token 1</td>
                                <td className='font-bold text-lg text-center w-[15%]'>Token 2</td>
                                <td className='font-bold text-lg text-center w-[20%]'>Binance</td>
                                <td className='font-bold text-lg text-center w-[15%]'>FTX</td>
                                <td className='font-bold text-lg text-center w-[20%]'>Diff</td>
                                <td className='font-bold text-lg text-center w-[15%]'>Action</td>
                            </tr>
                        </thead>
                        <tbody className="">
                            {marketDiff.sort(function(a:any,b:any){
                                const tokenA = a.nameT1 
                                const tokenB = b.nameT1
                                if(tokenA > tokenB){
                                    return 1
                                }
                                else if(tokenA < tokenB){
                                    return -1
                                }      
                                }).map((data:any,index:any) => {
                                return (
                              
                                        <tr key={index} className='hover:bg-gray-100 dark:hover:bg-gray-700 h-14'>
                                            <td className='text-xl text-center'>{data.nameT1}</td>
                                            <td className='text-xl text-center'>{data.nameT2}</td>
                                            <td className='text-xl text-center'>{data.bi.price}</td>
                                            <td className='text-xl text-center'>{data.ftx.result.price}</td>
                                            <td className='text-xl text-center'>{(data.bi.price - data.ftx.result.price)}</td>
                                            <td className='text-center'>
                                                <button className='bg-[#dc2626] text-xl rounded-md w-24 text-white' onClick={()=>handleRemoveItem(data)}>Delete</button>
                                            </td>
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
export default Market_list