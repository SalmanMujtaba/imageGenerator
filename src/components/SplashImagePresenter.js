import React from 'react';
import loadingHOC from './loadingHOC';

class SplashImagePresenter extends React.Component {
  SUBMIT_BUTTON_LABEL = "Get Random Image";
  IMAGE_HEIGHT = "300";
  IMAGE_WIDTH = "600";
  
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      userInput: "",
    }
  }

  
  handleSubmit(event) {
    this.props.handle(this.state.userInput.trim());
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({userInput: event.target.value});
  }

  render() {
    const { data, error } = this.props;
    const { welcomeText } = this.state; 
    let imagesReceived = false;
    if(data && data.length > 0) {
      imagesReceived = true;
    }
    return (
      <>
      <main>
        <form className="center-align" onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.userInput} onChange={this.handleChange}/>
          </label>
          <button>{this.SUBMIT_BUTTON_LABEL}</button>
        </form>
        {
          error && <p className="center-align error">Image not found</p>
        }
        {
          !!welcomeText && <p className="center-align">{welcomeText}</p>
        }
      
        <div className="container">
          <div className="image-container">
            {
              imagesReceived &&
              data.map(( img, index ) => 
              (
                <img key={index} src={img} alt={index} >
                </img>
              ))
            }
          </div>
        </div>
      </main>
      </>
    );
  }
}
      
export default loadingHOC(SplashImagePresenter);