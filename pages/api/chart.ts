export default async function handler(req:any, res:any) {
    
    const codeErr = '-1121'//code err for binace
    const arr = []

    
    const order = await fetch(`https://api1.binance.com/api/v3/klines?interval=1h&symbol=BTCUSDT`)
        .then(res => res.json())
        .catch(err => console.log(err))

    for(let i = 0; i < order.length; i++){
                
        const time = order[i][0]
        const date = new Date(time*1000).toISOString().slice(0,10).replace('T','')
            // const dateFull = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

        let op: number = order[i][1]
        let hi: number = order[i][2]
        let lo: number = order[i][3]
        let clo: number = order[i][4]

        const obj = {
            time: date,
            open: op,
            high: hi,
            low: lo,
            close: clo
        }
        arr.push(obj)
        // setDatas(arr)   
    }

    if(order.code == codeErr || order.code == '-1100'){
        res.json({
            success: false,
            msg: 'Fail'
        })
    }
    else{
        res.status(200).json({
            success: true,
            order: arr
        })
    }
    
}