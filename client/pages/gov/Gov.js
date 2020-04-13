import React from "react";
import "./gov.sass"

export default function (props) {
    const bullet = <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="link"><path fill="none" stroke="#000" stroke-width="1.1"
                                                                                                                            d="M10.625,12.375 L7.525,15.475 C6.825,16.175 5.925,16.175 5.225,15.475 L4.525,14.775 C3.825,14.074 3.825,13.175 4.525,12.475 L7.625,9.375"></path><path
        fill="none" stroke="#000" stroke-width="1.1" d="M9.325,7.375 L12.425,4.275 C13.125,3.575 14.025,3.575 14.724,4.275 L15.425,4.975 C16.125,5.675 16.125,6.575 15.425,7.275 L12.325,10.375"></path><path fill="none" stroke="#000" stroke-width="1.1" d="M7.925,11.875 L11.925,7.975"></path></svg>
    return <div className="gov">
        <div className="uk-container uk-position-relative">
            <div className="uk-grid-margin uk-grid uk-grid-stack" uk-grid="">
                <div className="uk-flex-auto uk-width-1-1@m uk-first-column"><h3 className="uk-h3 uk-heading-divider uk-text-uppercase uk-text-center uk-scrollspy-inview uk-animation-slide-top-medium" uk-scrollspy-class="uk-animation-slide-top-medium"> исполнительные органы государственной власти рс(я) </h3></div>
            </div>
            <div className="uk-grid-margin uk-grid uk-grid-stack" uk-grid="">
                <div className="uk-flex-auto uk-width-1-1@m uk-first-column"><h4 className="uk-h4 uk-heading-bullet uk-text-uppercase uk-text-center uk-scrollspy-inview uk-animation-slide-right-medium" uk-scrollspy-class="uk-animation-slide-right-medium"> министерства </h4>
                    <ul className="uk-list uk-scrollspy-inview uk-animation-slide-left-medium" uk-scrollspy-class="uk-animation-slide-left-medium">
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://minstroy.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://minstroy.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Министерство архитектуры и строительного комплекса Республики Саха (Якутия)</a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://mvsdn.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://mvsdn.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Министерство по внешним связям и делам народов Республики Саха (Якутия) </a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://mingkh.sakha.gov.ru" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://mingkh.sakha.gov.ru" target="_blank" rel="noopener noreferrer" className="el-link">Министерство жилищно-коммунального хозяйства и энергетики Республики Саха (Якутия)</a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://minzdrav.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://minzdrav.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Министерство здравоохранения Республики Саха (Якутия)</a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://minimush.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://minimush.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Министерство имущественных и земельных отношений Республики Саха (Якутия)</a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://minkult.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://minkult.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Министерство культуры и духовного развития Республики Саха (Якутия) </a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://minobr.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://minobr.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Министерство образования и науки&nbsp;Республики Саха (Якутия) </a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://minmol.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://minmol.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Министерство по делам молодежи и социальным коммуникациям Республики Саха (Якутия)</a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://minobchestvo.sakha.gov.ru" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://minobchestvo.sakha.gov.ru" target="_blank" rel="noopener noreferrer" className="el-link">Министерство по развитию институтов гражданского общества Республики Саха (Якутия)</a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://minpred.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://minpred.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Министерство предпринимательства, торговли и туризма Республики Саха (Якутия)</a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://minprom.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://minprom.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Министерство промышленности и геологии Республики Саха (Якутия)</a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://mininnovation.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://mininnovation.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Министерство инноваций, цифрового развития и инфокоммуникационных&nbsp;технологий Республики Саха (Якутия)</a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://minsel.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://minsel.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Министерство сельского хозяйства Республики Саха (Якутия)</a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://minsport.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://minsport.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Министерство по физической культуре и спорту Республики Саха (Якутия) </a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://mintrans.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://mintrans.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Министерство транспорта и дорожного хозяйства Республики Саха (Якутия) </a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://mintrud.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://mintrud.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Министерство труда и социального развития Республики Саха (Якутия) </a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://minfin.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://minfin.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Министерство финансов Республики Саха (Якутия) </a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://minpriroda.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://minpriroda.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Министерство экологии, природопользования и лесного хозяйства Республики Саха (Якутия) </a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://mineconomic.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://mineconomic.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Министерство экономики Республики Саха (Якутия) </a></div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="uk-grid-margin uk-grid uk-grid-stack" uk-grid="">
                <div className="uk-flex-auto uk-width-1-1@m uk-first-column"><h4 className="uk-h4 uk-heading-bullet uk-text-uppercase uk-text-center" uk-scrollspy-class="uk-animation-slide-right-medium"> государственные комитеты </h4>
                    <ul className="uk-list" uk-scrollspy-class="uk-animation-slide-left-medium">
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://gkobzgn.sakha.gov.ru" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://gkobzgn.sakha.gov.ru" target="_blank" rel="noopener noreferrer" className="el-link">Государственный комитет по обеспечению безопасности жизнедеятельности населения Республики Саха (Якутия)</a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://gkcp.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://gkcp.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Государственный комитет по ценовой политике Республики Саха (Якутия) </a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://arktika.sakha.gov.ru" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://arktika.sakha.gov.ru" target="_blank" rel="noopener noreferrer" className="el-link">Государственный комитет Республики Саха (Якутия) по делам Арктики</a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://gkzn.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://gkzn.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Государственный комитет Республики Саха (Якутия) по занятости населения</a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://gkgosz.sakha.gov.ru" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://gkgosz.sakha.gov.ru" target="_blank" rel="noopener noreferrer" className="el-link">Государственный комитет Республики Саха (Якутия) по регулированию контрактной системы в сфере закупок</a></div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="uk-grid-margin uk-grid uk-grid-stack" uk-grid="">
                <div className="uk-flex-auto uk-width-1-1@m uk-first-column"><h4 className="uk-h4 uk-heading-bullet uk-text-uppercase uk-text-center" uk-scrollspy-class="uk-animation-slide-right-medium"> Иные исполнительные органы государственной власти </h4>
                    <ul className="uk-list" uk-scrollspy-class="uk-animation-slide-left-medium">
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://depvet.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://depvet.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Департамент ветеринарии&nbsp;Республики Саха (Якутия)</a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://deples.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://deples.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Департамент по лесным отношениям Республики Саха (Якутия)</a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://depohran.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://depohran.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Департамент РС(Я) по охране объектов культурного наследия </a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://pp-dfo.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://pp-dfo.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Постоянное представительство Республики Саха (Якутия)&nbsp;по Дальневосточному федеральному округу</a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://postpredstvo.sakha.gov.ru" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://postpredstvo.sakha.gov.ru" target="_blank" rel="noopener noreferrer" className="el-link">Постоянное представительство Республики Саха (Якутия)&nbsp;при Президенте Российской Федерации</a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://upr-gszgn.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://upr-gszgn.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Управление государственного строительного и жилищного надзора Республики Саха(Якутия)</a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://upr-akhodgp.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://upr-akhodgp.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Управление делами Главы Республики Саха (Якутия) и Правительства Республики Саха (Якутия)</a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://uprzags.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://uprzags.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Управление записи актов гражданского состояния при Правительстве РС(Я)</a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://technadzor.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://technadzor.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Управление по надзору за техническим состоянием самоходных машин и других видов техники Республики Саха (Якутия)</a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://gosalcogol.sakha.gov.ru" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://gosalcogol.sakha.gov.ru" target="_blank" rel="noopener noreferrer" className="el-link">Управление Республики Саха (Якутия) по государственному регулированию алкогольного&nbsp;рынка</a></div>
                                </div>
                            </div>
                        </li>
                        <li className="el-item">
                            <div className="uk-grid-small uk-child-width-expand uk-flex-nowrap uk-flex-middle uk-grid" uk-grid="">
                                <div className="uk-width-auto uk-first-column"><a href="https://mirsud.sakha.gov.ru/" target="_blank" rel="noopener noreferrer"><span className="el-image uk-icon" uk-icon="icon: link;">{bullet}</span></a></div>
                                <div>
                                    <div className="el-content uk-panel"><a href="https://mirsud.sakha.gov.ru/" target="_blank" rel="noopener noreferrer" className="el-link">Центральный аппарат по организационному обеспечению деятельности мировых судей в РС(Я)</a></div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
}
