import React, { useState } from 'react';

const INITIAL_DATA = {
  firstName: '',
  lastName: '',
  email: '',
  whatsapp: '',
  faithDaily: 'active',
  conflictStyle: 'resolve_immediately',
  datingMotive: 'build_future',
  denomination: '',
  familyGoals: ''
};

export default function AssessmentForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const updateFields = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const calculateResult = () => {
    let score = 100;
    if (formData.datingMotive === 'escape_loneliness') score -= 30;
    if (formData.datingMotive === 'heal_past') score -= 20;
    if (formData.conflictStyle === 'avoid') score -= 15;

    let flag = 'clear_to_match';
    if (score < 50) {
      flag = 'preparation_track';
    } else if (score < 75 || formData.datingMotive === 'heal_past') {
      flag = 'recommend_session';
    }

    return { score, flag };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const evaluation = calculateResult();
    const payload = { ...formData, ...evaluation };

    try {
      const response = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setResult(evaluation);
        setStep(5);
      }
    } catch (error) {
      console.error('Failed to submit assessment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E2D24] flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-[#EBE5DF] p-6 md:p-10">
        {step <= 4 && (
          <div className="mb-8">
            <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-[#1E2D24]/60 mb-2">
              <span>Readiness Check-in</span>
              <span>Step {step} of 4</span>
            </div>
            <div className="w-full bg-[#EBE5DF] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#1E2D24] h-full transition-all duration-300 ease-out"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-serif text-[#1E2D24]">Let’s start with the basics</h2>
              <p className="text-sm text-[#1E2D24]/70">We use this to connect your results to your profile.</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1">First Name</label>
                  <input
                    required
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateFields({ firstName: e.target.value })}
                    className="w-full border border-[#EBE5DF] rounded-lg p-3 bg-[#FDFBF7] focus:outline-none focus:border-[#1E2D24]"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Last Name</label>
                  <input
                    required
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateFields({ lastName: e.target.value })}
                    className="w-full border border-[#EBE5DF] rounded-lg p-3 bg-[#FDFBF7] focus:outline-none focus:border-[#1E2D24]"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Email Address</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFields({ email: e.target.value })}
                  className="w-full border border-[#EBE5DF] rounded-lg p-3 bg-[#FDFBF7] focus:outline-none focus:border-[#1E2D24]"
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">WhatsApp Number (Optional)</label>
                <input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => updateFields({ whatsapp: e.target.value })}
                  className="w-full border border-[#EBE5DF] rounded-lg p-3 bg-[#FDFBF7] focus:outline-none focus:border-[#1E2D24]"
                  placeholder="+1 234 567 890"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-serif text-[#1E2D24]">Relational Style</h2>
              <p className="text-sm text-[#1E2D24]/70">How do you naturally navigate disagreement?</p>
              
              <div className="space-y-3">
                {[
                  { id: 'resolve_immediately', label: 'I prefer to talk things out right away until resolved.' },
                  { id: 'take_space', label: 'I need time to process privately before coming back to talk.' },
                  { id: 'avoid', label: 'I tend to let minor tensions pass to avoid unnecessary conflict.' }
                ].map((item) => (
                  <label 
                    key={item.id} 
                    className={`block p-4 rounded-xl border cursor-pointer transition ${
                      formData.conflictStyle === item.id 
                        ? 'border-[#1E2D24] bg-[#E8E1D9]/30 font-medium' 
                        : 'border-[#EBE5DF] bg-[#FDFBF7]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="conflictStyle"
                      className="hidden"
                      value={item.id}
                      checked={formData.conflictStyle === item.id}
                      onChange={(e) => updateFields({ conflictStyle: e.target.value })}
                    />
                    <span className="text-sm">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-serif text-[#1E2D24]">Current Focus</h2>
              <p className="text-sm text-[#1E2D24]/70">What brings you to search for a partner right now?</p>

              <div className="space-y-3">
                {[
                  { id: 'build_future', label: 'I am grounded and looking to build a intentional future with someone.' },
                  { id: 'heal_past', label: 'I am transitioning out of a past season and looking to move forward.' },
                  { id: 'escape_loneliness', label: 'I am feeling isolated and ready for genuine companionship.' }
                ].map((item) => (
                  <label 
                    key={item.id} 
                    className={`block p-4 rounded-xl border cursor-pointer transition ${
                      formData.datingMotive === item.id 
                        ? 'border-[#1E2D24] bg-[#E8E1D9]/30 font-medium' 
                        : 'border-[#EBE5DF] bg-[#FDFBF7]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="datingMotive"
                      className="hidden"
                      value={item.id}
                      checked={formData.datingMotive === item.id}
                      onChange={(e) => updateFields({ datingMotive: e.target.value })}
                    />
                    <span className="text-sm">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-serif text-[#1E2D24]">Values & Vision</h2>
              <p className="text-sm text-[#1E2D24]/70">Practical alignment helps set a clear foundation.</p>

              <div>
                <label className="block text-xs font-medium mb-1">Denomination / Church Tradition</label>
                <input
                  required
                  type="text"
                  value={formData.denomination}
                  onChange={(e) => updateFields({ denomination: e.target.value })}
                  className="w-full border border-[#EBE5DF] rounded-lg p-3 bg-[#FDFBF7] focus:outline-none focus:border-[#1E2D24]"
                  placeholder="e.g., Non-denominational, Anglican, Pentecostal"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">What are your non-negotiables for family and life direction?</label>
                <textarea
                  required
                  rows={3}
                  value={formData.familyGoals}
                  onChange={(e) => updateFields({ familyGoals: e.target.value })}
                  className="w-full border border-[#EBE5DF] rounded-lg p-3 bg-[#FDFBF7] focus:outline-none focus:border-[#1E2D24]"
                  placeholder="Briefly describe what you are looking to build..."
                />
              </div>
            </div>
          )}

          {step === 5 && result && (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-[#1E2D24] text-[#FDFBF7] rounded-full flex items-center justify-center mx-auto text-xl">
                ✓
              </div>
              <h2 className="text-2xl font-serif text-[#1E2D24]">Readiness Check Received</h2>
              
              {result.flag === 'clear_to_match' && (
                <p className="text-sm text-[#1E2D24]/80 leading-relaxed">
                  Thank you, {formData.firstName}. Your evaluation is complete, and you've been added to our primary pilot waitlist. We’ll reach out as soon as matching begins.
                </p>
              )}

              {result.flag === 'recommend_session' && (
                <p className="text-sm text-[#1E2D24]/80 leading-relaxed">
                  Thank you, {formData.firstName}. You’re on the waitlist! As part of our pilot, we may offer you a complimentary 1-on-1 check-in session prior to your first match.
                </p>
              )}

              {result.flag === 'preparation_track' && (
                <p className="text-sm text-[#1E2D24]/80 leading-relaxed">
                  Thank you, {formData.firstName}. We’ve received your response. We look forward to sharing our upcoming readiness resources and devotional guides with you shortly.
                </p>
              )}
            </div>
          )}

          {step <= 4 && (
            <div className="flex justify-between items-center mt-8 pt-4 border-t border-[#EBE5DF]">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-xs font-semibold uppercase tracking-wider text-[#1E2D24]/60 hover:text-[#1E2D24]"
                >
                  Back
                </button>
              ) : <div />}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#1E2D24] text-[#FDFBF7] px-6 py-3 rounded-xl text-sm font-medium hover:bg-[#1E2D24]/90 transition"
              >
                {step === 4 ? (isSubmitting ? 'Submitting...' : 'Complete Evaluation') : 'Next'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
