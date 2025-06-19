import { useState } from 'react'

export default function NewsletterSubscribe(){
    const [userEmail, setUserEmail] = useState('');
    const [validateEmailResult, setValidateEmailResult] = useState(false);
    const [showEmailValidationResult, setShowEmailValidationResult] = useState(false);

    const validateEmail = () => {
      const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      setValidateEmailResult(emailRegex.test(userEmail));
      setShowEmailValidationResult(true)
    };

    return (
        <section className="flex flex-col space-y-3 text-gray-600 text-center md:text-left">
          <h1 className="text-base font-bold text-gray-800 mb-1">Newsletter</h1>
          <div className="flex flex-col space-y-2">
            <input 
              type="email" 
              placeholder="Enter Your Email Address"
              className="w-full border border-gray-300 rounded py-2 px-3 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
              onChange={(e) => setUserEmail(e.target.value)}
              value={userEmail}
            />
            <button 
              onClick={validateEmail}
              className="cursor-pointer w-full md:w-auto bg-black text-white py-2 px-4 rounded text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              Subscribe
            </button>
          </div>

          {showEmailValidationResult && !validateEmailResult && (
            <p className="text-xs text-red-500 mt-1">Invalid email</p>
          )}
          {showEmailValidationResult && validateEmailResult && (
            <p className="text-xs text-blue-500 mt-1">Code verification sent to your email</p>
          )}
        </section>
    )
}