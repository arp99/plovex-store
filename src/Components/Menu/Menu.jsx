/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useEffect, useState } from "react"
import tw, { styled } from "twin.macro"
import MenuData from "./MenuData"
import { AiOutlineClose } from "react-icons/ai"
import ExpandableItem from "./ExpandableItem"

const StyledMenuItem = styled.div`
    border-bottom-width: 1px;
    ${tw`text-secondary text-xl py-2 border-secondary cursor-pointer`}
`
export const Menu = ({ hideMenu, menuOpen }) =>{
    
    const [ expandedItem , setExpandedItem ] = useState({
        id : ""
    })
    
    useEffect(()=>{
        if( menuOpen ){
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'unset';
        }
    },[menuOpen])
 
    const closeMenu = () =>{
        hideMenu(false)
    } 
    const expandItem = (currentId) => {
        if(currentId === expandedItem.id ){
            setExpandedItem({
                id : ""
            })
        }else{
            setExpandedItem({
                id : currentId
            })
        }
    }

    return(
        <div
            css={
                css`
                    width:100%;
                    height:100vh;
                    background: rgba(155, 155, 155, 0.48);
                    backdrop-filter : blur(10px);
                    ${ tw`fixed top-0 left-0 z-20`}
                `
            }
            onClick={(evt)=>{
                    console.log("out clicked")
                    evt.stopPropagation()
                    closeMenu()
                }
            }
        >
            <div
                tw="bg-primary-darker h-full p-5 w-9/12 overflow-y-auto md:w-80"
                
                onClick={(evt)=>{
                    evt.stopPropagation()
                }}
            >
                <div 
                    css={
                        css`
                            ${tw`w-full h-16 py-5 text-secondary bg-primary-darker`}
                        `    
                    }>
                    <AiOutlineClose
                        size={30} 
                        onClick={(evt)=>{
                                evt.stopPropagation()
                                closeMenu()
                            } 
                        }
                        cursor="pointer"
                    />
                </div>
                <div>
                    {
                        MenuData.map(({ id, expandable, title, content }) => 
                            expandable ? 
                                <ExpandableItem 
                                    title={ title } 
                                    content={ content } 
                                    expandItem={ expandedItem.id === id }
                                    handleClick={ expandItem }
                                    id={ id }
                                    key={ id }
                                />
                                :
                                <StyledMenuItem key={ id } >
                                    { title }
                                </StyledMenuItem>
                        )
                    }
                    <StyledMenuItem tw="text-tertiary text-base border-0 py-3">
                        <span>Login</span> | <span>Register</span>
                    </StyledMenuItem>
                </div>
            </div>
        </div>
    )
}