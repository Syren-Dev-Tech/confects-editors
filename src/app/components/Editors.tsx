import { CodeEditor, TextEditor } from 'lib/editors';
import { Display } from './helpers/formatters';
import { STYLES, themes } from '@syren-dev-tech/confetti/themes';

function CodeEditorDisplay() {
    return <Display heading='code-editor'>
        <CodeEditor
            id='example_editor'
            className='f-primary'
        />
    </Display>;
}

function TextAreaDisplay() {
    return <Display heading='text-editor'>
        {
            [
                '',
                'i',
                'c'
            ].map((mode) => {
                return <div
                    key={mode || 'n'}
                    className='col'
                >
                    {
                        Array.from(STYLES).map((n) => {
                            const theme = themes.getBasicStyling(n);

                            return <TextEditor
                                key={n}
                                className={theme}
                            />;
                        })
                    }
                </div>;
            })
        }
    </Display>;
}

export function Editors() {
    return <div>
        <CodeEditorDisplay />
        <TextAreaDisplay />
    </div>;
}