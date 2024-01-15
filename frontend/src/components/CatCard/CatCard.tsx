import React, { useMemo } from 'react';
import { Link } from "react-router-dom";
import type { ICat } from '../../types/common.types';
import useStyles from './CatCard.styles';

interface CatProps {
    cat: ICat;
}

const Cat: React.FC<CatProps> = ({ cat }) => {
    const classes = useStyles();
    // COMMENT: why is it lower cased?
    const mouseName: string = useMemo(() => cat?.mice?.[0]?.name?.toLowerCase(), [cat.mice]);
    const {firstName, lastName} = cat;
    return (
        <Link to={`/cat/${cat.id}`}>
            <div className={classes.catWrapper}>
                <div style={{ backgroundImage: `url(${cat.image})`}} className={classes.catImage} />
                <div className={classes.name}>{firstName} {lastName}</div>
                <div>{cat.description}</div>
                {/*COMMENT: i want to see all mice (atlist some)*/}
                <div>Mouse: {mouseName}</div>
            </div>
        </Link>
    );
};

export default Cat;