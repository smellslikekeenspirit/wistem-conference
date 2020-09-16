import React from 'react';
import "../styles/RegistrationForm.css";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      streetAddress: null,
      email: null,
      organization: null,
      status: null,
      paymentMethod: null,
      errors: {
        firstName: '',
        lastName: '',
        streetAddress: '',
        email: '',
        organization: '',
        status: '',
        paymentMethod: '',
      }
    };
  }
  // TODO: Google places api for address, Stripe/Square for payment

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    let letters = /^[A-Za-z]+$/;


    switch (name) {
      case 'firstName': 
        errors.firstName = 
          !value.match(letters)
            ? 'Name cannot contain numbers.'
            : '';
        break;
      case 'lastName': 
        errors.lastName = 
          !value.match(letters)
            ? 'Name cannot contain numbers.'
            : '';
        break;
      case 'streetAddress': 
        errors.streetAddress = 
          !value.match(letters)
            ? ' cannot contain numbers.'
            : '';
        break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid.';
        break;
      default:
        break;
    }

    this.setState({errors, [name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(validateForm(this.state.errors)) {
      console.info('Valid Form')
    }else{
      console.error('Invalid Form')
    }
  }

  render() {
    const {errors} = this.state;
    return (
      <div className='wrapper'>
        <div className='form-wrapper'>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className='firstName'>
              <label htmlFor="firstName">First Name</label>
              <input type='text' name='firstName' onChange={this.handleChange} noValidate />
              {errors.firstName.length > 0 && 
                <span className='error'>{errors.firstName}</span>}
            </div>
            <div className='lastName'>
              <label htmlFor="lastName">Last Name</label>
              <input type='text' name='lastName' onChange={this.handleChange} noValidate />
              {errors.lastName.length > 0 && 
                <span className='error'>{errors.lastName}</span>}
            </div>
            <div className='streetAddress'>
              <label htmlFor="streetAddress">Street Address</label>
              <input type='streetAddress' name='streetAddress' onChange={this.handleChange} noValidate />
              {errors.email.length > 0 && 
                <span className='error'>{errors.streetAddress}</span>}
            </div>
            <div className='email'>
              <label htmlFor="email">Email Address</label>
              <input type='email' name='email' onChange={this.handleChange} noValidate />
              {errors.email.length > 0 && 
                <span className='error'>{errors.email}</span>}
            </div>
            <div className='submit'>
              <button>Join the community!</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
