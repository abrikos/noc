import directions from "client/pages/home/text-directions";
import MarkDown from "react-markdown";
import React, {useState} from "react";
import dirs from "./directions.png";



export default function BlockDirections(props) {
    const [block, setBlock] = useState();

    function getStyle(t) {
        return {
            backgroundImage: `url(${t.image})`
        }
    }

    return <div className="block">
        <h2><img src={dirs} alt="directions"/>Направления</h2>
        <div className="d-none d-sm-block">
            <div className="row">
                {directions.map((t, i) => <div key={i} className="col-sm">

                    <div className={`direction-bg ${block === i ? 'selected' : block ? 'disabled' : ''}`} style={getStyle(t)}>


                    </div>
                    {block !== i && <div className="direction-title pointer" onClick={() => setBlock(i)}>
                        <h4>{t.title}</h4>
                    </div>}

                </div>)}
            </div>
            {directions.map((t, i) => <div key={i} className={`direction-text ${i === block ? '' : 'd-none'}`}>
                <h3 className="blue-block">{t.title}</h3>
                <div className="row">
                    <div className="col-sm"><img src={t.image} className="img-fluid" alt={t.title}/></div>
                    <div className="col-sm"><MarkDown source={t.text}/></div>
                </div>

            </div>)}
        </div>


        <div className="d-sm-none d-block">
            {directions.map((t, i) => <div key={i}>
                <h3 className="blue-block">{t.title}</h3>
                <div className="row">
                    <div className="col-sm"><img src={t.image} className="img-fluid" alt={t.title}/></div>
                    <div className="col-sm"><MarkDown source={t.text}/></div>
                </div>

            </div>)}
        </div>


    </div>
}
