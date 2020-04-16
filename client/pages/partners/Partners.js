import React from "react";
import ync from "./ync.png"
import tpykt from "./tpykt.jpeg"
import svfu from "./svfu.png"
import minobr from "./minobr.png"
import coat from "client/pages/about-republic/images/coat.png"
import "./partners.sass"

export default function (props) {
    return <div className="partners">
        <h1>Партнеры Академии Наук РС(Я)</h1>
        <a href="https://sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><img src={coat} alt="sakha.gov.ru"/></a>
        <a href="http://prez.ysn.ru/" target="_blank" rel="noopener noreferrer"><img src={ync} alt="http://prez.ysn.ru/"/></a>
        <a href="http://tpykt.ru/" target="_blank" rel="noopener noreferrer"><img src={tpykt} alt="http://tpykt.ru/"/></a>
        <a href="https://s-vfu.ru/" target="_blank" rel="noopener noreferrer"><img src={svfu} alt="https://s-vfu.ru/"/></a>
        <a href="https://minobr.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><img src={minobr} alt="https://minobr.sakha.gov.ru/"/></a>
    </div>
}
