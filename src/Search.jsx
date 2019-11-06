import React,{ Component} from 'react';

class Search extends Component{
    constructor(props){
        super(props);
        this.onTextChange = this.onTextChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        

        this.state={
            text:""
        }
    }

    handleAdd(e){
        e.preventDefault();
        this.props.addToList(this.state.text);
        this.setState({ text: "" });
    }

    onTextChange(e) {
        this.setState({ text: e.target.value });      
    }

    handleSearch(e){
        e.preventDefault();
        this.props.videoSearch(this.state.text);
        this.setState({ text: "" });        
    }
  
    render(){
        return (
            <div className="Search">
                <input id="search" type="textr" placeholder="Enter title" value={this.state.text} onChange={this.onTextChange}/>
                <button onClick={this.handleAdd}>Add to search list</button>
                <button onClick={this.handleSearch}>Search</button>
            </div>
        );
    }
    
}

export default Search;