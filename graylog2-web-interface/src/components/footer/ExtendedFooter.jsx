// @flow strict
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import connect from 'stores/connect';
import StoreProvider from 'injection/StoreProvider';

const SystemStore = StoreProvider.getStore('System');

type Props = {
  system?: {
    version: string,
    hostname: string,
  },
};

const ExtendedFooter = ({ system }: Props) => {
  const [jvm, setJvm] = useState();

  useEffect(() => {
    let mounted = true;

    SystemStore.jvm().then((jvmInfo) => {
      if (mounted) {
        setJvm(jvmInfo);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  if (!(system && jvm)) {
    return (
      <>
      </>
    );
  }

  return (
    <>
      &nbsp;on {system.hostname} ({jvm.info})
    </>
  );
};

ExtendedFooter.propTypes = {
  system: PropTypes.shape({
    version: PropTypes.string,
    hostname: PropTypes.string,
  }),
};

ExtendedFooter.defaultProps = {
  system: undefined,
};

export default connect(ExtendedFooter, { system: SystemStore }, ({ system: { system } = {} }) => ({ system }));
