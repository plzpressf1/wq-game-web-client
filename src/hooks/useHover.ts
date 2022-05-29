import { useState, useEffect, useRef } from "react";

export default function useHover() {
    const [value, setVale] = useState(false);

    const ref = useRef<HTMLElement>(null);

    const onMouseOver = () => setVale(true);
    const onMouseOut = () => setVale(false);

    useEffect(() => {
        const node = ref.current;
        if (node) {
            node.addEventListener("mouseover", onMouseOver);
            node.addEventListener("mouseout", onMouseOut);

            return () => {
                node.removeEventListener("mouseover", onMouseOver);
                node.removeEventListener("mouseout", onMouseOut);
            };
        }
    }, []);

    return [ref, value];
}
