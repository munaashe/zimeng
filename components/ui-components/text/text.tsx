import React from 'react';

type TextProps<C extends React.ElementType = 'p'> = {
    children: React.ReactNode;
    as?: C;
    color?: 'grey' | 'black' | 'white';
    weight?: 'normal' | 'bold';
    size?: 'sm' | 'md' | 'lg';
    additional?: string;
    variant?: 'title1' | 'title2' | 'title3' | 'title4' | 'title5' | 'body1' | 'body2' | 'label1' | 'link';
} & React.ComponentPropsWithoutRef<C>;

const Text = <C extends React.ElementType = 'p'>({
    children,
    as,
    color = 'grey',
    weight = 'normal',
    size = 'md',
    additional,
    variant = 'body1',
    ...restProps
}: TextProps<C>) => {

    // Transform `as` prop into a component
    const Component = as || 'p';

    // Format text size
    const textSize = `text-${size}`;

    // Format text weight
    const textWeight = `font-${weight}`;

    // Setup color classes
    const textColor = {
        'grey': 'text-gray-600',
        'black': 'text-black',
        'white': 'text-white',
    }[color] || 'text-gray-600';

    // Setup variants
    let classes;
    switch (variant) {
        case 'title1':
            classes = 'text-5xl font-bold';
            break;
        case 'title2':
            classes = 'text-4xl font-bold';
            break;
        case 'title3':
            classes = 'text-3xl font-bold';
            break;
        case 'title4':
            classes = 'text-2xl font-bold';
            break;
        case 'title5':
            classes = 'text-[20px] font-bold'; // Custom 20px font size
            break;
        case 'body1':
            classes = 'text-lg';
            break;
        case 'body2':
            classes = 'text-sm';
            break;
        case 'label1':
            classes = 'text-md';
            break;
        case 'link':
            classes = 'text-xs';
            break;
        default:
            classes = `${textSize} ${textWeight}`;
            break;
    }

    return (
        <Component
            {...restProps}
            className={`${classes} ${textColor} ${additional || ''}`}
        >
            {children}
        </Component>
    );
}

export default Text;