import './charList.scss';

import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting': 
            return <Spinner></Spinner>;
        case 'loading':
            return newItemLoading ? <Component></Component> : <Spinner></Spinner>;
        case 'error':
            return <ErrorMessage></ErrorMessage>;
        case 'confirmed':
            return <Component></Component>;
        default:
            throw new Error();
    }
}

const CharList = (props) => {
    const [chars, setChars] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffest] = useState(210);
    const [charsEnded, setCharsEnded] = useState(false);

    const {loading, error, clearError, process, setProcess, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);

        getAllCharacters(offset)
            .then(onCharactersLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharacterListLoading = () => {
        setNewItemLoading(true);
    }

    const onCharactersLoaded = (newChars) => {
        let ended = false;

        if (newChars.length < 9) {
            ended = true;
        }

        setChars(chars => [...chars, ...newChars])
        clearError()
        setNewItemLoading(newItemLoading => false);
        setOffest(offset => offset + 9);
        setCharsEnded(charsEnded => ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems(chars) {
        const items = chars.map((item, i) => {
            let style = {'objectFit' : 'cover'};

            if (item.thumbnail.indexOf('image_not') > -1) {
                style = {objectFit: 'fill'};
            }
            
            return (
                <li 
                    className="char__item"
                    tabIndex={0}
                    key={item.id}
                    ref={el => itemRefs.current[i] = el}
                    onClick={
                        () => {
                            props.onCharacterSelected(item.id)
                            focusOnItem(i);
                        }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharacterSelected(item.id);
                            focusOnItem(i);
                        }
                    }}
                    >
                        <img src={item.thumbnail} alt={item.name} style={style}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    return (
        <div className="char__list">
            {
                setContent(process, () => renderItems(chars), newItemLoading)
            }
            <button
                disabled={newItemLoading}
                style={{'display': charsEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharacterSelected: PropTypes.func.isRequired
}

export default CharList;