import React, { Component, Fragment } from 'react';
import Form from './form';
import List from './list';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listClips: [],
      selectedVideo:{}
    }
    // this.videoUrl = 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4';
    this.addClip = this.addClip.bind(this);
    this.searchTag = this.searchTag.bind(this);
    this.selectVideo = this.selectVideo.bind(this);
  }

  addClip(clip) {
    const { listClips } = this.state;
    listClips.push(clip);
    this.setState({ listClips });
  }

  getVideo() {
    // const url = this.videoUrl;
    // const source = (<source src={url} />);
    const source = null;
    return (
      <video controls>
          {source}
      </video>
    )
  }

  searchTag() {

  }

  selectVideo(clip){
    this.setState({selectedVideo: clip});
  }

  render() {
    const video = this.getVideo();

    return (
      <Fragment>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            {video}
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-3">
            <Form
              onAddClip={this.addClip}
              onSearchTag={this.searchTag}
              listClips={this.state.listClips}
            />
          </div>
          <div className="col-9">
            <List
              listClips={this.state.listClips}
              onSelectVideo={this.selectVideo}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
