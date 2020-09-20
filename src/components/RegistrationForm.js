import React from 'react';
import "../styles/RegistrationForm.css";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validDateRegex =RegExp(/^[0-3]?[0-9]\/[01]?[0-9]\/[12][90][0-9][0-9]$/);
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  console.log(errors);
  return valid;
};


export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: sessionStorage.firstName || null,
      lastName: sessionStorage.lastName || null,
      streetAddress: sessionStorage.streetAddress || null,
      city: sessionStorage.city || null,
      state: sessionStorage.state || null,
      zipcode: sessionStorage.zipcode || null,
      email: sessionStorage.email || null,
      organization: sessionStorage.organization || null,
      date: sessionStorage.date || null,
      status: sessionStorage.status || null,
      paymentMethod: sessionStorage.paymentMethod || null,
      errors: {
        firstName: '',
        lastName: '',
        streetAddress: '',
        city: '',
        state: '',
        zipcode: '',
        email: '',
        organization: '',
        date: '',
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
        value == "" || value == null
        ? 'First name cannot be empty.'
        : !value.match(letters)
            ? 'First name cannot contain numbers.'
            : '';
        this.setState({firstName: this.state.firstName});
        break;
      case 'lastName': 
        errors.lastName = 
        value == "" || value == null
        ? 'Last name cannot be empty.'
        : !value.match(letters)
            ? 'Last name cannot contain numbers.'
            : '';
        this.setState({lastName: this.state.lastName});
        break;
      case 'streetAddress': 
        errors.streetAddress = 
          value == "" || value == null
            ? 'Address cannot be empty.'
            : '';
        this.setState({streetAddress: this.state.streetAddress});
        break;
      case 'city': 
        errors.city = 
        value == "" || value == null
        ? 'City cannot be empty.'
        : !value.match(letters)
            ? 'City cannot contain numbers.'
            : '';
        this.setState({city: this.state.city});
        break;
      case 'state': 
        errors.state = 
          value == "" || value == null
            ? 'State cannot be empty.'
            : '';
        this.setState({state: this.state.state});
        break;
      case 'zipcode': 
        errors.zipcode = 
        value == "" || value == null
            ? 'Zipcode cannot be empty.'
            : isNaN(value)
            ? 'Zipcode cannot contain letters.'
            : '';
        this.setState({zipcode: this.state.zipcode});
        break;
      case 'email': 
        errors.email = 
        value == "" || value == null
            ? 'Email cannot be empty.'
            : validEmailRegex.test(value)
              ? ''
              : 'Email is not valid.';
        this.setState({email: this.state.email});
        break;
      case 'organization': 
        errors.organization = 
          value != '' && !value.match(letters)
            ? 'Organization cannot contain numbers.'
            : '';
        this.setState({organization: this.state.organization});
        break;
      case 'date': 
      errors.date = 
        value == "" || null
        ? 'Date cannot be empty.'
        : !value.match(validDateRegex)
          ? 'Invalid date.'
          : '';
        this.setState({date: this.state.date});
        break;
      case 'status': 
      errors.status = 
        value == "" || null
        ? 'Status cannot be empty.'
        : '';
        this.setState({status: this.state.status});
        break;
      case 'paymentMethod': 
        errors.paymentMethod = 
          value == "" || null
            ? 'Payment method cannot be empty.'
            : '';
        this.setState({paymentMethod: this.state.paymentMethod});
        break;
      default:
        break;
    }
    console.log(errors);

    this.setState({errors, [name]: value});
  }

  checkEmptyRequiredFields () {
    this.state.errors.firstName = 
      this.state.firstName == null
      ? 'First name cannot be empty.'
      : this.state.errors.firstName;
    this.state.errors.lastName = 
      this.state.lastName == null
      ? 'Last name cannot be empty.'
      : this.state.errors.lastName;
    this.state.errors.streetAddress = 
      this.state.streetAddress == null
      ? 'Address cannot be empty.'
      : this.state.errors.streetAddress;
    this.state.errors.city = 
      this.state.city == null
      ? 'City cannot be empty.'
      : this.state.errors.city;
    this.state.errors.state = 
      this.state.state == null
        ? 'State cannot be empty.'
        : this.state.errors.state;
    this.state.errors.zipcode = 
      this.state.zipcode == null
        ? 'Zipcode cannot be empty.'
        : this.state.errors.zipcode;
    this.state.errors.email = 
      this.state.email == null
        ? 'Email cannot be empty.'
        : this.state.errors.email;
    this.state.errors.date = 
    this.state.date == null
      ? 'Date cannot be empty.'
      : this.state.errors.date;
    this.state.errors.status = 
      this.state.status == null
        ? 'Status cannot be empty.'
        : this.state.errors.status;
    this.state.errors.paymentMethod = 
      this.state.paymentMethod == null
        ? 'Payment method cannot be empty.'
        : this.state.errors.paymentMethod;
    this.setState({errors: this.state.errors});


  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.checkEmptyRequiredFields();
    if(validateForm(this.state.errors)) {
      console.info('Valid Form')
      this.props.history.push(this.state);
      if(typeof(Storage) !== "undefined") {
        sessionStorage.setItem("firstName", this.state.firstName);
        sessionStorage.setItem("lastName", this.state.lastName);
        sessionStorage.setItem("streetAddress", this.state.streetAddress);
        sessionStorage.setItem("city", this.state.city);
        sessionStorage.setItem("state", this.state.state);
        sessionStorage.setItem("zipcode", this.state.zipcode);
        sessionStorage.setItem("email", this.state.email);
        if (this.state.organization == null){
          sessionStorage.setItem("organization", '');
        }
        else{
          sessionStorage.setItem("organization", this.state.organization);
        }
        sessionStorage.setItem("date", this.state.date);
        sessionStorage.setItem("status", this.state.status);
        sessionStorage.setItem("paymentMethod", this.state.paymentMethod);
        console.log(sessionStorage.firstName);
      }
      this.props.history.push('/review');
    }else {
      console.log(this.state.errors)
      console.error('Invalid Form');
    }
    
  }

  render() {
    const {errors} = this.state;
    return (
      <div className='wrapper'>
        <div className='form-wrapper'>
          
          <form onSubmit={this.handleSubmit} noValidate>
            <div><span id="span"></span></div>
            <div className="row">
            <div className='cell'>
              <label htmlFor="firstName" class="required">First Name</label>
              <input type='text' name='firstName' value={this.state.firstName} onChange={this.handleChange} noValidate />
              {errors.firstName.length > 0 && 
                <span className='error'>{errors.firstName}</span>}
            </div>
            <div className='cell'>
              <label htmlFor="lastName" class="required" >Last Name</label>
              <input type='text' name='lastName' value={this.state.lastName} onChange={this.handleChange} noValidate />
              {errors.lastName.length > 0 && 
                <span className='error'>{errors.lastName}</span>}
            </div>
            </div>
            <div className='streetAddress'>
              <label htmlFor="streetAddress" class="required">Street Address</label>
              <input type='streetAddress' name='streetAddress' value={this.state.streetAddress} onChange={this.handleChange} noValidate />
              {errors.streetAddress.length > 0 && 
                <span className='error'>{errors.streetAddress}</span>}
            </div>
            <div className="row">
            <div className='cell'>
              <label htmlFor="city" class="required">City</label>
              <input type='city' name='city' value={this.state.city} onChange={this.handleChange} noValidate />
              {errors.city.length > 0 && 
                <span className='error'>{errors.city}</span>}
            </div>
            <div className='cell'>
              <label htmlFor="zipcode" class="required">Zipcode</label>
              <input type='zipcode' name='zipcode' value={this.state.zipcode} onChange={this.handleChange} noValidate />
              {errors.zipcode.length > 0 && 
                <span className='error'>{errors.zipcode}</span>}
            </div>
            </div>

            <div className='state'>
              <label htmlFor="state"class="required">State</label>
              <select id="state" name="state" value={this.state.state} onChange={this.handleChange}>
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
            <div className='email'>
              <label htmlFor="email" class="required">Email Address</label>
              <input type='email' name='email' value={this.state.email} onChange={this.handleChange} noValidate />
              {errors.email.length > 0 && 
                <span className='error'>{errors.email}</span>}
            </div>
            <div className='organization'>
              <label htmlFor="organization">Organization</label>
              <input type='organization' name='organization' value={this.state.organization} onChange={this.handleChange} noValidate />
              {errors.organization.length > 0 && 
                <span className='error'>{errors.organization}</span>}
            </div>
            <div className="date">
              <label for="start" class="required">Preferred Date</label>
              <input name='date' placeholder='dd/mm/yyyy' value={this.state.date} onChange={this.handleChange} noValidate />
              {errors.date.length > 0 && 
                <span className='error'>{errors.date}</span>}
            </div>
            <div className='status'>
              <label htmlFor="status" class="required">Status</label>
              <select id="status" name="status" value={this.state.status} onChange={this.handleChange}>
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
              <label htmlFor="paymentMethod" class="required">Payment Method</label>
              <select id="paymentMethod" name="paymentMethod"  value={this.state.paymentMethod} onChange={this.handleChange}>
                  <option value="" selected disabled hidden></option>
                  <option value="Credit/Debit Card">Credit/Debit Card</option>
                  <option value="Paypal">PayPal</option>
              </select>
              {errors.paymentMethod.length > 0 && 
                <span className='error'>{errors.paymentMethod}</span>}
            </div>
            <div className='submit'>
              <div className="row"><button onClick={this.handleSubmit}>Reserve your spot!</button></div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
