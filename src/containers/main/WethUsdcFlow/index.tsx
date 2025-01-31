import React, { useCallback, useState, ChangeEvent } from 'react';
import { Card } from 'components/layout/Card';
import { FlowForm } from 'components/main/FlowForm';
import { useDispatch } from 'react-redux';
import {
  wethUsdcStartFlow, wethUsdcStopFlow,
} from 'store/main/actionCreators';
import { useToasts } from 'hooks/useToast';
import styles from './styles.module.scss';

type Props = {
  balance?: string,
  totalFlows?: number,
  flowsOwned?: string,
  placeholder?: string,
  isLoading?: boolean,
};

export const WethUsdcFlow: React.FC<Props> = ({
  balance,
  flowsOwned,
  totalFlows,
  placeholder,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const { showErrorToast } = useToasts();
  const [wethUsdc, setWethUsdc] = useState('');
  const [error, setError] = useState('');

  const callback = useCallback((e?:string) => {
    setWethUsdc('');
    if (e) {
      showErrorToast(e, 'Error');
    }
  }, [setWethUsdc]);

  const handleStart = useCallback(() => {
    if (!wethUsdc || Number(wethUsdc) <= 0) {
      return setError('Enter positive value');
    }
    dispatch(wethUsdcStartFlow(wethUsdc, callback));
  }, [dispatch, wethUsdc, callback]);

  const handleStop = useCallback(() => {
    dispatch(wethUsdcStopFlow(callback));
  }, [dispatch, callback]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError('');
    }
    setWethUsdc(e.target.value);
  };

  return (
    <Card isLoading={isLoading} main title={<a href="https://polygonscan.com/address/0x3941e2E89f7047E0AC7B9CcE18fBe90927a32100" className={styles.link}>{'ETH >> USDC'}</a>}>
      <FlowForm
        onStart={handleStart}
        onStop={handleStop}
        balance={balance}
        flowsOwned={flowsOwned}
        totalFlows={totalFlows}
        token="WETHx"
        value={wethUsdc}
        onChange={handleChange}
        error={error}
        placeholder={placeholder}
      />
    </Card>
  );
};
