// Approved copy (docs/03-SECTIONS.md, design/copy-inventory.json). Edit wording here only with owner approval.

export const brand = {
  name: 'OVERBID CAPITAL',
  short: 'OVERBID',
  logoAlt: 'OVERBID CAPITAL',
} as const;

export const nav = {
  links: [
    { label: 'Sell a Business', href: '/sell' },
    { label: 'Acquire a Business', href: '/businesses' },
    { label: 'Our Approach', href: '/#approach' },
  ],
  cta: { label: 'Private Introduction', href: '/#introduction' },
} as const;

export const chapters = {
  home: { n: '01', label: 'The Entrance' },
  approach: { n: '02', label: 'The Advantage' },
  founders: { n: '03', label: 'For Founders' },
  buyers: { n: '04', label: 'For Buyers' },
  opportunities: { n: '05', label: 'Selected Opportunities' },
  trust: { n: '06', label: 'Behind the Curtain' },
  introduction: { n: '07', label: 'Your Next Move' },
} as const;

export const entrance = {
  eyebrow: 'M&A • ACQUISITIONS • CAPITAL',
  headline: { plain: ['You built', 'the empire.'], accent: ['Own your', 'next move.'] },
  description: 'A private marketplace for business owners and ambitious buyers.',
  primary: { label: 'List Your Business', href: '/sell' },
  secondary: { label: 'Explore Businesses', href: '/businesses' },
  strip: ['Confidential listings', 'Qualified introductions', 'Clear next steps'],
} as const;

export const advantage = {
  headline: 'An unfair level of preparation.',
  description: 'Better positioning. Relevant buyers. A clearer path to a deal.',
  rows: [
    { n: '01', title: 'Position the business', body: 'Present the story, financials, and opportunity clearly.' },
    { n: '02', title: 'Connect with intent', body: 'Match buyer criteria with the right opportunities.' },
    { n: '03', title: 'Move with clarity', body: 'Keep information, introductions, and next steps organized.' },
  ],
  cta: 'See our approach',
} as const;

// Content of the "See our approach" dialog. Describes the intended demo workflow only;
// actual service scope, roles and fees are owner launch inputs (docs/11).
export const approachProcess = {
  title: 'Our approach',
  intro:
    'OVERBID is being built as a marketplace and introduction workflow for business owners and acquisition buyers. This is the intended process; final scope, roles and fees will be published before launch.',
  steps: [
    {
      title: 'Position the business',
      scope: 'Sellers prepare a listing: overview, financial snapshot with stated currency and period, and the kind of buyer they want.',
      you: 'Seller provides accurate information and decides what is public.',
      next: 'Draft a listing in the seller wizard.',
    },
    {
      title: 'Connect with intent',
      scope: 'Buyers search by industry, asking price and location, save opportunities and ask for more detail.',
      you: 'Buyer describes their acquisition criteria honestly.',
      next: 'Browse sample opportunities or request an introduction.',
    },
    {
      title: 'Move with clarity',
      scope: 'Detailed information is shared only after the seller approves a specific request. Next steps are agreed in writing.',
      you: 'Both parties confirm roles before confidential material moves.',
      next: 'Request a private introduction.',
    },
  ],
  note: 'Demo build: no listings are published, no requests are sent and no documents are stored.',
} as const;

export const founders = {
  headline: { plain: 'You built it.', accent: 'Make your next move count.' },
  description: 'Bring your business to market with a clear story and control over what you share.',
  primary: { label: 'Start Your Listing', href: '/sell' },
  secondary: { label: 'Discuss your exit', href: '/?intent=seller#introduction' },
  note: 'Begin with a private introduction.',
  preview: {
    eyebrow: 'Your listing',
    status: 'Draft',
    label: 'Interface preview',
    heading: 'Your business. Presented properly.',
    panels: ['Business overview', 'Financial snapshot', 'Ideal buyer'],
    controlsTitle: 'Confidentiality controls',
    controls: ['Identity withheld', 'Approve access requests'],
  },
  steps: ['Create your profile', 'Prepare your listing', 'Review buyer interest'],
} as const;

export const buyers = {
  headline: { plain: 'Find the business', accent: 'worth your next move.' },
  description: 'Discover opportunities that fit your acquisition strategy.',
  cta: 'Explore Opportunities',
  pillars: ['Search with purpose', 'Request confidential details', 'Connect with sellers'],
} as const;

export const opportunities = {
  headline: { plain: 'Your next chapter.', accent: 'Now on the market.' },
  sampleNotice: 'Illustrative listings — sample data',
  searchLabel: 'Search businesses',
  searchPlaceholder: 'Search businesses, industries, or keywords',
  footer: { prompt: 'Have a business to sell?', cta: 'Create a listing', href: '/sell' },
} as const;

export const trust = {
  headline: { plain: 'Discretion outside.', accent: 'Clarity inside.' },
  description: 'Know who you are working with. Understand how the process works.',
  faqs: [
    {
      q: 'Who is behind OVERBID?',
      a: 'Team information will be published before launch.',
    },
    {
      q: 'How does information access work?',
      a: 'Public listings show summary information only. Detailed materials are intended to be shared only after a seller approves a specific buyer request. This demo stores no private documents.',
    },
    {
      q: 'What happens after an introduction?',
      a: 'The intended next step is a conversation to confirm fit, each party’s role and what information is needed. Roles and fees will be disclosed before launch. This demo does not send introduction requests.',
    },
  ],
  standardTitle: 'Our standard',
  standard: 'Clear roles. Transparent fees. Confidential information handled with care.',
  cta: { label: 'Meet OVERBID', href: '/about' },
} as const;

export const introduction = {
  headline: { plain: 'The next move', accent: 'is yours.' },
  description: 'Tell us what you are building toward.',
  rabbitLine: 'Follow the white rabbit',
  intents: [
    { value: 'seller', label: 'I want to sell' },
    { value: 'buyer', label: 'I want to buy' },
  ],
  fields: {
    name: 'Full name',
    email: 'Work email',
    website: 'Business website',
    message: 'What are you planning?',
  },
  submit: 'Request a Private Introduction',
  note: 'Share an overview. Keep sensitive documents for later.',
  demoResult: 'Demo only — your message has not been sent.',
} as const;

export const footer = {
  links: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Contact', href: '/#introduction' },
  ],
  services: ['Business sales', 'Acquisitions', 'Capital'],
  demoNotice: 'Demo build. Sample data only; no live services are connected.',
  replayIntro: 'Replay intro',
} as const;

export const splash = {
  kicker: 'OVERBID CAPITAL',
  headline: ['Follow the white rabbit.', 'Own what comes next.'],
  description: 'A private introduction to your next chapter.',
  enter: 'Enter OVERBID',
  skip: 'Skip intro',
} as const;
