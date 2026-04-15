import React from "react";
import "./styles.css";

/**
 * Define States, a React component of CS142 Project 4, Problem 2. The model
 * data for this view (the state names) is available at
 * window.cs142models.statesModel().
 */
class States extends React.Component {
  constructor(props) {
    super(props);
    console.log(
      "window.cs142models.statesModel()",
      window.cs142models.statesModel()
    );
    const modelData = window.cs142models;
    this.handleStatesInputChange = this.handleStatesInputChange.bind(this);
    this.state = {
      statesModel:modelData.statesModel(),
      statesModelMatched:[],
      isAnyStateMatched:false,
    };
  }
  handleStatesInputChange(event){
    const text = event.target.value;
    let statesModelMatched = [];
    this.setState({isAnyStateMatched:false});
    for(let i = 0;i < this.state.statesModel.length;i++){
      const stateModel = this.state.statesModel[i];
      if(stateModel.includes(text) === true){
        statesModelMatched.push(stateModel);
        this.setState({isAnyStateMatched:true});
      }
    }
    this.setState({statesModelMatched:statesModelMatched});
    console.log(`statesModelMatched:${statesModelMatched}`);
  }
  render() {
    let matchedStateItems = [];
    for(let i = 0;i < this.state.statesModelMatched.length;i++){
      matchedStateItems.push(<li key={this.state.statesModelMatched[i]}>{this.state.statesModelMatched[i]}</li>);
    }
    return <div className="statesFinder">
      {/* Replace this with the code for CS142 Project 4, Problem 2 */}
      <br></br>
      Type the states you want to find:
      <input className="statesInput" type="text" 
       onChange={this.handleStatesInputChange}></input>
       <div className="statesList">
        {this.state.isAnyStateMatched?<ul>{matchedStateItems}</ul>:"No state is matched."}
       </div>
      </div>;

  }
}

export default States;
