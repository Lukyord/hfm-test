import { Link } from "react-router-dom";

type HeaderCustomerProps = {
    className?: string;
};
export default function HeaderCustomer({
    className = "",
}: HeaderCustomerProps) {
    return (
        <div className={`header-customer ${className}`}>
            <Link to="#login" className="customer-login">
                <span>Login</span>
            </Link>
            <Link to="#register" className="customer-register">
                <span>Register</span>
            </Link>
        </div>
    );
}
