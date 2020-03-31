import React, {useEffect, useState} from 'react';
import {Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem} from "reactstrap";
import noImage from "client/images/noImage.png"
import "client/pages/home/home.sass"
import {A, navigate} from "hookrouter"

export default function HomeCarousel(props) {
    const [items, setItems] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    useEffect(() => {
        props.api('/post/search', {limit: 5})
            .then(posts => {
                setItems(posts.map(p => ({src: p.image ? p.image.path : noImage, caption: p.header, link: '/news/' + p.path})))
            })
    }, []);


    return <div>

        <Carousel
            className="home-carousel"
            activeIndex={activeIndex}
            next={next}
            previous={previous}
        >
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex}/>
            {items.map(item => <CarouselItem key={item.id}
                                             onExiting={() => setAnimating(true)}
                                             onExited={() => setAnimating(false)}
                                             key={item.src}
            >
                <A href={item.link}>
                <img src={item.src} alt={item.altText}/>
                    <div className="plain-caption">{item.caption}</div>
                <CarouselCaption captionHeader={item.caption} />
                </A>
            </CarouselItem>)}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous}/>
            <CarouselControl direction="next" directionText="Next" onClickHandler={next}/>
        </Carousel>
    </div>;
}




