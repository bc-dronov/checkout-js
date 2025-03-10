import {
    CheckoutSelectors,
    CheckoutService,
    createCheckoutService,
} from '@bigcommerce/checkout-sdk';
import { render, screen } from '@testing-library/react';
import { Formik } from 'formik';
import { noop } from 'lodash';
import React, { FunctionComponent } from 'react';

import { createLocaleContext } from '@bigcommerce/checkout/locale';
import {
    PaymentFormService,
    PaymentMethodProps,
} from '@bigcommerce/checkout/payment-integration-api';
import {
    getBraintreeAchPaymentMethod,
    getPaymentFormServiceMock,
    getStoreConfig,
} from '@bigcommerce/checkout/test-utils';

import BraintreeAchPaymentMethod from './BraintreeAchPaymentMethod';

describe('BraintreeAchPaymentForm', () => {
    let checkoutService: CheckoutService;
    let checkoutState: CheckoutSelectors;
    let defaultProps: PaymentMethodProps;
    let BraintreeAchPaymentMethodTest: FunctionComponent<PaymentMethodProps>;
    let paymentForm: PaymentFormService;

    beforeEach(() => {
        checkoutService = createCheckoutService();
        checkoutState = checkoutService.getState();
        paymentForm = getPaymentFormServiceMock();

        jest.spyOn(checkoutService, 'initializePayment').mockResolvedValue(checkoutState);

        jest.spyOn(checkoutService, 'deinitializePayment').mockResolvedValue(checkoutState);

        jest.spyOn(checkoutService, 'loadBillingAddressFields').mockResolvedValue(
            {} as CheckoutSelectors,
        );

        const { language } = createLocaleContext(getStoreConfig());

        defaultProps = {
            method: getBraintreeAchPaymentMethod(),
            checkoutService,
            checkoutState,
            paymentForm,
            language,
            onUnhandledError: jest.fn(),
        };

        BraintreeAchPaymentMethodTest = (props: PaymentMethodProps) => (
            <Formik initialValues={{}} onSubmit={noop}>
                <BraintreeAchPaymentMethod {...props} />
            </Formik>
        );
    });

    it('initializes payment method', async () => {
        render(<BraintreeAchPaymentMethodTest {...defaultProps} />);

        expect(screen.getByTestId('checkout-ach-form')).toBeInTheDocument();
        expect(checkoutService.loadBillingAddressFields).toHaveBeenCalled();

        await new Promise((resolve) => process.nextTick(resolve));

        expect(checkoutService.initializePayment).toHaveBeenCalledWith({
            braintreeach: {
                getMandateText: expect.any(Function),
            },
            gatewayId: undefined,
            methodId: 'braintreeach',
        });
    });

    it('catches an error during failed initialization of loadBillingAddressFields', async () => {
        jest.spyOn(checkoutService, 'initializePayment').mockRejectedValue(new Error('error'));
        render(<BraintreeAchPaymentMethodTest {...defaultProps} />);

        await new Promise((resolve) => process.nextTick(resolve));

        expect(defaultProps.onUnhandledError).toHaveBeenCalled();
    });

    it('catches an error during failed initialization of initializePayment', async () => {
        jest.spyOn(checkoutService, 'initializePayment').mockRejectedValue(new Error('error'));
        render(<BraintreeAchPaymentMethodTest {...defaultProps} />);

        await new Promise((resolve) => process.nextTick(resolve));

        expect(defaultProps.onUnhandledError).toHaveBeenCalled();
    });
});
