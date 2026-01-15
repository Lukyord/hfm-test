import { ReactNode, useState, useRef, useEffect } from "react";
import { onWindowResize } from "../../utils/utils";
import ScrollAnimation from "./ScrollAnimation";

type AccordionProps = {
    title: string;
    children: ReactNode;
};

export default function Accordion({ title, children }: AccordionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const entryPanelRef = useRef<HTMLDivElement>(null);

    const measureHeight = () => {
        if (entryPanelRef.current) {
            entryPanelRef.current.style.height = "auto";
            entryPanelRef.current.style.setProperty("--accordion-height", `${entryPanelRef.current.scrollHeight}px`);
            entryPanelRef.current.style.height = "";
        }
    };

    useEffect(() => {
        measureHeight();
        const cleanup = onWindowResize(measureHeight);
        return cleanup;
    }, [children]);

    return (
        <ScrollAnimation animateIn="fadeIn" className={`accordion ${isOpen ? "active" : ""}`}>
            <button className="entry-title" onClick={() => setIsOpen(!isOpen)} type="button">
                <h3>{title}</h3>
            </button>
            <div className="entry-panel" ref={entryPanelRef}>
                <div className="entry-panel-inner">{children}</div>
            </div>
        </ScrollAnimation>
    );
}
