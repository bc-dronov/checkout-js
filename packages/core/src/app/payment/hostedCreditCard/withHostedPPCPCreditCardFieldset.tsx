import React, { ComponentType } from "react";
import {
    // WithCheckoutContextProps,
    WithHostedCreditCardFieldsetProps,
    WithInjectedHostedCreditCardFieldsetProps
} from "./withHostedCreditCardFieldset";
// import {WithLanguageProps} from "@bigcommerce/checkout/locale";
// import {WithFormProps} from "../../ui/form";
// import {ConnectFormikProps} from "../../common/form";
// import {PaymentFormValues} from "@bigcommerce/checkout/payment-integration-api";

export default function withHostedPPCPCreditCardFieldset<
    TProps extends WithHostedCreditCardFieldsetProps,
>(
    OriginalComponent: ComponentType<Omit<TProps, keyof WithInjectedHostedCreditCardFieldsetProps>>,
): ComponentType<Omit<TProps, keyof WithInjectedHostedCreditCardFieldsetProps>> {
    const Component: ComponentType<Omit<TProps, keyof WithInjectedHostedCreditCardFieldsetProps>> = ({
              // isCardCodeRequired,
              // isInstrumentCardCodeRequired: isInstrumentCardCodeRequiredProp,
              // isInstrumentCardNumberRequired: isInstrumentCardNumberRequiredProp,
              // isInstrumentFeatureAvailable: isInstrumentFeatureAvailableProp,
             ...rest
         }) => {
        console.log('HOC!');
        return (
            <OriginalComponent
                {...(rest as TProps)}
            />
        );
    }

    return Component;
}