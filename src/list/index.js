import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';

class List extends Component {

  constructor(props) {
    super(props);
    this.videoUrl = 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4';

    this.selectVideo = this.selectVideo.bind(this);
  }

  selectVideo(clip) {

  }

  setClips() {
    const clips = this.props.listClips.map((clip, ixdClip) => (
      
      <ListGroupItem
        tag="a"
        href="#"
        key={clip.name}
        onClick={evt => this.selectVideo(clip)}
      >
        <div className="float-right">
          <button className="mr-2 btn btn-warning" type="button" title="Edit">
            <span className="fas fa-edit " />
          </button>
          <button className="btn btn-danger" type="button" title="Remove">
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
      </ListGroupItem>
    ));

    return (
      <ListGroup>
        <ListGroupItem
          tag="a"
          href="#"
          onClick={evt => this.selectVideo()}
        >
          <h4>Full Video</h4>
        </ListGroupItem>
        {clips}
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
  listClips: PropTypes.array,
};

export default List;
