import React, { FC } from "react";

import debounce from "../../utils/debounce";

interface DebouncedInputProps {
    callback: (...args: any[]) => any;
    delay?: number;
    autoFocus?: boolean;
}

const DebouncedInput: FC<DebouncedInputProps & React.HTMLAttributes<HTMLInputElement>> =
    ({
        callback,
        delay,
        autoFocus,
        className,
        placeholder,
    }) => {
    const onChangeDebounce = debounce(callback, delay || 500);

    return (
        <input
            type="text"
            className={className}
            placeholder={placeholder}
            autoFocus={autoFocus}
            onChange={(e) => onChangeDebounce(e.target.value)}
        />
    );
};

export default DebouncedInput;
