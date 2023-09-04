'use client';

import type { FormEvent, MouseEventHandler } from 'react';

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { CloudArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline';

import Label from '~/core/ui/Label';
import If from '~/core/ui/If';
import IconButton from '~/core/ui/IconButton';

type Props = Omit<React.InputHTMLAttributes<unknown>, 'value'> & {
  image?: string | null;
  onClear?: () => void;
};

const IMAGE_SIZE = 22;

const ImageUploadInput = forwardRef<React.ElementRef<'input'>, Props>(
  function ImageUploadInputComponent(
    { children, image, onClear, onInput, ...props },
    forwardedRef
  ) {
    const localRef = useRef<HTMLInputElement>();

    const [state, setState] = useState({
      image,
      fileName: '',
    });

    const onInputChange = useCallback(
      (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        const files = e.currentTarget.files;

        if (files?.length) {
          const file = files[0];
          const data = URL.createObjectURL(file);

          setState({
            image: data,
            fileName: file.name,
          });
        }

        if (onInput) {
          onInput(e);
        }
      },
      [onInput]
    );

    const imageRemoved: MouseEventHandler = useCallback(
      (e) => {
        e.preventDefault();

        setState({
          image: '',
          fileName: '',
        });

        if (localRef.current) {
          localRef.current.value = '';
        }

        if (onClear) {
          onClear();
        }
      },
      [onClear]
    );

    const setRef = useCallback(
      (input: HTMLInputElement) => {
        localRef.current = input;

        if (typeof forwardedRef === 'function') {
          forwardedRef(localRef.current);
        }
      },
      [forwardedRef]
    );

    useEffect(() => {
      setState((state) => ({ ...state, image }));
    }, [image]);

    return (
      <label
        id={'image-upload-input'}
        tabIndex={0}
        className={`
        relative flex h-10 cursor-pointer rounded-md border border-dashed border-gray-200 bg-white py-2 px-3 outline-none ring-offset-1 transition-all hover:bg-gray-50 focus:ring-2
        focus:ring-primary-200 dark:border-dark-600 dark:bg-dark-800 dark:hover:border-dark-500 dark:focus:ring-primary-500/70 dark:focus:ring-offset-dark-800`}
      >
        <input
          {...props}
          ref={setRef}
          className={'hidden'}
          type={'file'}
          onInput={onInputChange}
          accept="image/*"
          aria-labelledby={'image-upload-input'}
        />

        <div className={'flex items-center space-x-4'}>
          <div className={'flex'}>
            <If condition={!state.image}>
              <CloudArrowUpIcon
                className={'h-5 text-gray-500 dark:text-dark-500'}
              />
            </If>

            <If condition={state.image}>
              <img
                loading={'lazy'}
                style={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                }}
                className={'object-contain'}
                width={IMAGE_SIZE}
                height={IMAGE_SIZE}
                src={state.image as string}
                alt={props.alt ?? ''}
              />
            </If>
          </div>

          <If condition={!state.image}>
            <div className={'flex flex-auto'}>
              <Label as={'span'} className={'cursor-pointer text-xs'}>
                {children}
              </Label>
            </div>
          </If>

          <If condition={state.image as string}>
            <div className={'flex flex-auto'}>
              <If
                condition={state.fileName}
                fallback={
                  <Label
                    as={'span'}
                    className={'cursor-pointer truncate text-xs'}
                  >
                    {children}
                  </Label>
                }
              >
                <Label as="span" className={'truncate text-xs'}>
                  {state.fileName}
                </Label>
              </If>
            </div>
          </If>

          <If condition={state.image}>
            <IconButton className={'!h-5 !w-5'} onClick={imageRemoved}>
              <XMarkIcon className="h-4" />
            </IconButton>
          </If>
        </div>
      </label>
    );
  }
);
export default ImageUploadInput;
