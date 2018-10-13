import React, { Component } from 'react';
import axios, { post } from 'axios';
import Modal from 'react-awesome-modal';
import { FormContainer, AddNewTitle, InputText, InputButton } from './styles';

export default class Examples extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  closeModal() {
    const { closeModal } = this.props;
    closeModal && closeModal();
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] })
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('file', this.state.file)

    this.fileUpload(formData).then((response) => {
      console.log('---------response', response);
    })
  }

  fileUpload(formData) {
    const url = 'http://localhost:5000/upload';
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      }
    }
    return post(url, formData, config)
  }

  render() {
    const { visible } = this.props;

    return (
      <Modal
        visible={visible}
        width="400"
        height="450"
        effect="fadeInUp"
        onClickAway={() => this.closeModal()}
      >
        <FormContainer>
          <AddNewTitle>ADD NEW MARKER</AddNewTitle>
          <form onSubmit={this.handleSubmit}>
            <label>Image</label>
            <InputText type="file" onChange={this.onChange} accept="image/*" />
            <label>Address</label>
            <InputText type="text" id="address" name="address" />
            <label>Lat</label>
            <InputText type="text" id="lat" name="lat" />
            <label>Lng</label>
            <InputText type="text" id="lng" name="lng" />
            <InputButton type="button" value="Cancel" onClick={() => this.closeModal()} />
            <InputButton type="submit" value="Submit" />
          </form>
        </FormContainer>
      </Modal>
    );
  }
}