import React, { Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { viewNote, deleteNote, updateNote } from '../actions';
import EditNote from './EditNote';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

class ViewNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateActive: false,
            modal: false
        }
    }

    componentDidMount() {
        this.props.viewNote(this.props.match.params.id);
    }

    toggleUpdate = () => {
        this.setState((prevState) => { 
            return {updateActive: !prevState.updateActive}
        });
    }

    deleteNote = () => {
        this.props.deleteNote(this.props.match.params.id, this.props.history);
    };

    toggleModal = () => {
        this.setState((prevState) => {
            return { modal: !prevState.modal };
        });
    }

    render() {
        if (this.props.viewingNote) {
            return(
            <div>
                test
            </div>)
        }
        return (
            <div className="note-view">
                <div className="header">
                    <a onClick={this.toggleUpdate}>edit</a>
                    <a onClick={this.toggleModal}>delete</a>
                </div>
                <div className="note-content">
                    <h3>{this.props.note.title}</h3>
                    <p>{this.props.note.textBody}</p>
                </div>
                               
                {this.state.updateActive !== false
                    ? <EditNote onCancel={this.toggleUpdate} title={this.props.note.title} content={this.props.note.textBody} 
                                updateNote={this.props.updateNote} id={this.props.match.params.id} />
                    : null
                }
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Are you sure you want to delete this note?</ModalHeader>
                    <ModalBody>
                        <Button onClick={this.deleteNote} color="danger">Delete</Button>{' '}
                        <Button onClick={this.toggleModal} className="main-button">No</Button>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      note: state.note,
      viewingNote: state.fetchingNotes,
      viewedNote: state.fetchedNotes,
      error: state.error
    }
  }

export default withRouter(connect(mapStateToProps, { viewNote, deleteNote, updateNote })(ViewNote));