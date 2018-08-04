import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import Form from './form';
import List from './list';

import { selectNextClip, init } from './actions/app';

class App extends Component {
  constructor(props) {
    super(props);
    this.jumpNextClip = this.jumpNextClip.bind(this);
  }

  componentDidMount() {
    this.props.actionInit();
  }
  jumpNextClip() {
    setTimeout(() => {
      this.props.actionSelectNextClip();
    }, 3000);
  }

  componentWillUpdate(prevProps) {
    const { playClip, selectedClip } = prevProps.appState;

    if (playClip) {
      let src = 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4';

      if (selectedClip.start !== undefined) {
        src = `${src}#t=${selectedClip.start},${selectedClip.end}`;
      }

      const video = document.getElementById('videoclip');

      const source = video.getElementsByTagName('source')[0];

      source.setAttribute('src', src);
      video.load();
      video.play();

      video.onpause = () => this.jumpNextClip();
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

const mapDispatchToProps = {
  actionSelectNextClip: selectNextClip,
  actionInit: init,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
