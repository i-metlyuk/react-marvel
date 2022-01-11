import './charInfo.scss';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import CharSearchForm from '../charSearchForm/CharSearchForm';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = useMarvelService();

    useEffect(() => {
        updateCharacter();
    }, [props.charId])

    const updateCharacter = () => {
        const {charId} = props;

        if (!charId) {
            return;
        }

        onCharLoading();

        marvelService
            .getCharacter(charId)
            .then(onCharacterdLoaded)
            .catch(onError);
    }

    const onCharacterdLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onCharLoading = () => {
        setLoading(true);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const skeleton = char || loading || error ? null : <Skeleton></Skeleton>;

    const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;
    const spinner = loading ? <Spinner></Spinner> : null;
    const content = !(loading || error || !char) ? <View char={char}></View> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, wiki, hompage, comics} = char;

    let style = null;

    if (thumbnail.indexOf('image_not') > -1) {
        style = {objectFit: 'contain'};
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={style}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={hompage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">
                Comics:
            </div>
            <ul className="char__comics-list">
                {
                    comics.length > 0 ? null : 'There is no comics :('
                }
                {
                    comics.map((item, i) => {
                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
                
            </ul>
        </>
    );
}

CharInfo.propTypes = {
    charId: PropTypes.number,
}

export default CharInfo;