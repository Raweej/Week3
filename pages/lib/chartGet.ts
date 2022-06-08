export async function ChartGet (){

    const ulrBinance = await fetch(`https://api1.binance.com/api/v3/klines?interval=1h&symbol=BTCUSDT`)
        .then(res => res.json())
        .catch((err) => console.error(err))
    const arr = []

            
    for(let i = 0; i < ulrBinance.length; i++){
                
        const time = ulrBinance[i][0]
        const date = new Date(time*1000).toISOString().slice(0,10).replace('T','')
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
        
    }
    return arr
}