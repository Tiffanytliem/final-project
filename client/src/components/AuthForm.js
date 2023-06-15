import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpOrIn } from '../lib/api';

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

  const alternateActionTo = action === 'sign-up'
    ? '/sign-in'
    : '/sign-up';
  const alternateActionText = action === 'sign-up'
    ? 'Sign in instead'
    : 'Register now';
  const submitButtonText = action === 'sign-up'
    ? 'Register'
    : 'Log In';
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Email:
          <input
            required
            autoFocus
            type="text"
            name="email" />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            required
            type="password"
            name="password" />
        </label>
      </div>
      <div>
        <small>
          <Link to={alternateActionTo}>
            {alternateActionText}
          </Link>
        </small>
        <button>
          {submitButtonText}
        </button>
      </div>
      {error && <div>Error: {error.message}</div>}
    </form>
  );
}
