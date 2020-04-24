import React, {useEffect, useState} from "react";
import Chart from "react-apexcharts";

export default function (props) {
    //const [list, setList] = useState([])
    const [max, setMax] = useState(10)
    const [days, setDays] = useState(10)

    useEffect(() => {

    }, [])

    const list = [];

    function calc1(i) {
        return i * i
    }

    function calc2(i) {
        return i * 4
    }

    for (let i = 0; i < days; i++) {
        let v1 = calc1(i)
        if (v1 > max) v1 = calc2(i)
        list.push({date: i, new: v1})
    }

    const op = {
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: list.map(l => l.date)
            },
            stroke: {
                curve: 'straight',
            }
        },
        series: [
            {
                name: "Новые",
                data: list.map(l => l.new)
            }
        ]
    };

    function slideMax(e) {
        setMax(e.target.value)
    }

    function slideDays(e) {
        setDays(e.target.value)
    }

    return <div>
        <div>
            <button onClick={() => setMax(max - 10)}>-10</button>
            <button onClick={() => setMax(max - 1)}>-</button>
            {/*<input type="range" min="1" max="50" className="myslider" value={max} id="sliderRange" onChange={slideMax}/>*/}
            {max}
            <button onClick={() => setMax(max + 1)}>+</button>
            <button onClick={() => setMax(max + 10)}>+10</button>
        </div>
        <div>
            <button onClick={() => setDays(days - 10)}>-10</button>
            <button onClick={() => setDays(days - 1)}>-</button>
            {days}
            {/*<input type="range" min="1" max="50" className="myslider" value={days} id="sliderRange" onChange={slideDays}/>*/}
            <button onClick={() => setDays(days + 1)}>+</button>
            <button onClick={() => setDays(days + 10)}>+10</button>
        </div>

        <Chart
            options={op.options}
            series={op.series}
            colors={['#F44336', '#E91E63', '#9C27B0']}
            type="line"
        />
    </div>

}
