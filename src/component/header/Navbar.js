import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export class Navbar extends Component {
    render() {
        return (
            <Wrapper>
                <nav className="navB navbar">
                    <Link className="navB-ico" to="/">
                        <img src="https://ed.team/static/images/logo.svg" width="90%" alt="icoedteam" />
                    </Link>
                </nav>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    
    .navB {
        background-color: #1D1951;
        color:  #fff;

        &-ico {
            width: 110px;
            background-color: white;
            padding: 3px;
            border-radius: 10px;
            cursor: pointer;
        }
    }
    
`

export default Navbar
