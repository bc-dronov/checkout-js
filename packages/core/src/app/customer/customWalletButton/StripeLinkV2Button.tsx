import { CustomerInitializeOptions } from '@bigcommerce/checkout-sdk';
import { noop } from 'lodash';
import React, { FunctionComponent, useCallback } from 'react';

import { navigateToOrderConfirmation } from '@bigcommerce/checkout/utility';

import CheckoutButton, { CheckoutButtonProps } from '../CheckoutButton';

const StripeLinkV2Button: FunctionComponent<CheckoutButtonProps> = ({
  methodId,
  initialize,
  onError,
  onClick = noop,
  ...rest
}) => {
  const initializeOptions = useCallback(
    (options: CustomerInitializeOptions) =>
      initialize({
        ...options,
        [methodId]: {
          container: rest.containerId,
          onError,
          onClick: () => onClick(methodId),
          onComplete: navigateToOrderConfirmation,
        },
      }),
    [initialize, onError, rest.containerId],
  );

  return <CheckoutButton initialize={initializeOptions} methodId={methodId} {...rest} />;
};

export default StripeLinkV2Button;
