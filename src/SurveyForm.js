import React from 'react';
import { connect } from 'react-redux';
import { setExpState } from './app/stateSlice';

class SurveyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q1: '',
      q2: '',
      q3a: '',
      q3b: '',
      q4: '',
      q5: '',
      q6: '',
      q7: '',
      q8a: '',
      q8b: '',
      q9: '',
      q10: '',
      q11: '',
      q12: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    var value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log("Submitting results!");

    // Submit everything to Firestore, or push to redux and trigger a submission

    // Submit state
    this.props.setExpState('Thanks');
    
    // Reset
    this.setState({
      q1: '',
      q2: '',
      q3a: '',
      q3b: '',
      q4: '',
      q5: '',
      q6: '',
      q7: '',
      q8a: '',
      q8b: '',
      q9: '',
      q10: '',
      q11: '',
      q12: ''
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <table>
            <tr>
              <th>Questions</th>
              <th>Answers</th>
            </tr>
            <tr>
              <td>1)&ensp;*Which age group best defines you?</td>
              <td>
                <select name='q1' value={this.state.q1} onChange={this.handleChange} required>
                  <option value = ''></option>
                  <option value = '< 18'>&lt; 18</option>
                  <option value = '18 - 24' selected>18 - 24</option>
                  <option value = '25 - 30'>25 - 30</option>
                  <option value = '31 - 40'>31 - 40</option>
                  <option value = '41 - 50'>41 - 50</option>
                  <option value = '> 50'>&gt; 50</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>2)&ensp;*What is the highest degree of education you have completed or are completing?</td>
              <td>
                <select name='q2' value={this.state.q2} onChange={this.handleChange} required>
                  <option value = ''></option>
                  <option value = "No Formal Schooling">No Formal Schooling</option>
                  <option value = "High School">High School</option>
                  <option value = "Associate Degree">Associate Degree</option>
                  <option value = "Bachelor's Degree" selected>Bachelor's Degree</option>
                  <option value = "Master's Degree">Master's Degree</option>
                  <option value = "Doctoral Degree">Doctoral Degree</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>3a)&ensp;*Do you have a background in Computer Science or any related field?</td>
              <td>
                <select name='q3a' value={this.state.q3a} onChange={this.handleChange} required>
                  <option value = ''></option>
                  <option value = 'Yes'>Yes</option>
                  <option value = 'No' selected>No</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>3b)&ensp;If you answered "No" to question 3a, please describe your field.</td>
              <td>
                <input type='text' name='q3b' value={this.state.q3b} onChange={this.handleChange}/>
              </td>
            </tr>
            <tr>
              <td>4)&ensp;*Please rate your overall comfort in using computer applications on digital platforms.</td>
              <td>
                <select name='q4' value={this.state.q4} onChange={this.handleChange} required>
                  <option value = ''></option>
                  <option value = 'Very Discomfortable'>Very Discomfortable</option>
                  <option value = 'Discomfortable'>Discomfortable</option>
                  <option value = 'Somewhat Discomfortable'>Somewhat Discomfortable</option>
                  <option value = 'Neutral' selected>Neutral</option>
                  <option value = 'Somewhat Comfortable'>Somewhat Comfortable</option>
                  <option value = 'Comfortable'>Comfortable</option>
                  <option value = 'Very Comfortable'>Very Comfortable</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>5)&ensp;*Please select the approach that best aligns with how you prefer to learn unfamiliar user interfaces.</td>
              <td>
                <select name='q5' value={this.state.q5} onChange={this.handleChange} required>
                  <option value = ''></option>
                  <option value = 'Read Documentation' selected>Read Documentation</option>
                  <option value = 'Watch Tutorials'>Watch Tutorials</option>
                  <option value = 'Hands-On Experimentation'>Hands-On Experimentation</option>
                  <option value = 'Other'>Other</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>6)&ensp;*Please rate the ease-of-use of the presented user interface.</td>
              <td>
                <select name='q6' value={this.state.q6} onChange={this.handleChange} required>
                  <option value = ''></option>
                  <option value = 'Very Difficult'>Very Difficult</option>
                  <option value = 'Difficult'>Difficult</option>
                  <option value = 'Somewhat Difficult'>Somewhat Difficult</option>
                  <option value = 'Neutral' selected>Neutral</option>
                  <option value = 'Somewhat Easy'>Somewhat Easy</option>
                  <option value = 'Comfortable'>Easy</option>
                  <option value = 'Very Easy'>Very Easy</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>7)&ensp;*Please rate the learning difficulty of the presented user interface.</td>
              <td>
                <select name='q7' value={this.state.q7} onChange={this.handleChange} required>
                  <option value = ''></option>
                  <option value = 'Very Difficult'>Very Difficult</option>
                  <option value = 'Difficult'>Difficult</option>
                  <option value = 'Somewhat Difficult'>Somewhat Difficult</option>
                  <option value = 'Neutral' selected>Neutral</option>
                  <option value = 'Somewhat Easy'>Somewhat Easy</option>
                  <option value = 'Comfortable'>Easy</option>
                  <option value = 'Very Easy'>Very Easy</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>8a)&ensp;*Did you use prior knowledge of another user interface to help you use the presented user interface?</td>
              <td>
                <select name='q8a' value={this.state.q8a} onChange={this.handleChange} required>
                  <option value = ''></option>
                  <option value = 'Yes'>Yes</option>
                  <option value = 'No' selected>No</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>8b)&ensp;If you answered "Yes" to question 8a, please describe the similarities between the interface you used before and the interface in this study.</td>
              <td>
                <input type='text' name='q8b' value={this.state.q8b} onChange={this.handleChange}/>
              </td>
            </tr>
            <tr>
              <td>9)&ensp;*Please rate your confidence in successfully completing the task when using the presented user interface.</td>
              <td>
                <select name='q9' value={this.state.q9} onChange={this.handleChange} required>
                  <option value = ''></option>
                  <option value = 'Very Insecure'>Very Insecure</option>
                  <option value = 'Insecure'>Insecure</option>
                  <option value = 'Somewhat Insecure'>Somewhat Insecure</option>
                  <option value = 'Neutral' selected>Neutral</option>
                  <option value = 'Somewhat Confident'>Somewhat Confident</option>
                  <option value = 'Confident'>Confident</option>
                  <option value = 'Very Confident'>Very Confident</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>10)&ensp;*Please rate your confidence in your ability to successfully complete the task again using the presented user interface.</td>
              <td>
                <select name='q10' value={this.state.q10} onChange={this.handleChange} required>
                  <option value = ''></option>
                  <option value = 'Very Insecure'>Very Insecure</option>
                  <option value = 'Insecure'>Insecure</option>
                  <option value = 'Somewhat Insecure'>Somewhat Insecure</option>
                  <option value = 'Neutral' selected>Neutral</option>
                  <option value = 'Somewhat Confident'>Somewhat Confident</option>
                  <option value = 'Confident'>Confident</option>
                  <option value = 'Very Confident'>Very Confident</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>11)&ensp;*Did you complete this study on a mobile device?</td>
              <td>
                <select name='q11' value={this.state.q11} onChange={this.handleChange} required>
                  <option value = ''></option>
                  <option value = 'Yes'>Yes</option>
                  <option value = 'No' selected>No</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <i>Questions marked with an asterisk (*) are required</i>
              </td>
              <td>
                <input type='submit' value='Finish'/>
              </td>
            </tr>
          </table>
        </div>
      </form>
    )
  }
}

export default connect(null, { setExpState })(SurveyForm);