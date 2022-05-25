/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import "twin.macro"
import { loadHomePageData } from "../../app/Features/HomePage/homePage"
import { isProductInWishlist } from "../../app/Features/Wishlist/services/WishlistServices"
import { Button, Carousel, Categorycard, Productcard, SkeletonUI, StyledGrid } from "../../Components"
import { CarouselData } from "./CarouselData"

export const Home = ( props ) => {
    const { status, homePageData } = useSelector( state => state.homePage )
    const { products } = useSelector( state => state.wishlist )
    const homePageDispatch = useDispatch()
    useEffect(()=>{
        if( status === 'idle' && homePageData === null ){
            homePageDispatch( loadHomePageData() )
        }
    },[ homePageData, homePageDispatch, status ])

    return(
        <main tw="w-full min-h-screen pt-24">
            <div css={css`height: 720px`}>
                <Carousel carouselData={CarouselData} autoPlay={5} />
            </div>
            <div
                tw="mt-16 text-center mx-auto w-11/12"
            >
                <h1>Shop By Category</h1>
                <StyledGrid>
                    {
                        homePageData === null && <SkeletonUI />
                    }
                    {
                        homePageData &&
                        homePageData['categoryData'].map(({ _id, title, image, category })=>{
                            return(
                                <Link to={`/products/category/${category}`} key={ _id }>
                                    <Categorycard 
                                        imgSrc = { image } 
                                        title = { title }
                                        category = { category } 
                                />
                                </Link>
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
                        homePageData === null && <SkeletonUI />
                    }
                    {
                        homePageData && 
                        homePageData['newProducts'].map(({ _id, image, name, price, oldPrice, newLaunch })=>{
                            return(
                                <Productcard 
                                    key = { _id }
                                    productId = { _id }
                                    productImg = { image }
                                    title = { name }
                                    newPrice = { price }
                                    oldPrice = { oldPrice }
                                    newProduct = { newLaunch }
                                    inWishlist = { isProductInWishlist(products, _id) }
                                />
                            )
                        })
                    }
                </StyledGrid>
            </div>
            <div
                tw="mt-16 text-center mx-auto w-11/12"
            >
                <Link to="/products/new_releases">
                    <Button variant="secondary">All New Releases</Button>
                </Link>
            </div>
            <footer
                tw="mt-16 text-center w-full py-6 bg-tertiary text-secondary tracking-widest text-xl"
            >
                <p>Developed with 💖 by 
                    <a 
                        href="https://github.com/arp99" 
                        target="_blank" 
                        rel="noreferrer"
                        tw="no-underline text-primary-ligter"
                    >
                        &lt;Arpan/&gt;
                    </a>
                </p>
            </footer>
        </main>
    )
}