import { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from './Carousel'
import ErrorBoundaries from "./ErrorBoundaries";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component{
    constructor(){
        super();
        this.state = {loading: true, showModal: false};
    }
    async componentDidMount(){
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
        );
        const json = await res.json();
        this.setState(
            Object.assign(
                {
                    loading: false,
                },
                json.pets[0]
            )
        );
        // this.setState({                   (this is same as the above but it is use when we want some selected
        //     loading: false,               from api)
        //     name: json.pets[0].name,
        //     breed: json.pets[0].breed,
        //     animal: json.pets[0].name,
        //     description: json.pets[0].description,
        // }
        // )
    }
    togglemodal = () => this.setState({ showModal: !this.State.showModal });
    adopt = () => (window.location = "http://bit.ly/pet-adopt");


   render(){
       const {animal, breed, city, state, description, name, images, showModal} = this.state;
       return (
           <div className="details">
               <Carousel  images={images}/>
               <h1>{name}</h1>
               <h2>{`${animal} - ${breed} - ${city}, ${state}`}</h2>
               <ThemeContext.Consumer>
                   {([theme])=>(
                       <button onClick={this.togglemodal} style={{backgroundColor: theme}}>Adopt {name}</button>

                   )}
               </ThemeContext.Consumer>
               <p>{description}</p>
               {
                   showModal ? (
                       <Modal>
                           <div>
                               <h1>Hi would u like to adopt {name}</h1>
                               <div className="button">
                                   <button onClick={this.adopt}>Yes</button>
                                   <button onClick={this.togglemodal}>No, I am a Monster</button>

                               </div>
                           </div>
                       </Modal>
                   ) : null
               }
           </div>
       )
   }
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundaries(){
    return(
        <ErrorBoundaries>
            <DetailsWithRouter />
        </ErrorBoundaries>
    )
}