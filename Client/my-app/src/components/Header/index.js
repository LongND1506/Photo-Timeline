import React,{Component} from 'react'
import styled from 'styled-components'
class Header extends Component{
    render(){
        return(
            <HeaderWrapper></HeaderWrapper>
        )
    }
}
export default Header
const HeaderWrapper=styled.div`
    width: 100%;
    height: 5em;
    background: #f8f9fa;
    position: fixed;
    top: 0px;
    box-shadow: 5px 5px 15px rgba(108,117,125,.5);
`