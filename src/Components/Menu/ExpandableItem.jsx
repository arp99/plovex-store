/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import tw, { styled } from "twin.macro"
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"

const HiddenItem = styled.div`
    ${tw`py-3 pl-5 text-tertiary capitalize cursor-pointer`}
`

const ExpandableItem = ({ id, title, content, expandItem, handleClick }) => {
    
    return(
        <div>
            <div
                css={
                    css`
                        ${ tw`
                            w-full 
                            flex 
                            justify-between
                            items-baseline
                            text-xl
                            my-4 
                            text-secondary
                            cursor-pointer
                        `}
                    `
                }
                onClick={()=> handleClick( id )}
            >
                <p>{ title }</p>
                { expandItem ? <AiOutlineMinus /> : <AiOutlinePlus /> }
            </div>
            <div>
                {
                    expandItem && content.map(({ id, category })=> <HiddenItem key={id}>{ category }</HiddenItem>)
                }
            </div>
        </div>
    )
}

export default ExpandableItem