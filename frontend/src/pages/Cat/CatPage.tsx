import { AxiosResponse } from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from "react-router-dom";
import type { ICat } from '../../types/common.types';
import {getCat} from '../../api/cats.service';
import useStyles from './CatPage.styles';

// COMMENT: component name should be same as file name (if its the component exported from the folder so also folder name) this is also true for other pages
const CatsList: React.FC = () => {
    const classes = useStyles();
    const { id } = useParams<string>();
    const [cat, setCat] = useState<ICat | null>(null);

    useEffect(() => {
        if(!id) return;
        getCat(id).then((catRes: AxiosResponse<ICat>) => {
            setCat(catRes.data);
        })
    }, [])

    const mouseName = useMemo(() => cat?.mice?.[0]?.name?.toLowerCase(), [cat?.mice]);

    if (!cat) { return <div></div> }
    return (
        <div className={classes.catPageWrapper}>
            <div className={classes.catName}>{cat.firstName} {cat.lastName}</div>
            <div style={{ backgroundImage: `url(${cat.image})` }} className={classes.catImage} />
            <div className={classes.catDescription}>{cat.description}</div>
            {cat.mice.length ? <div className={classes.mouseWrapper}>
                <div className={classes.mouseName}>My mouse is {mouseName}</div>
                <div style={{ backgroundImage: `url(${cat?.mice?.[0]?.image})` }} className={classes.mouseImage} />
            </div> : null}
        </div>
    );
};

export default CatsList;