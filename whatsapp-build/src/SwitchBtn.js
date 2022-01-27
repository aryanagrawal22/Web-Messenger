import React from "react";
import "./SwitchBtn.css";
import styled from "styled-components";

const SliderSpan = styled.span`
background-color: ${props => props.theme.sliderSpan_Background};
&:before{
        background-color: ${props => props.theme.sliderSpanInner_Background};
    }
transition: all 0.4s ease;
`;

function SwitchBtn(props){

    function changeTheme(){
        if(props.theme === "light"){
            props.setTheme("dark");
        }else{
            props.setTheme("light");
        }
    };

    return(
        <label className = "switch">
            <input type="checkbox"/>
            <SliderSpan span className="slider" onClick={changeTheme}/>
        </label>
    )
}
export default SwitchBtn;