import { HTML_DivProps } from '@syren-dev-tech/confects/types';
import { getClassName } from '@syren-dev-tech/confects/helpers';

function Show({ children, ...props }: HTML_DivProps) {
    return <div
        className='show'
        {...props}
    >
        {children}
    </div>;
}

export function Display({ heading, children, ...props }: HTML_DivProps & { heading: string }) {
    return <div
        className={getClassName('display', heading.toLowerCase())}
        {...props}
    >
        <h2>
            {heading}
        </h2>

        <Show>
            {children}
        </Show>
    </div>;
}