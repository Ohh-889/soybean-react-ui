'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { FC, MouseEvent } from 'react';

import { type ButtonIconProps } from '@/components/button';
import { ButtonIcon } from '@/components/button';

interface CopyButtonProps extends ButtonIconProps {
  content?: string;
  getContent?: (event: MouseEvent<HTMLButtonElement>) => string;
}

/* -------------------- CopyToClipboard -------------------- */
const CopyButton: FC<CopyButtonProps> = props => {
  const { content, getContent, ...rest } = props;

  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return () => {};
    const timer = setTimeout(() => setIsCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [isCopied]);

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    const copyContent = content || getContent?.(event) || '';

    try {
      await navigator.clipboard.writeText(copyContent);
      setIsCopied(true);
    } catch {
      console.error('Failed to copy!');
    }
  };

  return (
    <ButtonIcon
      title="copy code"
      onClick={handleClick}
      {...rest}
    >
      {isCopied ? <Check size={16} /> : <Copy size={16} />}
    </ButtonIcon>
  );
};

export default CopyButton;
