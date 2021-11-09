/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import tw from "twin.macro"
import CarouselContent from "./CarouselContent";
import Dots from "./Dots";
import Slide from "./Slide";

const CarouselStyle = tw`
    w-full
    h-full
    relative
    my-0
    mx-auto
    overflow-hidden
`

export const Carousel = ({ carouselData : slides, autoPlay }) => {

    const getWidth = () => window.innerWidth
    
    const firstSlide = slides[0]
    const secondSlide = slides[1] 
    const lastSlide = slides[slides.length - 1] 
    
    const [ state, setState ] = useState({
        activeSlide: 0,
        translate: getWidth(),
        transition : 0.5,
        _slides : [ lastSlide, firstSlide, secondSlide ]
    })

    const { activeSlide, transition, _slides, translate } = state
    
    const nextSlide = () =>{
        setState({
            ...state,
            translate : translate + getWidth(),
            activeSlide : activeSlide === slides.length - 1 ? 0 : activeSlide + 1
        })
    }

    const smoothTransition = () =>{
        let _slides = []
        
        // TODO: make slides state from the props 
        //active slide is the last slide
        if( activeSlide === slides.length - 1 )
            _slides = [slides[slides.length - 2], lastSlide, firstSlide]
        //we are back on the firstSlide
        else if( activeSlide === 0)
            _slides = [lastSlide, firstSlide, secondSlide]
        //else if we are in the middle somewhere
        else 
            _slides = slides.slice( activeSlide - 1, activeSlide + 2 )
        
        setState({
            ...state,
            _slides,
            transition: 0,
            translate: getWidth()
        })
    }

    const autoPlayRef = useRef()
    const transitionRef = useRef()

    useEffect(()=>{
        autoPlayRef.current = nextSlide
        transitionRef.current = smoothTransition
    })

    useEffect(()=>{
        const play = () => {
            autoPlayRef.current() //play the current function referemcre in the ref
        }
        const smooth = e =>{
            if(e.target.className.includes('CarouselContent')){
                transitionRef.current()
            }
        }
        let interval = null
        const transitionEnd = window.addEventListener('transitionend', smooth)
        if( autoPlay )  
            interval = setInterval( play, autoPlay*1000)

        return ()=>{
            clearInterval(interval)
            window.removeEventListener('transitionend', transitionEnd)
        } 
    },[autoPlay])

    useEffect(()=>{
        if( transition === 0 ) {
            setState({
                ...state,
                transition : 0.5
            })
        }
    },[ transition, state ])

    return(
        <div css={ CarouselStyle }>
            <CarouselContent 
                {...state}
                width={ getWidth() * _slides.length }
            >
                {
                    _slides.map( (_slide, idx) =>(
                        <Slide url = { _slide.url } title={ _slide.title } key = { idx } />
                    ))
                }
            </CarouselContent>
            <Dots carouselData = { slides } activeSlide = { activeSlide } />
        </div>
    )
}