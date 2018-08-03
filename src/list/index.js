import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';
import EditClip from '../form';

import { editClip } from '../actions/app';

class List extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editingClip: false,
    };

    this.videoUrl = 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4';

    this.selectVideo = this.selectVideo.bind(this);
    this.editClip = this.editClip.bind(this);
    this.removeClip = this.removeClip.bind(this);
  }

  editClip(evt, idxClip) {
    evt.preventDefault();
    this.props.actionEditClip(idxClip);
  }

  removeClip(ixdClip) {

  }



  selectVideo(clip) {

  }

  infoClip(ixdClip, clip) {
    const disabled = this.props.appState.selectedClipIdx !== null;
    return (
      <Fragment key={ixdClip}>
        <div className="float-right">
          <button
            disabled={disabled}
            className="mr-2 btn btn-warning"
            type="button"
            title="Edit"
            onClick={evt => this.editClip(evt, ixdClip)}>
            <span className="fas fa-edit " />
          </button>
          <button
            disabled={disabled}
            className="btn btn-danger"
            type="button"
            title="Remove"
            onClick={evt => this.removeClip(ixdClip)}>
            <span className="fas fa-trash" />
          </button>
        </div>
        <h4>{clip.name}</h4>
        <div className="col-6">
          Start: {clip.start}
        </div>
        <div className="col-6">
          End: {clip.end}
        </div>
        <div className="col-12">
          Tags: {clip.tags}
        </div>
      </Fragment>
    );
  }

  setClips() {
    const { clips, selectedClipIdx } = this.props.appState;

    const listClips = clips.map((clip, idxClip) => {
      if (selectedClipIdx === idxClip) {
        return (
          <ListGroupItem
            key={clip.name}
          >
            <EditClip onlyAdd={false} idxClip={idxClip} />
          </ListGroupItem>
        )
      } else {
        return (
          <ListGroupItem
            tag="a"
            href="#"
            key={clip.name}
            onClick={evt => this.selectVideo(clip)}
          >
            {this.infoClip(idxClip, clip)}
          </ListGroupItem>
        )
      }

    });

    return (
      <ListGroup>
        <ListGroupItem
          tag="a"
          href="#"
          onClick={evt => this.selectVideo()}
        >
          <h4>Full Video</h4>
        </ListGroupItem>
        {listClips}
      </ListGroup>

    )
  }

  render() {
    const clips = this.setClips();
    return (
      <div className="row mt-2">
        <div className="col-12">
          <h3>List Clips</h3>
        </div>
        <div className="col-12">
          {clips}
        </div>
      </div>
    );
  }
}

List.proptypes = {
  appState: PropTypes.object,
  actionEditClip: PropTypes.func,
};

// export default List;

const mapStateToProps = state => ({
  appState: state.app,
});

const mapDispatchToProps = {
  actionEditClip: editClip
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
