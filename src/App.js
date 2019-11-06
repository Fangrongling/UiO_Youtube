import React,{ Component} from 'react';
import './App.css';
import YTSearch from 'youtube-api-search';
import Search from './Search.jsx';
import List from './List.jsx';
import VideoList from './VideoList.jsx';

const API_KEY = 'AIzaSyAMh39-HOZY0UI-fGiBUNqpPmM7PG0MJMY';

class App extends Component{
  constructor(props){
    super(props);
    this.videoSearch = this.videoSearch.bind(this);
    this.addToList = this.addToList.bind(this);
    this.addToSearchList = this.addToSearchList.bind(this);
    this.removeFromSearchList = this.removeFromSearchList.bind(this);
    this.searchYT = this.searchYT.bind(this);
    this.addToHiddenList = this.addToHiddenList.bind(this);

    this.state={
      list:[],
      searchList:[],
      videoList:[],
      hiddenList:[],
    }
  }

  //Search both from given list and from the input entry
  videoSearch(searchText){
    let searchList = this.state.searchList; 
    if(searchText === ""){
      this.searchYT(searchList);
    }else{
      searchList = searchList.concat(searchText);
      this.searchYT(searchList);
    } 
  }

  //Add to the search list, and duplicate content will not be added to the list
  addToList(item){
    let list = this.state.list;
    let exist = false;   
    if (list.length) {
      list.map(l => {
      if (l.value === item.toLowerCase()) { 
          exist = true;
        }
      })
    }
    if(!exist && item!==""){
      item = item.toLowerCase();
      list = list.concat(Object.assign({value:item, checked: false}));
      this.setState({list});
    }
  }

  //Check the things to be found
  addToSearchList(item){
    let searchList = this.state.searchList;
    searchList = searchList.concat(item.toLowerCase());
    console.log(searchList);
    this.setState({searchList});
  }

  removeFromSearchList(item){
    this.setState(prevState => ({
      searchList: prevState.searchList.filter(el => el !== item )
    }));
  }

  //search video from Youtube
  searchYT(searchList){
    let videoList = this.state.videoList;
    searchList.map(term => (
      YTSearch({key : API_KEY, term}, videos => {
      videoList  = videoList.concat(videos);
      videoList = videoList.sort((a, b) => Date.parse(b.snippet.publishedAt) - Date.parse(a.snippet.publishedAt));
      this.setState({videoList});
    })));

    //Empty list for do new search
    videoList = [];
    this.setState({videoList});
  }

  addToHiddenList(item){
    let hiddenList = this.state.hiddenList;
    hiddenList = hiddenList.concat(item);
    this.setState({hiddenList});
  }

  render(){
    return (
      <div className="App">
        <Search videoSearch={this.videoSearch} addToList={this.addToList} />
        <List list={this.state.list} addToSearchList={this.addToSearchList} removeFromSearchList={this.removeFromSearchList}/>
        <VideoList videos={this.state.videoList} hiddenList={this.state.hiddenList} addToHiddenList={this.addToHiddenList}/>
      </div>
    );
  }
 
}

export default App;
