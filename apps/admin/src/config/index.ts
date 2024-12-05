type Config = {
  logo: string;
  title: string;
  description: string;
  system: {
    name: string;
    description: string;
  };
  turnstile: {
    siteKey: string;
    secretKey?: string;
  };
};

const Settings: Config = {
  logo: '/assets/buy.png',
  title: 'Buy & Sell',
  description: 'Buy & Sell',
  system: {
    name: 'oms',
    description: 'oms system',
  },
  turnstile: {
    siteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string,
  },
};

export default Settings;
