import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Moon, Sun, Wind, Users, Book, Volume2, DollarSign, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    id: 'sleep',
    title: 'What is your sleep schedule?',
    icon: <Moon />,
    options: ['Early Bird (10 PM - 6 AM)', 'Night Owl (2 AM - 10 AM)', 'Flexible']
  },
  {
    id: 'clean',
    title: 'How do you rate your cleanliness?',
    icon: <Wind />,
    options: ['Very Neat', 'Average', 'Relaxed']
  },
  {
    id: 'study',
    title: 'Where do you prefer to study?',
    icon: <Book />,
    options: ['Quiet in Room', 'In the Library', 'With Music/Background Noise']
  },
  {
    id: 'social',
    title: 'How social are you in your living space?',
    icon: <Users />,
    options: ['Extroverted (Love guests)', 'Balanced', 'Private (Low guests)']
  },
  {
    id: 'noise',
    title: 'What is your noise tolerance?',
    icon: <Volume2 />,
    options: ['Very Low', 'Medium', 'I can sleep through anything']
  }
];

function CompatibilityForm() {
  const { updatePreferences } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const handleNext = (option) => {
    const newAnswers = { ...answers, [questions[step].id]: option };
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      updatePreferences(newAnswers);
      setIsFinished(true);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const progress = ((step + 1) / questions.length) * 100;

  if (isFinished) {
    return (
      <div className="compatibility-page animate-fade-in">
        <div className="form-container text-center">
          <div className="success-icon">
            <CheckCircle size={64} color="#10b981" />
          </div>
          <h2 className="title">Preferences Saved!</h2>
          <p className="subtitle">
            Your data is now being used to match you with compatible roommates. 
            This information is private and NOT visible to other students.
          </p>
          <div className="privacy-badge">
             <ShieldCheck size={20} color="#3b82f6" />
             <span>Privacy Protection Active</span>
          </div>
          <button onClick={() => navigate('/dashboard')} className="btn btn-primary" style={{ marginTop: '2rem' }}>
            Go to My Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="compatibility-page">
      <div className="form-container">
        <header className="form-header">
           <div className="privacy-note">
             <ShieldCheck size={18} />
             <span>Your answers are private. Only used for matching.</span>
           </div>
           <div className="progress-bar">
             <motion.div 
               className="progress-fill"
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
               transition={{ duration: 0.5 }}
             />
           </div>
           <p className="step-indicator">Step {step + 1} of {questions.length}</p>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="question-step"
          >
            <div className="question-icon">{questions[step].icon}</div>
            <h2 className="question-title">{questions[step].title}</h2>
            <div className="options-grid">
              {questions[step].options.map((option, idx) => (
                <button 
                  key={idx} 
                  className={`option-btn ${answers[questions[step].id] === option ? 'selected' : ''}`}
                  onClick={() => handleNext(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="form-footer">
          <button 
            className="btn-back" 
            onClick={handleBack} 
            disabled={step === 0}
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
        </div>
      </div>

      <style>{`
        .compatibility-page {
          min-height: calc(100vh - 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: linear-gradient(to bottom, #f5f3ff, #ffffff);
        }

        .form-container {
          background: white;
          max-width: 600px;
          width: 100%;
          padding: 3rem;
          border-radius: var(--border-radius-xl);
          box-shadow: var(--shadow-lg);
        }

        .form-header {
          margin-bottom: 3rem;
        }

        .privacy-note {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748b;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
          justify-content: center;
        }

        .progress-bar {
          height: 6px;
          background: #f1f5f9;
          border-radius: 9999px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .progress-fill {
           height: 100%;
           background: var(--student-gradient);
           border-radius: 9999px;
        }

        .step-indicator {
          text-align: right;
          font-size: 0.8rem;
          font-weight: 700;
          color: #94a3b8;
        }

        .question-step {
          text-align: center;
        }

        .question-icon {
          width: 64px;
          height: 64px;
          background: #f5f3ff;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
          color: var(--student-primary);
        }

        .question-title {
           font-size: 1.5rem;
           font-weight: 800;
           margin-bottom: 2rem;
           color: #1e293b;
        }

        .options-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .option-btn {
          padding: 1.25rem;
          border-radius: var(--border-radius-lg);
          border: 2px solid #f1f5f9;
          background: white;
          font-size: 1rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }

        .option-btn:hover {
          border-color: var(--student-primary);
          background: #f5f3ff;
        }

        .option-btn.selected {
           background: var(--student-primary);
           color: white;
           border-color: var(--student-primary);
        }

        .form-footer {
          margin-top: 3rem;
          display: flex;
          justify-content: flex-start;
        }

        .btn-back {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          color: #64748b;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-back:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .privacy-badge {
           display: inline-flex;
           align-items: center;
           gap: 0.5rem;
           padding: 0.5rem 1rem;
           background: #eff6ff;
           color: #1d4ed8;
           border-radius: 9999px;
           font-size: 0.85rem;
           font-weight: 700;
           margin-top: 1rem;
        }

        .subtitle {
          color: #64748b;
          margin-top: 1rem;
          line-height: 1.6;
        }

        .success-icon {
          margin-bottom: 1.5rem;
        }

        @media (max-width: 640px) {
          .form-container {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default CompatibilityForm;
