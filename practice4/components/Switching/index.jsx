import React from "react";
import "./styles.css";
import Example from "../Example";
import States from "../States";
class Switching extends React.Component{
    constructor(props){
        super(props);
        const modelData = window.cs142models;
        this.handlePageSwitch = this.handlePageSwitch.bind(this);
        this.state = {
            nextPage:<States/>,
            currentPage:<Example/>,
            nextPageName:"States",
            currentPageName:"Example",
        }
    }
    handlePageSwitch(event){
        this.setState({
            nextPage:this.state.currentPage,
            currentPage:this.state.nextPage,
            nextPageName:this.state.currentPageName,
            currentPageName:this.state.nextPageName,
        });
    }
    render(){
        return <>
        <button className="switchPageButton" onClick={this.handlePageSwitch}>
            This is the page {this.state.currentPageName}, <br></br>
            click to switch to page "{this.state.nextPageName}"
        </button>
        {this.state.currentPage}
        </>;
    }
}
export default Switching 