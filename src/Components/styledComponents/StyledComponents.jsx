/** @jsxImportSource @emotion/react */
import tw, { styled } from "twin.macro"

export const StyledGrid = styled.div`
    min-height:25rem;
    max-height:max-content;
    ${tw`w-full grid grid-cols-2 gap-4 mt-6 md:grid-cols-4`}
`
