export default async function handler(req:any, res:any) {
    
    const body = req.body 
    const codeErr = '-1121'//code err for binace
    let token = JSON.parse(body)
    
    const order = await fetch(`https://api1.binance.com/api/v3/depth?symbol=${token.token1}${token.token2}`)
        .then(res => res.json())
        .catch(err => console.log(err))

    if(order.code == codeErr || order.code == '-1100'){
        res.json({
            success: false,
            msg: 'Fail'
        })
    }
    else{
        res.status(200).json({
            success: true,
            order: order
        })
    }
    
}
