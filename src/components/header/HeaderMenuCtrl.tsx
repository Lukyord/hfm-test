type HeaderMenuCtrlProps = {
    isMenuOpen: boolean;
    setIsMenuOpen: (isOpen: boolean) => void;
    className?: string;
};

export default function HeaderMenuCtrl({
    isMenuOpen,
    setIsMenuOpen,
    className = "",
}: HeaderMenuCtrlProps) {
    return (
        <div className={`header-menu-ctrl ${className}`}>
            <button
                className="menu-ctrl"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <span className="hamburger">
                    <span className="bars">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </span>
                </span>
            </button>
        </div>
    );
}
