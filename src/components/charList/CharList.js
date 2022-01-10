import './charList.scss';

import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = (props) => {
    const [chars, setChars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffest] = useState(210);
    const [charsEnded, setCharsEnded] = useState(false);

    const marvelService = useMarvelService();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset) => {
        onCharacterListLoading();
        marvelService.getAllCharacters(offset)
            .then(onCharactersLoaded)
            .catch(onError);
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
        setLoading(loading => false);
        setNewItemLoading(newItemLoading => false);
        setOffest(offset => offset + 9);
        setCharsEnded(charsEnded => ended);
    }

    const onError = () => {
        setLoading(loading => false);
        setError(error => true);
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

    const items = renderItems(chars);

    const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;

    const spinner = loading ? <Spinner></Spinner> : null;

    const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
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