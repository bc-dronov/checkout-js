import { createCheckoutService, LanguageService } from '@bigcommerce/checkout-sdk';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import React from 'react';

import { PaymentFormService } from '@bigcommerce/checkout/payment-integration-api';

import { getPayPalCommerceVenmoMethod } from './mocks/paymentMethods.mock';
import PayPalCommerceVenmoPaymentMethod from './PayPalCommerceVenmoPaymentMethod';

describe('PayPalCommerceVenmoPaymentMethod', () => {
    const checkoutService = createCheckoutService();
    const checkoutState = checkoutService.getState();
    const props = {
        method: getPayPalCommerceVenmoMethod(),
        checkoutService,
        checkoutState,
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        paymentForm: jest.fn() as unknown as PaymentFormService,
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        language: { translate: jest.fn() } as unknown as LanguageService,
        onUnhandledError: jest.fn(),
    };

    it('renders component with provided props', () => {
        const { container } = render(<PayPalCommerceVenmoPaymentMethod {...props} />);

        expect(container).toMatchSnapshot();
    });

    it('renders nothing if Payment Data is not Required', () => {
        const mockChild = <div>test child</div>;
        const localProps = {
            ...props,
            checkoutState: {
                ...checkoutState,
                data: {
                    ...checkoutState.data,
                    isPaymentDataRequired: jest.fn().mockReturnValue(false)
                }
            },
            children: mockChild
        }
        const { container } = render(<PayPalCommerceVenmoPaymentMethod {...localProps} />);

        expect(container).toBeEmptyDOMElement();
    });

    it('renders nothing if Store Credit is Applied', () => {
        const mockChild = <div>test child</div>;
        const localProps = {
            ...props,
            checkoutState: {
                ...checkoutState,
                data: {
                    ...checkoutState.data,
                    getCheckout: jest.fn().mockReturnValue({ isStoreCreditApplied: true })
                }
            },
            children: mockChild
        }
        const { container } = render(<PayPalCommerceVenmoPaymentMethod {...localProps} />);

        expect(container).toBeEmptyDOMElement();
    });
});
