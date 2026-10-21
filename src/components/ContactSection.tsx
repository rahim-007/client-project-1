import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Phone, EnvelopeSimple, MapPin, ArrowUpRight, CheckCircle, WarningCircle } from '@phosphor-icons/react';

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  approximateBudget: string;
  projectDescription: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  location?: string;
}

interface ContactSectionProps {
  initialService?: string;
}

export function ContactSection({ initialService }: ContactSectionProps) {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    projectType: initialService || 'Bespoke Residential Interior',
    location: 'Chennai',
    approximateBudget: '',
    projectDescription: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Please provide your full name.';
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = 'Full name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Please provide your phone number.';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number (minimum 8 digits).';
    }

    if (!formData.location.trim()) {
      errs.location = 'Please state your project location.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Prepare mailto fallback draft
    const subject = encodeURIComponent(
      `S.M.S DECORS Project Inquiry: ${formData.projectType} — ${formData.fullName}`
    );
    const body = encodeURIComponent(
      `Dear S.M.S DECORS Atelier Team,\n\n` +
        `I would like to commission an architectural consultation for our space.\n\n` +
        `Full Name: ${formData.fullName}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone}\n` +
        `Project Type: ${formData.projectType}\n` +
        `Location: ${formData.location}\n` +
        `Approximate Budget: ${formData.approximateBudget || 'Not specified'}\n\n` +
        `Project Description:\n${formData.projectDescription || 'No additional notes provided.'}\n\n` +
        `Sincerely,\n${formData.fullName}`
    );

    const mailtoLink = `mailto:smsdecorskumaran@gmail.com?subject=${subject}&body=${body}`;

    // Execute submission state with mailto dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.location.href = mailtoLink;
    }, 700);
  };

  return (
    <section
      id="contact"
      data-sc-act="contact"
      className="py-28 sm:py-36 md:py-44 bg-[#171715] text-[#FAF8F4] relative overflow-hidden"
      aria-label="Contact Section"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#9C805B] block mb-3">
            LET&apos;S BEGIN
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#FAF8F4] leading-[1.06]">
            Tell us what you&apos;re imagining<span className="text-[#9C805B]">.</span>
          </h2>
          <p className="mt-5 text-base sm:text-xl text-[#FAF8F4]/80 font-light leading-relaxed">
            Have a home, apartment, or space in mind? We&apos;d love to hear about it.
          </p>
        </div>

        {/* Dual Layout: Direct Studio Coordinates + Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Verified Atelier Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 border border-white/10 bg-white/[0.02] space-y-8">
              <span className="block text-xs font-mono uppercase tracking-[0.25em] text-[#9C805B]">
                DIRECT STUDIO DETAILS
              </span>

              {/* Telephone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#9C805B]/15 text-[#9C805B] flex items-center justify-center shrink-0 mt-1">
                  <Phone size={18} weight="bold" />
                </div>
                <div>
                  <span className="block text-xs font-mono text-[#B7AA97] uppercase tracking-wider">
                    TELEPHONE
                  </span>
                  <a
                    href="tel:+919841213025"
                    className="text-lg sm:text-xl font-serif text-[#FAF8F4] hover:text-[#9C805B] transition-colors"
                  >
                    +91 98412 13025
                  </a>
                  <span className="block text-xs text-[#FAF8F4]/60 font-light mt-0.5">
                    Direct studio consultation
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#9C805B]/15 text-[#9C805B] flex items-center justify-center shrink-0 mt-1">
                  <EnvelopeSimple size={18} weight="bold" />
                </div>
                <div>
                  <span className="block text-xs font-mono text-[#B7AA97] uppercase tracking-wider">
                    EMAIL
                  </span>
                  <a
                    href="mailto:smsdecorskumaran@gmail.com"
                    className="text-base sm:text-lg font-mono text-[#FAF8F4] hover:text-[#9C805B] transition-colors break-all"
                  >
                    smsdecorskumaran@gmail.com
                  </a>
                  <span className="block text-xs text-[#FAF8F4]/60 font-light mt-0.5">
                    Studio brief submissions
                  </span>
                </div>
              </div>

              {/* Atelier Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#9C805B]/15 text-[#9C805B] flex items-center justify-center shrink-0 mt-1">
                  <MapPin size={18} weight="bold" />
                </div>
                <div>
                  <span className="block text-xs font-mono text-[#B7AA97] uppercase tracking-wider">
                    ATELIER &amp; WORKSHOP
                  </span>
                  <p className="text-sm font-light text-[#FAF8F4]/85 mt-0.5 leading-relaxed">
                    No. 25, Seevaram 2nd Street, Perungudi, Chennai - 600 096, Tamil Nadu, India
                  </p>
                </div>
              </div>
            </div>

            {/* Quiet Architectural Assurance */}
            <div className="p-6 border border-white/5 text-xs text-[#FAF8F4]/60 font-light space-y-2">
              <span className="text-[#9C805B] font-mono uppercase tracking-widest block">
                PRIVACY &amp; PROCESS
              </span>
              <p>
                All project briefs and floor plans are treated with strict architectural discretion. We typically respond within one business day to arrange an introductory dialogue.
              </p>
            </div>
          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 border border-white/10 bg-white/[0.02]">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-6" role="status">
                  <div className="w-16 h-16 rounded-full bg-[#9C805B]/20 text-[#9C805B] flex items-center justify-center mx-auto">
                    <CheckCircle size={32} weight="fill" />
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#FAF8F4]">
                    Thank You, {formData.fullName}.
                  </h3>
                  <p className="text-base text-[#FAF8F4]/80 max-w-md mx-auto font-light leading-relaxed">
                    Your inquiry for <strong className="text-[#FAF8F4]">{formData.projectType}</strong> has been prepared. Your email client has been opened with the complete brief addressed to <span className="font-mono text-sm text-[#9C805B]">smsdecorskumaran@gmail.com</span>.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 rounded-full border border-white/20 text-xs font-mono uppercase tracking-widest text-[#FAF8F4] hover:bg-white/10 transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-mono uppercase tracking-widest text-[#B7AA97] mb-2">
                        Full Name <span className="text-[#9C805B]">*</span>
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Radhika Sundaram"
                        className={`w-full px-4 py-3 bg-white/[0.04] border text-[#FAF8F4] text-sm font-light focus:outline-none focus:border-[#9C805B] transition-colors placeholder:text-white/20 ${
                          errors.fullName ? 'border-red-400' : 'border-white/15'
                        }`}
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                      />
                      {errors.fullName && (
                        <p id="fullName-error" role="alert" className="mt-1 text-xs text-red-400 flex items-center gap-1">
                          <WarningCircle size={12} />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest text-[#B7AA97] mb-2">
                        Email Address <span className="text-[#9C805B]">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. radhika@example.com"
                        className={`w-full px-4 py-3 bg-white/[0.04] border text-[#FAF8F4] text-sm font-light focus:outline-none focus:border-[#9C805B] transition-colors placeholder:text-white/20 ${
                          errors.email ? 'border-red-400' : 'border-white/15'
                        }`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" role="alert" className="mt-1 text-xs text-red-400 flex items-center gap-1">
                          <WarningCircle size={12} />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Phone & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-widest text-[#B7AA97] mb-2">
                        Phone Number <span className="text-[#9C805B]">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98412 13025"
                        className={`w-full px-4 py-3 bg-white/[0.04] border text-[#FAF8F4] text-sm font-light focus:outline-none focus:border-[#9C805B] transition-colors placeholder:text-white/20 ${
                          errors.phone ? 'border-red-400' : 'border-white/15'
                        }`}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                      />
                      {errors.phone && (
                        <p id="phone-error" role="alert" className="mt-1 text-xs text-red-400 flex items-center gap-1">
                          <WarningCircle size={12} />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="location" className="block text-xs font-mono uppercase tracking-widest text-[#B7AA97] mb-2">
                        Project Location <span className="text-[#9C805B]">*</span>
                      </label>
                      <input
                        id="location"
                        name="location"
                        type="text"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Boat Club Road, Chennai"
                        className={`w-full px-4 py-3 bg-white/[0.04] border text-[#FAF8F4] text-sm font-light focus:outline-none focus:border-[#9C805B] transition-colors placeholder:text-white/20 ${
                          errors.location ? 'border-red-400' : 'border-white/15'
                        }`}
                        aria-invalid={!!errors.location}
                        aria-describedby={errors.location ? 'location-error' : undefined}
                      />
                      {errors.location && (
                        <p id="location-error" role="alert" className="mt-1 text-xs text-red-400 flex items-center gap-1">
                          <WarningCircle size={12} />
                          <span>{errors.location}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Project Type & Approximate Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="projectType" className="block text-xs font-mono uppercase tracking-widest text-[#B7AA97] mb-2">
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#171715] border border-white/15 text-[#FAF8F4] text-sm font-light focus:outline-none focus:border-[#9C805B] transition-colors"
                      >
                        <option value="Bespoke Residential Interior">Bespoke Residential Interior</option>
                        <option value="Contemporary Living Spaces">Contemporary Living Spaces</option>
                        <option value="Modern Kitchens & Dining">Modern Kitchens &amp; Dining</option>
                        <option value="Complete Spatial Renovation">Complete Spatial Renovation</option>
                        <option value="Architectural Millwork & Joinery">Architectural Millwork &amp; Joinery</option>
                        <option value="Commercial Atelier & Workspaces">Commercial Atelier &amp; Workspaces</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="approximateBudget" className="block text-xs font-mono uppercase tracking-widest text-[#B7AA97] mb-2">
                        Approximate Budget <span className="text-[#B7AA97]/60">(Optional)</span>
                      </label>
                      <input
                        id="approximateBudget"
                        name="approximateBudget"
                        type="text"
                        value={formData.approximateBudget}
                        onChange={handleChange}
                        placeholder="e.g. ₹25L – ₹50L or Custom"
                        className="w-full px-4 py-3 bg-white/[0.04] border border-white/15 text-[#FAF8F4] text-sm font-light focus:outline-none focus:border-[#9C805B] transition-colors placeholder:text-white/20"
                      />
                    </div>
                  </div>

                  {/* Row 4: Project Description */}
                  <div>
                    <label htmlFor="projectDescription" className="block text-xs font-mono uppercase tracking-widest text-[#B7AA97] mb-2">
                      Project Description
                    </label>
                    <textarea
                      id="projectDescription"
                      name="projectDescription"
                      rows={4}
                      value={formData.projectDescription}
                      onChange={handleChange}
                      placeholder="Tell us about the property, timeline, architectural preferences, or specific material aspirations..."
                      className="w-full px-4 py-3 bg-white/[0.04] border border-white/15 text-[#FAF8F4] text-sm font-light focus:outline-none focus:border-[#9C805B] transition-colors placeholder:text-white/20 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-[#FAF8F4] text-[#171715] text-xs font-medium uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 shadow-xl active:scale-[0.98] disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'PREPARING BRIEF...' : 'SEND INQUIRY'}</span>
                      <ArrowUpRight size={14} weight="bold" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
