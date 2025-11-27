
import React, { useState } from 'react';
import { Layers, Upload, ArrowRight, CheckCircle2 } from 'lucide-react';
import { WeaveType, CustomizationRequest } from '../types';
import { useLanguage } from '../services/i18n';
import { IMAGES, CONTACT_EMAIL } from '../constants';

export const Customizer: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<CustomizationRequest>({
    name: '',
    email: '',
    partType: '',
    weave: WeaveType.Twill,
    details: ''
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct email body
    const subject = `CarbonX Customization Request: ${formData.name}`;
    const body = `
New Customization Request

Name: ${formData.name}
Email: ${formData.email}
Part Type: ${formData.partType}
Weave Type: ${formData.weave}

Details:
${formData.details}
    `.trim();

    // Trigger mailto link
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Show success UI
    setTimeout(() => {
        setSubmitted(true);
    }, 500);
  };

  const getWeaveImage = (weave: WeaveType) => {
      switch(weave) {
          case WeaveType.Twill: return IMAGES.weaves.twill;
          case WeaveType.Forged: return IMAGES.weaves.forged;
          case WeaveType.Plain: return IMAGES.weaves.plain;
          default: return IMAGES.weaves.default;
      }
  }

  // Add scroll-mt-28 to account for the fixed header height
  if (submitted) {
    return (
      <div className="py-24 px-6 max-w-4xl mx-auto text-center scroll-mt-28" id="customize">
        <div className="bg-neutral-900/50 border border-green-500/30 rounded-3xl p-12 flex flex-col items-center animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">{t.customizer.submitted}</h2>
          <p className="text-neutral-400 max-w-lg mb-8">
            {t.customizer.submitted_desc}
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-white bg-neutral-800 hover:bg-neutral-700 px-8 py-3 rounded-full transition"
          >
            {t.customizer.new_request}
          </button>
        </div>
      </div>
    );
  }

  return (
    <section id="customize" className="py-24 px-6 relative overflow-hidden scroll-mt-28">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-neutral-900 to-transparent -z-10"></div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl font-bold text-white mb-6">
            {t.customizer.title} <span className="text-neon-400">{t.customizer.title_sub}</span>
          </h2>
          <p className="text-neutral-400 text-lg mb-12 leading-relaxed">
            {t.customizer.description}
          </p>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center shrink-0 border border-neutral-700">
                <Layers className="text-neon-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">{t.customizer.step_weave}</h4>
                <p className="text-sm text-neutral-500">{t.customizer.step_weave_desc}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center shrink-0 border border-neutral-700">
                <Upload className="text-neon-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">{t.customizer.step_upload}</h4>
                <p className="text-sm text-neutral-500">{t.customizer.step_upload_desc}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-3xl shadow-2xl relative">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{t.customizer.form.name}</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-neutral-950/50 border border-neutral-700 rounded-lg p-3 text-white focus:border-neon-400 focus:outline-none transition"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{t.customizer.form.email}</label>
                <input 
                  required
                  type="email" 
                  className="w-full bg-neutral-950/50 border border-neutral-700 rounded-lg p-3 text-white focus:border-neon-400 focus:outline-none transition"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{t.customizer.form.part_type}</label>
              <select 
                className="w-full bg-neutral-950/50 border border-neutral-700 rounded-lg p-3 text-white focus:border-neon-400 focus:outline-none transition"
                value={formData.partType}
                onChange={e => setFormData({...formData, partType: e.target.value})}
              >
                <option value="">...</option>
                <option value="automotive_exterior">{t.customizer.form.types.automotive_ext}</option>
                <option value="automotive_interior">{t.customizer.form.types.automotive_int}</option>
                <option value="drone">{t.customizer.form.types.drone}</option>
                <option value="military">{t.customizer.form.types.military}</option>
                <option value="consumer_electronics">{t.customizer.form.types.consumer}</option>
                <option value="other">{t.customizer.form.types.other}</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{t.customizer.form.weave_type}</label>
              <div className="grid grid-cols-2 gap-3">
                {Object.values(WeaveType).map((weave) => (
                  <button
                    key={weave}
                    type="button"
                    onClick={() => setFormData({...formData, weave: weave as WeaveType})}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all text-left relative overflow-hidden group ${
                      formData.weave === weave 
                      ? 'border-neon-400 bg-neon-400/10 text-white' 
                      : 'border-neutral-700 bg-neutral-800 text-neutral-400 hover:border-neutral-500'
                    }`}
                  >
                    <span className="relative z-10">{weave}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{t.customizer.form.details}</label>
              <textarea 
                className="w-full bg-neutral-950/50 border border-neutral-700 rounded-lg p-3 text-white h-28 focus:border-neon-400 focus:outline-none transition resize-none"
                placeholder={t.customizer.form.details_placeholder}
                value={formData.details}
                onChange={e => setFormData({...formData, details: e.target.value})}
              ></textarea>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-neon-500 to-cyan-600 hover:from-neon-400 hover:to-cyan-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/50 transition transform hover:scale-[1.02]">
              {t.customizer.form.submit}
              <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
