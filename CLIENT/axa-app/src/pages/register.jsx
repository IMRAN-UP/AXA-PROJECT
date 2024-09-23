import { useState } from 'react';
import { Step1, Step2, Step3, Step4 } from '../components/index';

const Register = ({ switchLogin , registerSuccess , registerError }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    birthday: '',
    gender: '',
    email: '',
    phone_number: '',
    password: '',
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const submitForm = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        registerError();
      }

      const result = await response.json();
      console.log('Form Submitted:', result);
      registerSuccess();
    } catch (error) {
      registerError();
    }
  };

  switch (step) {
    case 1:
      return <Step1 formData={formData} setFormData={setFormData} nextStep={nextStep} switchLogin={switchLogin} />;
    case 2:
      return <Step2 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} switchLogin={switchLogin} />;
    case 3:
      return <Step3 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} switchLogin={switchLogin} />;
    case 4:
      return <Step4 formData={formData} setFormData={setFormData} prevStep={prevStep} submitForm={submitForm} switchLogin={switchLogin} />;
    default:
      return <div>Invalid Step</div>;
  }
};

export default Register;
