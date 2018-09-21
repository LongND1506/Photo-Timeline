import React,{Component} from 'react'
import styled from 'styled-components'
import './index.css'
export const LoadingIndicator=(props)=>{
    return(
        <IndWrapper>
            <div className="loader"></div>
        </IndWrapper>
        
    )
}
const IndWrapper=styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    background: #f8f9faf2;
    z-index: 10000;
`