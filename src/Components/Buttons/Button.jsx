/** @jsxImportSource @emotion/react */
import tw, { styled } from "twin.macro"

const StyledButton = styled.a`
    ${tw`p-3 px-4 rounded-full tracking-widest uppercase text-sm font-semibold cursor-pointer w-max`}
    
    ${({ variant }) => variant === "primary" && tw`bg-primary text-secondary p-5`}

    ${({ variant }) => variant === "secondary" && tw`bg-secondary text-primary border-primary`}
`

export const Button = ({ link, variant, children }) => {
    return (
        <StyledButton variant={ variant } href={link}>
           { children }
        </StyledButton>
    );
}