import {Component} from "react"
import {signUp} from "../../utilities/users-service"

class SignUpForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
    };

    handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value,
        error: ''
    });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = {...this.state};
            delete formData.error;
            delete formData.confirm;
            const user = await signUp(formData);
            this.props.setUser(user)
        } catch {
          // An error occurred 
          this.setState({ error: 'Sign Up Failed - Try Again' });
        }
      };

    render() {
    const disable = this.state.password !== this.state.confirm;
    return (
        <div>
        <div className="form-container">
            <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            <label>Email</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            <label>Confirm</label>
            <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            <button type="submit" disabled={disable}>SIGN UP</button>
            </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
        </div>
    );
    }
}

export default SignUpForm;