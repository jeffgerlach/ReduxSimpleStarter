import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formProps) {
    // Call action creator to sign up the user
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field className="form-control" name="email" component="input" />
          {email.touched && email.error && <div className="error">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field className="form-control" name="password" type="password" component="input" />
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <Field className="form-control" name="passwordConfirm" type="password" component="input" />
          {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
        </fieldset>
        {this.renderAlert}
        <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signup = reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
})(Signup);

export default Signup = connect(mapStateToProps, actions)(Signup);
