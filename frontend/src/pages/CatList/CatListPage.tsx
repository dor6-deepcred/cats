import React, { useCallback, useEffect, useState } from 'react';
import { useCatsContext } from '../../store/cats.store';
import CatCard from '../../components/CatCard';
import useStyles from './CatListPage.styles';

const CatsList: React.FC = () => {
    const { state, actions } = useCatsContext();
    const [searchText, setSearchText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const classes = useStyles();
    const { cats } = state;

    // On mount fetch cat list
    useEffect(() => {
        actions.getCats();
    }, [])

    const onSearchText = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value;
        setSearchText(searchText)
        setIsLoading(true)
        try {
            await actions.getCats(searchText)
            setIsLoading(false)
        }
        catch (e) {
            console.error(e)
            setIsLoading(false)
            return
        }
    }, []);

    return (
        // COMMENT: fragment is useless
        <>
        <div className={classes.editorWrapper}>
            // COMMENT: generally we only use div and we dont usually use label
            <label className={classes.search}>
                <input
                    type="text"
                    className={classes.searchInput + ` ${isLoading ? classes.loading : ''}`}
                    value={searchText}
                    onChange={onSearchText} 
                    placeholder='Search by cat or mouse name'
                    />
            </label>
            <div className={classes.catsListWrapper}>
                {cats.map((cat) => <CatCard key={cat.id} cat={cat} />)}
            </div>
        </div>
        </>
    );
};

export default CatsList;