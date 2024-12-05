import { IconBrandPaypal } from '@tabler/icons-react';
import { BanIcon, CreditCard, IceCream } from 'lucide-react';

/* Map of payment provider_id to their title and icon. Add in any payment providers you want to use. */
export const paymentInfoMap = {
  stripe: {
    title: 'Credit card',
    icon: <CreditCard />,
  },
  'stripe-ideal': {
    title: 'iDeal',
    icon: <IceCream />,
  },
  'stripe-bancontact': {
    title: 'Bancontact',
    icon: <BanIcon />,
  },
  paypal: {
    title: 'PayPal',
    icon: <IconBrandPaypal />,
  },
  manual: {
    title: 'Test payment',
    icon: <CreditCard />,
  },
  // Add more payment providers here
};

// Add currencies that don't need to be divided by 100
export const noDivisionCurrencies = [
  'krw',
  'jpy',
  'vnd',
  'clp',
  'pyg',
  'xaf',
  'xof',
  'bif',
  'djf',
  'gnf',
  'kmf',
  'mga',
  'rwf',
  'xpf',
  'htg',
  'vuv',
  'xag',
  'xdr',
  'xau',
];
