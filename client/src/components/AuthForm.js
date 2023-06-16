import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpOrIn } from '../lib/api';
import '../styles.css';

export default function AuthForm({ action, onSignIn }) {
  const navigate = useNavigate();
  const [error, setError] = useState();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { email, password } = Object.fromEntries(formData.entries());
    try {
      const result = await signUpOrIn(action, email, password);
      if (action === 'sign-up') {
        navigate('/sign-in');
      } else if (result.user && result.token) {
        onSignIn(result);
      }
    } catch (err) {
      setError(err);
    }
  }

  const alternateActionTo = action === 'sign-up' ? '/sign-in' : '/sign-up';
  const alternateActionText =
    action === 'sign-up' ? 'Log in instead' : 'Create account';
  const submitButtonText = action === 'sign-up' ? 'Register' : 'Log In';
  return (
    <form className="signin-signup-Form" onSubmit={handleSubmit}>
      <div>
        <label>
          <input
            className="emailInput"
            required
            autoFocus
            type="text"
            name="email"
            placeholder="Email"
          />
        </label>
      </div>
      <div>
        <label>
          <input
            className="passwordInput"
            required
            type="password"
            name="password"
            placeholder="Password"
          />
        </label>
      </div>
      <div>
        <button className="auth-form-submit-button">{submitButtonText}</button>
        <small>
          <Link className="alternateAction" to={alternateActionTo}>
            {alternateActionText}
          </Link>
        </small>
      </div>
      {error && <div>Error: {error.message}</div>}
    </form>
  );
}
