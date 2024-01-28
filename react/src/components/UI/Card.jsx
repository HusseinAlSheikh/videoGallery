import classes from './Card.module.css';

const Card = props => {
    return (
        <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
            {props.children}
        </div>
    );
}

export default Card;