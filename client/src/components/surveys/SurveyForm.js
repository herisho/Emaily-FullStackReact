import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import _ from "lodash";
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import FIELDS from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({name, label}) => {
      return <Field component={SurveyField} type="text" label={label} name={name} key={name} />
    });
  }
 
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {}

  errors.recipients = validateEmails(values.recipients || '' );

  _.each(FIELDS, ({ name, noValueError }) =>  {
    if(!values[name]) {
      errors[name] = noValueError
    }
  })

  return errors;
}

export default reduxForm({
  form: "surveyForm",
  validate: validate,
  destroyOnUnmount: false
})(SurveyForm);
