// components/withGlobalState.js
import React from 'react';
import { useGlobalContext } from '@/context/GlobalContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import NoInternet from '@/components/NoInternet';

const withGlobalState = (WrappedComponent) => {
  return (props) => {
    const { loading, isOnline } = useGlobalContext();

    if (!isOnline) {
      return <NoInternet />;
    }

    if (loading) {
      return <LoadingSpinner />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withGlobalState;
