/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import tw, { styled } from "twin.macro"
import { loadHomePageData } from "../../app/Features/HomePage/homePage"
import { Carousel, Categorycard, Productcard } from "../../Components"
import { CarouselData } from "./CarouselData"

const StyledGrid = styled.div`
    min-height:25rem;
    max-height:max-content;
    ${tw`w-full grid grid-cols-2 gap-4 mt-6 md:grid-cols-4`}
`

export const Home = ( props ) => {
    const { status, homePageData } = useSelector( state => state.homePage )
    const homePageDispatch = useDispatch()
    useEffect(()=>{
        if( status === 'idle' && homePageData === null ){
            console.log("hello")
            homePageDispatch( loadHomePageData() )
        }
    },[ homePageData, homePageDispatch, status ])

    console.log(homePageData)

    return(
        <main tw="w-full min-h-screen py-24">
            <div css={css`height: 720px`}>
                <Carousel carouselData={CarouselData} autoPlay={5} />
            </div>
            <div
                tw="mt-16 text-center mx-auto w-11/12"
            >
                <h1>Shop By Category</h1>
                <StyledGrid>
                    {
                        homePageData === null && [1,2,3,4,5,6,7,8].map(val=>(
                            <div
                                css={
                                    css`
                                        min-height:15rem;
                                       ${tw`w-full h-full bg-gray-200 animate-pulse`}
                                    `
                                }
                                key={val}
                            >
                            </div>
                        ))
                    }
                    {
                        homePageData && 
                        homePageData['categoryData'].map(({ _id, title, image })=>{
                            return(
                                <Categorycard 
                                    imgSrc = { image } 
                                    title = { title } 
                                    key={ _id } 
                                />
                            )
                        })
                    }
                </StyledGrid>
            </div>
            <div
                tw="mt-16 text-center mx-auto w-11/12"
            >
                <h1>New Releases</h1>
                <StyledGrid>
                    {
                        homePageData === null && [1,2,3,4,5,6,7,8].map(val=>(
                            <div
                                css={
                                    css`
                                        min-height:15rem;
                                       ${tw`w-full h-full bg-gray-200 animate-pulse`}
                                    `
                                }
                                key={val}
                            >
                            </div>
                        ))
                    }
                    {
                        homePageData && 
                        homePageData['newProducts'].map(({ _id, image, name, price, oldPrice, newLaunch })=>{
                            return(
                                <Productcard 
                                    key = { _id }
                                    productImg = { image }
                                    title = { name }
                                    newPrice = { price }
                                    oldPrice = { oldPrice }
                                    newProduct = { newLaunch }
                                />
                            )
                        })
                    }
                </StyledGrid>
            </div>
        </main>
    )
}