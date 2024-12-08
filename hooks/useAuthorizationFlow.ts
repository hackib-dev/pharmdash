import { useState, Dispatch, SetStateAction } from 'react';

type UseAuthorizationFlowResult = {
  isOtpPageVisible: boolean;
  isAuthorized: boolean;
  startAuthorization: () => void;
  confirmAuthorization: () => void;
  setIsAuthorized: Dispatch<SetStateAction<boolean>>;
};

export const useAuthorizationFlow = (): UseAuthorizationFlowResult => {
  const [isOtpPageVisible, setIsOtpPageVisible] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const startAuthorization = () => {
    setIsOtpPageVisible(true);
  };

  const confirmAuthorization = () => {
    // Perform the authorization logic (e.g., API call) and update the state
    // Once authorized, hide the OTP page and continue with the action
    setIsOtpPageVisible(false);
    setIsAuthorized(true);
  };

  return {
    isOtpPageVisible,
    isAuthorized,
    startAuthorization,
    confirmAuthorization,
    setIsAuthorized
  };
};
