import './charInfo.scss';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateCharacter();
    }, [props.charId])

    const updateCharacter = () => {
        const {charId} = props;

        if (!charId) {
            return;
        }

        clearError();

        getCharacter(charId)
            .then(onCharacterdLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharacterdLoaded = (char) => {
        setChar(char);
    }

    return (
        <div className="char__info">
            {
                setContent(process, View, char)
            }
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, wiki, hompage, comics} = data;

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