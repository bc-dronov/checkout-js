import React, { FunctionComponent } from 'react';

import {
    PaymentMethodProps,
    PaymentMethodResolveId,
    toResolvableComponent
} from '@bigcommerce/checkout/payment-integration-api';

import PayPalCommercePaymentMethodComponent from './components/PayPalCommercePaymentMethodComponent';

const PayPalCommerceVenmoPaymentMethod: FunctionComponent<PaymentMethodProps> = props => {
    const isStoreCreditApplied = props.checkoutState.data.getCheckout()?.isStoreCreditApplied;
    const isPaymentDataRequired = props.checkoutState.data.isPaymentDataRequired();

    if (!isPaymentDataRequired || isStoreCreditApplied) {
        return null;
    }

    return <PayPalCommercePaymentMethodComponent
        providerOptionsKey="paypalcommercevenmo"
        {...props}
    />;
};

export default toResolvableComponent<PaymentMethodProps, PaymentMethodResolveId>(
    PayPalCommerceVenmoPaymentMethod,
    [{ id: 'paypalcommercevenmo' }],
);
