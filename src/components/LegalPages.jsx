import React, { useEffect } from 'react';
import { ShieldCheck, Wifi } from 'lucide-react';

const UPDATED_DATE = 'October 4, 2026';

const LEGAL_CONTENT = {
  terms: {
    title: 'Terms of Service',
    description: 'Terms governing use of the Home Tech Dealer Inc. website and internet availability comparison services.',
    sections: [
      {
        heading: 'Use of This Website',
        body: 'Home Tech Dealer Inc. provides an independent consumer comparison and availability-assistance service for internet, TV, wireless home internet, fiber, cable, satellite and related services. By using this website, submitting information, clicking to call, or speaking with our availability desk, you agree to use the site only for lawful personal or business-service comparison purposes.'
      },
      {
        heading: 'No Carrier Guarantee',
        body: 'Information shown on this site is for comparison and availability-assistance purposes only. Providers, plans, prices, speeds, promotions, installation options, equipment terms, contract terms, taxes, fees, rebates, reward cards and availability may change without notice and must be confirmed directly for the specific service address.'
      },
      {
        heading: 'No Purchase Commitment',
        body: 'Submitting an address or calling Home Tech Dealer Inc. does not require you to purchase service. Any order, subscription, installation, payment obligation, cancellation, contract term or service agreement is between you and the applicable provider or authorized sales channel.'
      },
      {
        heading: 'User Information',
        body: 'You agree that information you provide should be accurate and submitted only by you or with proper authorization. You should not submit sensitive information, payment information, government identification numbers, health information, or information you do not want used for service availability review.'
      },
      {
        heading: 'Limitation of Liability',
        body: 'To the fullest extent permitted by law, Home Tech Dealer Inc. is not responsible for carrier outages, installation delays, pricing changes, service denials, inaccurate third-party data, provider decisions, equipment issues, promotional changes, lost savings, indirect damages or consequential damages. Your sole remedy for dissatisfaction with the site is to stop using it.'
      }
    ]
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'How Home Tech Dealer Inc. collects, uses and shares information submitted through the website.',
    sections: [
      {
        heading: 'Information We Collect',
        body: 'We may collect information you choose to provide, such as street address, apartment or unit number, ZIP code, name, phone number, service preferences and information provided during calls or form submissions. We may also collect standard website data such as device type, browser, referring page, ad attribution parameters, general location signals, IP address, and interaction events.'
      },
      {
        heading: 'How We Use Information',
        body: 'We use information to compare service options, check internet availability, connect you with support, improve the website, measure advertising performance, prevent abuse, troubleshoot technical issues, and maintain business records. We do not ask for payment card numbers, Social Security numbers, health information or other highly sensitive information through this funnel.'
      },
      {
        heading: 'Advertising and Analytics',
        body: 'We use tools such as Google Ads and related measurement technologies to understand ad performance and website-call activity. Google forwarding numbers may be used for eligible ad visitors to measure qualifying calls. Address details entered into the PPC funnel are not intentionally sent to Google Ads event parameters.'
      },
      {
        heading: 'Sharing Information',
        body: 'We may share information with service providers, call-support partners, advertising and analytics providers, business operations vendors, and internet or telecom providers or authorized channels when needed to respond to your request. We may also disclose information if required by law, to protect rights and safety, or in connection with a business transaction.'
      },
      {
        heading: 'Your Choices',
        body: 'You may choose not to submit information, may call instead of using a form, and may request that we review, correct or delete information where required by applicable law. Some data may be retained as needed for legal, fraud-prevention, security, accounting or operational reasons.'
      },
      {
        heading: 'California and Other Privacy Rights',
        body: 'Depending on your state and whether legal thresholds apply, you may have rights to request access, deletion, correction, portability, or opt-out of certain sharing. We will honor applicable privacy requests as required by law.'
      }
    ]
  },
  disclaimers: {
    title: 'Disclaimers',
    description: 'Important disclosures about availability, pricing, trademarks and third-party providers.',
    sections: [
      {
        heading: 'Independent Marketplace',
        body: 'Home Tech Dealer Inc. is an independent consumer comparison marketplace and availability-assistance service. We are not every provider listed, and provider names, logos and trademarks belong to their respective owners.'
      },
      {
        heading: 'Availability, Pricing and Speeds',
        body: 'All plans, speeds, prices, promotional offers, equipment terms, installation options, taxes, fees, rebates, reward cards, coverage claims and availability are subject to carrier confirmation at the specific service address. Displayed information may be estimated, representative, promotional, location-dependent, or based on provider data that can change.'
      },
      {
        heading: 'No Professional Advice',
        body: 'The website does not provide legal, financial, technical engineering or telecommunications-regulatory advice. You are responsible for reviewing provider terms, service agreements, installation requirements, cancellation policies and final order details before purchasing service.'
      },
      {
        heading: 'Third-Party Services',
        body: 'Provider websites, call centers, technicians, equipment, billing systems, applications, service performance and customer support are controlled by third parties. Home Tech Dealer Inc. is not responsible for third-party acts, omissions, outages, delays, billing disputes or service quality.'
      },
      {
        heading: 'Trademarks',
        body: 'Verizon, T-Mobile, EarthLink, Starlink, AT&T, Spectrum, Xfinity, Comcast, Frontier, Cox, Optimum, Ziply, DIRECTV, Mediacom, Astound, Kinetic, Metronet, Breezeline, TDS, WOW!, Clearwave, Altafiber, Buckeye, Bend, Hawaiian Telcom, Consolidated, Fidium, SmithVille, ViaSat and other names are trademarks of their respective owners.'
      }
    ]
  }
};

export function LegalPage({ page = 'terms' }) {
  const content = LEGAL_CONTENT[page] || LEGAL_CONTENT.terms;

  useEffect(() => {
    document.title = `${content.title} | Home Tech Dealer Inc.`;
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'noindex, follow');
  }, [content.title]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <Wifi className="h-5 w-5" />
          </div>
          <div>
            <a href="/" className="text-lg font-black tracking-tight text-slate-900">
              Home Tech Dealer Inc.
            </a>
            <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Legal information
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-blue-700">
          <ShieldCheck className="h-4 w-4" />
          <span>Last updated {UPDATED_DATE}</span>
        </div>

        <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          {content.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-slate-600">
          {content.description}
        </p>

        <nav className="mt-8 flex flex-wrap gap-3 text-sm font-bold">
          <a href="/terms" className={`rounded-full px-4 py-2 ${page === 'terms' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>
            Terms
          </a>
          <a href="/privacy" className={`rounded-full px-4 py-2 ${page === 'privacy' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>
            Privacy
          </a>
          <a href="/disclaimers" className={`rounded-full px-4 py-2 ${page === 'disclaimers' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>
            Disclaimers
          </a>
        </nav>

        <div className="mt-8 space-y-5">
          {content.sections.map((section) => (
            <article key={section.heading} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-xl font-black tracking-tight text-slate-900">
                {section.heading}
              </h2>
              <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
