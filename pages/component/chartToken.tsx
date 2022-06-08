import { createChart } from "lightweight-charts";
import { useRef, useEffect } from "react";


const ChartToken = (props:any) =>{
    const chartRef = useRef(null);
    // console.log(x)
    console.log(props.props)

    useEffect(() => {
        const chart = createChart(chartRef.current || "",{
            width: 600,
            height: 300,
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
            },
        })
    
        const candlestickSeries = chart.addCandlestickSeries();
        candlestickSeries.setData(props.props)
        chart.timeScale().fitContent()

    }, [])
    return (<div className="object-fill" ref={chartRef}/>)
    
}
export default ChartToken