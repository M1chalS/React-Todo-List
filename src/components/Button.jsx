import classNames from "classnames";
import { ImSpinner } from "react-icons/all";

const Button = ({ children, className, loading = false, ...rest }) => {

    const classes = classNames(
        'cursor-pointer',
        { 'hover:scale-110': !loading },
        className
    );

    return (
        <button className={ classes } {...rest}>
            { loading ? <ImSpinner className="animate-spin" /> : children }
        </button>
    );
};

export default Button;