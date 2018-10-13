import React, { Component } from 'react';
import axios, { post } from 'axios';
import Modal from 'react-awesome-modal';
import { FormContainer, AddNewTitle, InputText, InputButton } from './styles';

export default class Examples extends Component {
  constructor(props) {
    super(props);

    this.state = this.initData()
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  initData = () => {
    return {
      file: null,
      address: '',
      lat: 0,
      lng: 0,
      errors: {}
    }
  }

  handleValidation(){
    let errors = {};
    let formIsValid = true;

    //Address
    if(!this.state.address){
       formIsValid = false;
       errors["address"] = "Cannot be empty";
    }
    //Lat
    if(!this.state.lat){
      formIsValid = false;
      errors["lat"] = "Cannot be empty";
   }
   //Lng
   if(!this.state.lng){
    formIsValid = false;
    errors["lg"] = "Cannot be empty";
 }
   this.setState({errors: errors});
   return formIsValid;
}


  closeModal = () => {
    const { closeModal } = this.props;
    closeModal && closeModal();
    this.setState({ ...this.initData() })
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }


  handleSubmit = (event) => {
    event.preventDefault();
    if(this.handleValidation()){
      const { onUpdateMarker } = this.props;
      event.preventDefault();

      const formData = new FormData();
      formData.append('file', this.state.file)
      formData.append('address', this.state.address)
      formData.append('lat', this.state.lat)
      formData.append('lng', this.state.lng)

      this.fileUpload(formData).then((response) => {
        const { marker } = response.data;
        onUpdateMarker && onUpdateMarker(marker);
        this.closeModal();
      })
    }
  }

  fileUpload(formData) {
    const url = 'http://localhost:5000/upload';
    return post(url, formData)
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
            <label>Address</label> <span style={{color: "red"}}>{this.state.errors["address"]}</span>
            <InputText type="text" id="address" name="address" onChange={this.handleInputChange} />
            <label>Lat</label> <span style={{color: "red"}}>{this.state.errors["address"]}</span>
            <InputText type="text" id="lat" name="lat" onChange={this.handleInputChange} />
            <label>Lng</label> <span style={{color: "red"}}>{this.state.errors["address"]}</span>
            <InputText type="text" id="lng" name="lng" onChange={this.handleInputChange} />
            <InputButton type="button" value="Cancel" onClick={() => this.closeModal()} />
            <InputButton type="submit" value="Submit" />
          </form>
        </FormContainer>
      </Modal>
    );
  }
}