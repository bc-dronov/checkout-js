// import { LanguageService } from '@bigcommerce/checkout-sdk';
import React, { FunctionComponent, useCallback } from 'react';

// import { useLocale } from '@bigcommerce/checkout/locale';
import { usePaymentFormContext } from '@bigcommerce/checkout/payment-integration-api';
import { DynamicFormField } from '@bigcommerce/checkout/ui';

import {
    // BraintreeSepaFieldType,
    braintreeSepaFormFields,
} from '../constants';

// const isBraintreeSepaFormFieldName = (fieldName: string): fieldName is BraintreeSepaFieldType => {
//     return Object.values(BraintreeSepaFieldType).includes(fieldName as BraintreeSepaFieldType);
// };

const getTranslatedLabelByFieldName = (fieldName: string) => {
    // const braintreeSepaFormLabelsMap = {
    //     firstName: language.translate('address.first_name_label'),
    //     lastName: language.translate('address.last_name_label'),
    //     accountNumber: language.translate('payment.account_number_label'),
    //     routingNumber: language.translate('payment.account_routing_label'),
    //     businessName: language.translate('payment.business_name_label'),
    //     ownershipType: language.translate('payment.ownership_type_label'),
    //     accountType: language.translate('payment.account_type_label'),
    // };
    // return isBraintreeSepaFormFieldName(fieldName)
    //     ? BraintreeSepaFieldType[fieldName]
    //     : fieldName;
    return fieldName;
};

const BraintreeSepaFormFields: FunctionComponent = () => {
    // const { language } = useLocale();
    const { paymentForm } = usePaymentFormContext();
    const { setFieldValue } = paymentForm;

    // const ownershipTypeValue = getFieldValue(BraintreeSepaFieldType.OwnershipType);
    const fieldValues = braintreeSepaFormFields;

    const handleChange = useCallback(
        (fieldId: string) => (value: string) => {
            setFieldValue(fieldId, value);
        },
        [setFieldValue],
    );

    return (
        <>
            {fieldValues.map((field) => (
                <DynamicFormField
                    extraClass={`dynamic-form-field--${field.id}`}
                    field={field}
                    key={field.id}
                    label={getTranslatedLabelByFieldName(field.name)}
                    onChange={handleChange(field.id)}
                />
            ))}
        </>
    );
};

export default BraintreeSepaFormFields;
