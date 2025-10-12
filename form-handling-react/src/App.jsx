import { useState } from 'react'
import './App.css'
import RegistrationForm from './components/RegistrationForm'
import FormikForm from './components/formikForm.jsx'

function App() {
  const [activeForm, setActiveForm] = useState('controlled')

  return (
    <div className="app-container">
      <h1>React Form Handling Demo</h1>
      
      <div className="form-toggle">
        <button 
          className={activeForm === 'controlled' ? 'active' : ''}
          onClick={() => setActiveForm('controlled')}
        >
          Controlled Components
        </button>
        <button 
          className={activeForm === 'formik' ? 'active' : ''}
          onClick={() => setActiveForm('formik')}
        >
          Formik Form
        </button>
      </div>

      <div className="forms-wrapper">
        {activeForm === 'controlled' ? <RegistrationForm /> : <FormikForm />}
      </div>
    </div>
  )
}

export default App
