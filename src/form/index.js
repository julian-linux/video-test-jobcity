import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Form, FormGroup, Label, Col, Button, FormFeedback } from 'reactstrap';

import { addClip, searchByTags } from '../actions/app';

class FormSearch extends Component {

  constructor(props) {
    super(props);

    const { selectedClip } = props.appState;

    this.state = {
      duplicated: false,
      sameTime: false,
      sameTimeLine: false,
      startGreater: false,
      data: {
        name: selectedClip.name || 'a',
        tags: selectedClip.tags || '',
        start: selectedClip.start || 0,
        end: selectedClip.end || 1,
      },
      notValid: {
        name: false,
        start: false,
        end: false,
      }
    };

    this.addClip = this.addClip.bind(this);
    this.searchByTags = this.searchByTags.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }

  componentWillMount() {
    this.isEditing = !isNaN(this.props.idxClip);
  }

  addClip(evt) {
    evt.preventDefault();

    let ok = true;
    let sameTime = false;
    let startGreater = false;

    const { data: { name, start, end } } = this.state;

    if (start === end) {
      sameTime = true;
      ok = false;
    }

    if (start > end) {
      startGreater = true;
      ok = false;
    }

    const notValid = {
      name: false,
      start: false,
      end: false,
    };

    if (name === '') {
      notValid.name = true;
      ok = false;
    }

    if (isNaN(start) || start < 0 || start > 51) {
      notValid.start = true;
      ok = false;
    }

    if (isNaN(end) || end < 1 || end > 52) {
      notValid.end = true;
      ok = false;
    }

    if (ok) {
      this.validateInListClips();
    } else {
      this.setState({
        notValid,
        sameTime,
        startGreater
      });
    }
  }

  validateInListClips() {
    const { data } = this.state;
    let duplicated = false;
    let sameTimeLine = false;

    // eslint-disable-next-line
    const { clips } = this.props.appState;

    clips.every((clip, idxListClip) => {
      if (idxListClip === this.props.idxClip) {
        return true;
      }

      if (data.name === clip.name) {
        duplicated = true;
        return false;
      }

      if (data.start === clip.start && data.end === clip.end) {
        sameTimeLine = true;
        return false;
      }

      return true;
    });

    if (duplicated || sameTimeLine) {
      const notValid = {
        name: false,
        start: false,
        end: false,
      };
      this.setState({ duplicated, sameTimeLine, notValid });
    } else {
      this.restartValidations();
    }
  }

  restartValidations() {
    const clip = this.state.data;
    const notValid = {
      name: false,
      start: false,
      end: false,
    };

    const data = {
      name: '',
      tags: '',
      start: 0,
      end: 1,
    };

    const duplicated = false;
    const sameTimeLine = false;

    this.setState({
      notValid,
      data,
      duplicated,
      sameTimeLine
    }, () => {
      this.props.actionAddClip(clip);
    });
  }

  changeValue(input, value) {
    this.setState({
      data: {
        ...this.state.data,
        [input]: value
      }
    });
  }

  searchByTags(evt) {
    const { value } = evt.target;
    this.props.actionSearchByTags(value);
  }

  validateInvalidTexts() {
    const { notValid } = this.state;
    return {
      name: {
        invalid: notValid.name || this.state.duplicated,
        text: (notValid.name && 'Not empty') || (this.state.duplicated && 'Already Exists') || ''
      },
      start: {
        invalid: notValid.start || this.state.sameTime || this.state.sameTimeLine || this.state.startGreater,
        text: (notValid.start && 'Min 0, Max 51. Only numbers')
          || (this.state.sameTime && 'Same Time')
          || (this.state.sameTimeLine && 'Already Exists')
          || (this.state.startGreater && 'Start greater than End')
          || ''
      },
      end: {
        invalid: notValid.end || this.state.sameTime || this.state.sameTimeLine,
        text: (notValid.end && 'Min 1, Max 52. Only numbers')
          || (this.state.sameTime && 'Same Time')
          || (this.state.sameTimeLine && 'Already Exists')
          || ''
      }
    };
  }

  setButtons() {

    if (this.props.onlyAdd) {
      return (
        <Button type="submit " color="primary" title="Add Clip">
          <span className="fas fa-plus" />
        </Button>
      );
    }
    return (
      <Fragment>
        <Button type="submit" color="primary" title="Edit Clip" className="mr-1 " >
          <span className="fas fa-edit" />
        </Button>
        <Button type="buttons" color="danger" title="Cancel">
          <span className="fas fa-times" />
        </Button>
      </Fragment>
    );

  }

  setSearch() {
    if (this.props.onlyAdd) {
      return (
        <div className="row mt-2">
          <div className="col-12 text-center">
            <h3>Search Clips</h3>
          </div>
          <div className="col-12">
            <Input placeholder="Tags" onChange={this.searchByTags} />
          </div>
        </div>
      )
    }
  }

  render() {
    const { data } = this.state;

    const invalid = this.validateInvalidTexts();

    const buttons = this.setButtons();

    const search = this.setSearch();

    const title = this.props.onlyAdd ?
      (<div className="col-12 text-center"><h3>Add Clip</h3></div>) :
      '';

    return (
      <Fragment>
        {search}
        <div className="row mt-2">
          {title}
          <div className="col-12">
            <Form onSubmit={this.addClip} noValidate>
              <FormGroup row>
                <Label for="id" sm={2}>Name</Label>
                <Col sm={10}>
                  <Input
                    value={data.name}
                    type="text"
                    id="name"
                    invalid={invalid.name.invalid}
                    onChange={evt => this.changeValue('name', evt.target.value)}
                  />
                  <FormFeedback invalid={invalid.name.invalid ? 'true' : undefined}>{invalid.name.text}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="start" sm={2}>Start</Label>
                <Col sm={10}>
                  <Input
                    value={data.start}
                    type="number"
                    id="start"
                    placeholder="Second"
                    min="0"
                    max="51"
                    onChange={evt => this.changeValue('start', parseInt(evt.target.value, 10))}
                    invalid={invalid.start.invalid}
                  />
                  <FormFeedback invalid={invalid.start.invalid ? 'true' : undefined}>{invalid.start.text}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="end" sm={2}>End</Label>
                <Col sm={10}>
                  <Input
                    value={data.end}
                    type="number"
                    id="end"
                    placeholder="Second"
                    min="1"
                    max="52"
                    onChange={evt => this.changeValue('end', parseInt(evt.target.value, 10))}
                    invalid={invalid.end.invalid}
                  />
                  <FormFeedback invalid={invalid.end.invalid ? 'true' : undefined}>{invalid.end.text}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="tags" sm={2}>Tags</Label>
                <Col sm={10}>
                  <Input
                    value={data.tags}
                    type="text"
                    id="tags"
                    placeholder="(Optional)"
                    onChange={evt => this.changeValue('tags', evt.target.value)} />
                </Col>
              </FormGroup>

              <FormGroup className="text-right">
                {buttons}
              </FormGroup>
            </Form>
          </div>

        </div>
      </Fragment >
    );
  }
}

FormSearch.proptypes = {
  onlyAdd: PropTypes.bool,
  idxClip: PropTypes.number,
  appState: PropTypes.object,
  actionAddClip: PropTypes.func,
};

FormSearch.defaultProps = {
  onlyAdd: true,
};

const mapStateToProps = state => ({
  appState: state.app,
});

const mapDispatchToProps = {
  actionAddClip: addClip,
  actionSearchByTags: searchByTags,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormSearch);
