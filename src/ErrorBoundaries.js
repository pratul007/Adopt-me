// mostly took this from the React docs
import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundaries extends Component{
    state = { hasError: false, redirect: false};
    static getDerivedStateFromError(){
        return { hasError: true };
    }
    componentDidCatch(error, info){
        console.error("ErrorBoundries caught an error", error, info);
        setTimeout(() => this.setState({redirect: true}), 5000);
    }
    
    render(){
        if(this.state.redirect){
            return <Redirect to="/" />
        }
        else if(this.state.hasError){
            return (
                <h2>
                    This listing has an error. <Link to="/">click here</Link> to go back to the home page.
                </h2>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundaries;