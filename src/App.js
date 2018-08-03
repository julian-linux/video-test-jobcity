import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Form from './form';
import List from './list';

const getVideo = () => {
  // const url = this.videoUrl;
  // const source = (<source src={url} />);
  const source = null;
  return (
    <video controls>
      {source}
    </video>
  )
}

const App = ({ props }) => {
  const video = getVideo();
  return (
    <Fragment>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {video}
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-3">
          <Form />
        </div>
        <div className="col-md-9">
          <List />
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  appState: state.app,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(App);
