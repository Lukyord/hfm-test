import { ReactNode, useState, useRef, useEffect } from "react";
import { onWindowResize } from "../../utils/utils";

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
        <div className={`accordion ${isOpen ? "active" : ""}`}>
            <button className="accordion-header" onClick={() => setIsOpen(!isOpen)} type="button">
                <span>{title}</span>
                <span className="entry-title">{isOpen ? "−" : "+"}</span>
            </button>
            <div className="entry-panel" ref={entryPanelRef}>
                <div className="entry-panel-inner">{children}</div>
            </div>
        </div>
    );
}
