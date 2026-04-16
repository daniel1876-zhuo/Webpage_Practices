import React from "react";
import "./styles.css";
class Header extends React.Component{
    constructor(props){
        super(props);
        console.log("Header is created");
        const modelData = window.cs142models.header();
        this.state = {
            description:modelData.description,
            myUni:modelData.myUni,
            // name:modelData.exampleModel().name,
            name:"Daniel",
        };

    }
    render(){
        return <div className="header">
            <h1>
                This is {this.state.name}'s unique header
            </h1>
            <span>
                Hi, I am {this.state.name}, I've applied to {this.state.myUni}
                <br></br>
            </span>
            <span>
                {this.state.description}
            </span>
        </div>;
    }
}

export default Header