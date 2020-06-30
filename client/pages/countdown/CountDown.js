import React, {useEffect, useState} from "react";
import {Button} from "reactstrap";
import GaugeChart from 'react-gauge-chart'
import moment from "moment"
import b1 from "client/sounds/beep-05.mp3"
import b2 from "client/sounds/beep-07.mp3"

export default function CountDown(props) {
    const [seconds, setSeconds] = useState(0)
    const [intervalId, setIntervalId] = useState(0)
    const [minutes, setMinutes] = useState(4)
    const [beepStart, setBeepStart] = useState(20)
    const audioFinal = new Audio(b1)
    const beep = new Audio(b2)

    useEffect(() => {
        props.useTheme('admin')
        if (seconds >= minutes * 60) {
            audioFinal.play()
            stop()
        }
        if(seconds > minutes * 60 - beepStart){
            if( seconds < minutes * 60 - beepStart /3 ) {
                if(seconds % 2) beep.play()
            }else{
                beep.play()
            }
        }
    }, [seconds])



    function stop() {
        clearInterval(intervalId)
        setSeconds(0)
    }

    function start() {
        const interval = setInterval(() => {
            setSeconds(s => s + 1)
        }, 1000)
        setIntervalId(interval)
    }

    function format(s) {
        return moment('1970-01-01 16:00:00').seconds(minutes * 60 - s).format("mm:ss")
    }

    return <div>
        Лимит минут: <input defaultValue={minutes} onChange={e=>setMinutes(e.target.value)} type="number"/>
        Начло сигналов: <input defaultValue={beepStart} onChange={e=>setBeepStart(e.target.value)} type="number"/>
        {seconds===0 && <Button onClick={start} color="primary">Начать отсчет</Button>}
        {seconds>0 && <Button onClick={stop} color="danger">Остановить</Button>}
        <GaugeChart id="gauge-chart2"
                    arcsLength={[1 - beepStart / (minutes*60), beepStart / (minutes*60) * 2/ 3, beepStart / (minutes*60) / 3]}
                    colors={['#5BE12C', '#F5CD19', '#EA4228']}
                    nrOfLevels={100}
                    percent={seconds/(minutes * 60)}
                    hideText={false}
                    textColor={"red"}
                    formatTextValue={t=>format(seconds)}
        />

    </div>
}
