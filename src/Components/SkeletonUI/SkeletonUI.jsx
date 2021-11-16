/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import tw from "twin.macro"

export const SkeletonUI = () => {
    return(
        <>
        {
            [1,2,3,4,5,6,7,8].map(val=>(
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
        </>
    )
}