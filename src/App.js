import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import Form from './form';
import List from './list';

// const getVideo = (appState) => {
//   const { playClip, selectedClip } = appState;
//   let src = 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4';

//   if (playClip) {
//     if (selectedClip.start !== undefined) {
//       src += `#t${selectedClip.start},${selectedClip.end}`;
//     }
//   }

//   const video = document.getElementById('videoclip');
//   console.log("video", video);
//   // const source = video.getElementsByTagName('source');
//   // source.setAttribute('src', src);
// }

class App extends Component {

  componentWillUpdate(prevProps, prevState) {
    const { playClip, selectedClip } = prevProps.appState;
    console.log("playClip, selectedClip", playClip, selectedClip);
    if (playClip) {
      let src = 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4';
      console.log("selectedClip", selectedClip);
      if (selectedClip.start !== undefined) {
        src = `${src}#t=${selectedClip.start},${selectedClip.end}`;
      }
      const video = document.getElementById('videoclip');
      console.log("video", video);
      const source = video.getElementsByTagName('source')[0];
      console.log("source", source);
      source.setAttribute('src', src);
      video.load();
      video.play();
    }


  }

  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="col-md-4 ">
            <Form />
          </div>
          <div className="col-md-4 ">
            <List />
         </div>
          <div className="col-md-4">
            <video id="videoclip" controls preload="metadata"><source /></video>
          </div>
        </div>
      </Fragment>
    );

  }
}

const mapStateToProps = state => ({
  appState: state.app,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(App);
