/** @jsxImportSource @emotion/react */
import tw, { styled } from "twin.macro"

export const FormContainer = styled.div`
    min-height:20rem;
    ${tw`w-80 flex flex-col justify-evenly border p-2 border-solid border-primary rounded-xl shadow-lg`}
`
export const InputGroup = styled.div`
    ${tw`flex flex-col`}
    input{
        ${tw`p-2 rounded-2xl outline-none border-2 border-solid border-primary-ligter my-2 tracking-widest text-sm`}
    }
    label{
        ${tw`text-lg text-primary-darker`}
    }
    a{
        ${tw`no-underline text-primary-ligter mt-2`}
    }
`
export const FlexCenter = styled.div`
    ${tw`w-screen h-screen flex items-center justify-center`}
`
export const StyledError = styled.p`
    ${tw`font-bold text-sm text-red-400 tracking-widest`}
`