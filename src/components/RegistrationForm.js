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
  UNSAFE_componentWillMount() {
    this.setState(Object.getPrototypeOf(this).constructor.STATE || {});
}

componentWillUnmount(){
    Object.getPrototypeOf(this).constructor.STATE = this.state;
}
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      streetAddress: null,
      city: null,
      state: null,
      zipcode: null,
      email: null,
      organization: null,
      status: null,
      paymentMethod: null,
      errors: {
        firstName: '',
        lastName: '',
        streetAddress: '',
        city: '',
        state: '',
        zipcode: '',
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
        this.setState({firstName: this.state.firstName});
        break;
      case 'lastName': 
        errors.lastName = 
          !value.match(letters)
            ? 'Name cannot contain numbers.'
            : '';
        this.setState({lastName: this.state.lastName});
        break;
      case 'streetAddress': 
        errors.streetAddress = 
          value == ""
            ? 'Address cannot be empty.'
            : '';
        this.setState({streetAddress: this.state.streetAddress});
        break;
      case 'city': 
        errors.city = 
          !value.match(letters)
            ? 'City cannot contain numbers.'
            : '';
        this.setState({city: this.state.city});
        break;
      case 'state': 
        errors.state = 
          value === ""
            ? 'State cannot be empty.'
            : '';
        this.setState({state: this.state.state});
        break;
      case 'zipcode': 
        errors.zipcode = 
          isNaN(value)
            ? 'Zipcode cannot contain letters.'
            : '';
        this.setState({zipcode: this.state.zipcode});
        break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid.';
        this.setState({email: this.state.email});
        break;
      case 'organization': 
        errors.organization = 
          value === ""
          ? 'Organization cannot be empty.'
          : !value.match(letters)
            ? 'Organization cannot contain numbers.'
            : '';
        this.setState({organization: this.state.organization});
        break;
      case 'status': 
        errors.status = 
          value == ""
          ? 'Status cannot be empty.'
          : '';
        this.setState({status: this.state.status});
        break;
      case 'paymentMethod': 
        errors.paymentMethod = 
          value === ""
            ? 'Payment method cannot be empty.'
            : '';
        this.setState({paymentMethod: this.state.paymentMethod});
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
      this.props.history.push(this.state);
      this.props.history.push('/review');
    }else {
      console.log(this.state.errors)
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
            <div className='city'>
              <label htmlFor="city">City </label>
              <input type='city' name='city' onChange={this.handleChange} noValidate />
              {errors.city.length > 0 && 
                <span className='error'>{errors.city}</span>}
            </div>
            <div className='state'>
              <label htmlFor="state">State</label>
              <select id="state" name="state" onChange={this.handleChange}>
                <option value="" selected disabled hidden></option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
              {errors.state.length > 0 && 
                <span className='error'>{errors.state}</span>}
            </div>
            <div className='zipcode'>
              <label htmlFor="zipcode">Zipcode</label>
              <input type='zipcode' name='zipcode' onChange={this.handleChange} noValidate />
              {errors.zipcode.length > 0 && 
                <span className='error'>{errors.zipcode}</span>}
            </div>
            <div className='email'>
              <label htmlFor="email">Email Address</label>
              <input type='email' name='email' onChange={this.handleChange} noValidate />
              {errors.email.length > 0 && 
                <span className='error'>{errors.email}</span>}
            </div>
            <div className='organization'>
              <label htmlFor="organization">Organization</label>
              <input type='organization' name='organization' onChange={this.handleChange} noValidate />
              {errors.organization.length > 0 && 
                <span className='error'>{errors.organization}</span>}
            </div>
            <div className='status'>
              <label htmlFor="status">Status</label>
              <select id="status" name="status" onChange={this.handleChange}>
                  <option value="" selected disabled hidden></option>
                  <option value="Undergraduate student">Undergraduate student</option>
                  <option value="Graduate student">Graduate student</option>
                  <option value="Professor">Professor</option>
                  <option value="Industry employee">Industry employee</option>
              </select>
              {errors.status.length > 0 && 
                <span className='error'>{errors.status}</span>}
            </div>
            <div className='paymentMethod'>
              <label htmlFor="paymentMethod">Payment Method</label>
              <select id="paymentMethod" name="paymentMethod" onChange={this.handleChange}>
                  <option value="" selected disabled hidden></option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="paypal">PayPal</option>
              </select>
              {errors.paymentMethod.length > 0 && 
                <span className='error'>{errors.paymentMethod}</span>}
            </div>
            <div className='submit'>
              <button onClick={this.handleSubmit}>Reserve your spot!</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
