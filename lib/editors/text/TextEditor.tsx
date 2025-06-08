import './styles/text-editor.scss';
import { Button } from '@syren-dev-tech/confects/buttons';
import { getClassName } from '@syren-dev-tech/confects/helpers';
import { HTML_TextAreaProps } from '@syren-dev-tech/confects/types';
import { Icon } from '@syren-dev-tech/confects/decorations';
import { useEffect, useRef, useState } from 'react';

export type TextEditorProps = HTML_TextAreaProps;

export function TextEditor(
    {
        className,
        ...props
    }: TextEditorProps
) {

    const [status, setStatus] = useState('');
    const [anim, setAnim] = useState(null as NodeJS.Timeout | null);

    const ref = useRef(null as HTMLTextAreaElement | null);
    const statusRef = useRef(null as HTMLDivElement | null);

    useEffect(() => {
        if (status) {
            if (anim)
                clearTimeout(anim);
            if (statusRef.current)
                statusRef.current.classList.remove('fading');

            const a = setTimeout(() => {
                if (!statusRef.current)
                    return;

                statusRef.current.classList.add('fading');

                const a = setTimeout(() => {
                    setStatus('');
                }, 1000);

                setAnim(a);
            }, 500);

            setAnim(a);
        }
    }, [status]);

    return <div
        className={getClassName('input text-editor', className)}
    >
        <div
            className='editor'
        >
            <textarea
                className='f-main'
                ref={ref}
                placeholder='Begin typing...'
                {...props}
            />

            {
                status &&
                <div
                    className='status-overlay'
                    ref={statusRef}
                >
                    {status}
                </div>
            }
        </div>

        <div
            className='editor-controls f-body b-divider'
        >
            <Button
                className='f-primary'
                onClick={() => {
                    if (!ref.current)
                        return;

                    navigator.clipboard.writeText(ref.current.value);

                    setStatus('copied');
                }}
            >
                <Icon
                    icon='copy'
                />

                <span>
                    Copy
                </span>
            </Button>

            <Button
                className='f-primary'
                onClick={() => {
                    if (!ref.current)
                        return;

                    ref.current.value = '';

                    setStatus('cleared');
                }}
            >
                <Icon
                    icon='x-lg'
                />

                <span>
                    Clear
                </span>
            </Button>
        </div>
    </div>;
}