import './styles/code-editor.scss';
import './userWorkers';
import { Button } from '@syren-dev-tech/confects/buttons';
import { getClassName } from '@syren-dev-tech/confects/helpers';
import { HTML_DivProps } from '@syren-dev-tech/confects/types';
import { ReactNode, useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';

const BORDER_SIZE = 2;

export type CodeEditorProps = {
    id: string
    heading?: ReactNode
} & HTML_DivProps;

export function CodeEditor(
    {
        id,
        className,
        heading,
        defaultValue,
        ...props
    }: CodeEditorProps
) {

    const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoRef = useRef(null as HTMLDivElement | null);

    useEffect(() => {
        if (monacoRef.current) {
            setEditor((editor) => {
                if (editor)
                    return editor;

                if (!monacoRef.current)
                    return null;

                return monaco.editor.create(monacoRef.current, {
                    value: defaultValue?.toString()
                });
            });
        }

        return () => editor?.dispose();
    }, [monacoRef.current]);

    useEffect(() => {
        const resize = () => {
            if (!editor || !monacoRef.current)
                return;

            const rect = monacoRef.current.getBoundingClientRect();

            editor.layout({
                width: rect.width - BORDER_SIZE * 2,
                height: rect.height - BORDER_SIZE * 2
            });
        };

        window.requestAnimationFrame(() => resize());

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, [editor]);

    return <div
        id={id}
        className={getClassName('input code-editor', className)}
    >
        <div
            className='header'
        >
            {
                heading &&
                <div
                    className='heading'
                >
                    {heading}
                </div>
            }

            <Button
                className='f-trinary'
                onClick={() => {
                    const content = editor?.getModel()?.getValue();
                    if (!content)
                        return;

                    const file = new File([content], (heading || 'download.md').toString());
                    const url = window.URL.createObjectURL(file);
                    const a = document.createElement('a');

                    a.href = url;
                    a.download = file.name;

                    document.body.append(a);
                    a.click();
                    a.remove();
                }}
            >
                Download
            </Button>
        </div>

        <div
            className='editor-wrapper'
            ref={monacoRef}
            {...props}
        />
    </div>;
}