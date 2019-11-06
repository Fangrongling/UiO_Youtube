import React,{ Component} from 'react';

class List extends Component{
    constructor(props){
      super(props);
      this.state={
        isGoing: false,
      }

      this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        console.log(e.target,this.props.list);
        const target = e.target;
        const value = target.checked;
        const name = target.name;

        this.props.list.map((l)=> {
            if(l.value===name){
                l.checked = !l.checked;
                if(l.checked){
                    this.props.addToSearchList(name);
                }else{
                    this.props.removeFromSearchList(name);
                }
            }
        });
    }

    render(){
        return (
          <div className="List" style={{position: 'fixed', right: '5%', textAlign:'left'}}>
            {this.props.list.map((l)=> (
                <li>{l.value}
                    <input 
                    name={l.value}
                    type="checkbox" 
                    style={{float:'right'}} 
                    onChange={this.handleInputChange} />
                </li>
            ))}
          </div>
        );
    }
     
}

export default List;   