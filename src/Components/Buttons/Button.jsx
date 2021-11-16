/** @jsxImportSource @emotion/react */
import tw, { styled } from "twin.macro"
import { ClipLoader } from "react-spinners"

const StyledButton = styled.button`
    ${tw`py-3 px-4 rounded-full tracking-widest uppercase text-sm font-semibold border-0 cursor-pointer w-max`}
    
    ${({ variant }) => variant === "primary" && tw`bg-primary text-secondary p-5`}

    ${({ variant }) => variant === "secondary" && tw`bg-secondary text-primary border border-solid border-primary hover:(bg-primary text-secondary)`}

    ${({ size }) => {
        if( size === "small"){
            return tw`py-2 font-medium text-xs`
        }
    }}
    ${({ state })=> state === "fulfilled" && tw`cursor-not-allowed`}
    span{
        ${tw`flex items-center`}
    }
`

export const Button = ({ link, variant, size, state, children, ...props }) => {
    return (
        <StyledButton variant={ variant } href={link} size={size} state={state} {...props} >
            {
                state === "loading" ?
                <span>
                    <ClipLoader size={15} color="white" loading={true} /> Please Wait
                </span>
                :
                <span>{children}</span>
            }
        </StyledButton>
    );
}