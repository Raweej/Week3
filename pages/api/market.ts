
export default async function handler(req:any, res:any) {
    
    const body = req.body
    const codeErr = '-1121'//code err for binace
    console.log(body)
    
    let token = JSON.parse(body)

    const ftx = await fetch(`https://ftx.com/api/markets/${token.token1}/${token.token2}`)
        .then(res => res.json())
        .catch(err => console.log(err))
            
    const bi = await fetch(`https://api1.binance.com/api/v3/avgPrice?symbol=${token.token1}${token.token2}`)
        .then(res => res.json())//.then(res => res.push(token[0]))
        .catch(err => console.log(err))

    console.log(bi)
    if((ftx.success) && !(bi.code == codeErr)){
        console.log('success')
        res.status(200).json({
                success: true,
                ftx: ftx, 
                bi: bi,
                nameT1: token.token1,
                nameT2: token.token2 
            })
    }
    else{
        res.status(500).json({
            success: false,
            msg: 'Fail'
        })
    }
    
}
