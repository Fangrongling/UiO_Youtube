import React,{ Component} from 'react';

class VideoList extends Component{
    constructor(props){
      super(props);
      this.state = {
        videos: [],
        isToggleOn: true,
        dispaly: 'block',
        clickedVideo: "",
      };
      this.handleClick = this.handleClick.bind(this);
      this.hiddenVideo = this.hiddenVideo.bind(this);
    }
   
    handleClick(e, video) {
        this.setState(prevState => ({
          isToggleOn: !prevState.isToggleOn,
          display: prevState.isToggleOn ? 'none': 'block',
          clickedVideo: e.id.videoId
        }));
    }

    hiddenVideo(e){
        //e.preventDefault();
        this.props.addToHiddenList(e.target.value);
    }

    render(){
        let videos = this.props.videos;  
        return (
            <div className="VideoList">
            
            {//The hidden movies should not appear in the list anymore.
                this.props.hiddenList.map(h=> (
                    videos = videos.filter(el => el.id.videoId !== h )
                )), console.log("map hiddenlist")
            }
            
            {//Limit the number of movies displayed in the list to 10.
                videos.slice(0, 10).map(video => (
                    <VidoeListItem 
                        video={video}
                        handleClick={() => this.handleClick(video)}
                        dispaly={this.state.dispaly}
                        isToggleOn={this.state.isToggleOn}
                        clickedVideo={this.state.clickedVideo}
                        addHiddenVideos={this.hiddenVideo}
                        hiddenVideos={this.props.hiddenList}
                    />
                ))
            }
            </div>
        );
    }
   
  }

  const VidoeListItem = ({video,  handleClick, display, isToggleOn, clickedVideo, addHiddenVideos, hiddenVideos}) =>{
    let imageUrl = video.snippet.thumbnails.medium.url;
    let title = video.snippet.title;
    let time = video.snippet.publishedAt;
    let videoUrl = "https://www.youtube.com/embed/"+video.id.videoId
    title = title.replace(/&quot;/g, ' ');
    return(
        <div>
            { //Click video info(title/time) to play or hidden palying, and click "hidden video" button to hide the video from list.
                clickedVideo===video.id.videoId ?[
                    isToggleOn ? [
                            <p>====================================================</p>,
                            <button value={video.id.videoId} onClick={addHiddenVideos}>Hidden Video</button>,
                            <div onClick={handleClick}>
                                <p>Title: {title}</p>
                                <p>Date: {time}</p>
                            </div>
                        ]:[
                            <p>====================================================</p>,
                            <iframe width="560" height="315" src={videoUrl} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style={{display: display}}></iframe>,
                            <br/>,<button value={video.id.videoId} onClick={addHiddenVideos}>Hidden Video</button>,
                            <div onClick={handleClick}>
                                <p>Title: {title}</p>
                                <p>Date: {time}</p>
                            </div>
                        ]
                    ] : [
                        <p>====================================================</p>,
                        <button value={video.id.videoId} onClick={addHiddenVideos}>Hidden Video</button>,
                        <div onClick={handleClick}>                    
                            <p>Title: {title}</p>
                            <p>Date: {time}</p>
                        </div>
                ]
            }
        </div>
    );
  }
  
  export default VideoList;
