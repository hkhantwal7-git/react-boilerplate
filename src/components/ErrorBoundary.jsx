import {Component} from 'react';

export default class ErrorBoundary extends Component{
    constructor(props){
		super(props);
		this.state = {
			hasError : false
		};	
	}
	componentDidCatch(error, info) {
		this.setState({
			hasError : true
		})
		console.log(error)
        console.log(info)
    }
    render(){
        if(this.state.hasError){
            return "something went wrong";
        }
        return this.props.children;
    }
}