import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';
import { useState } from "react";
import PropTypes from 'prop-types';

const App = () => {
    const [charId, setCharId] = useState(null)

    const onCharacterSelected = (id) => {
        setCharId(id);
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharacterSelected={onCharacterSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={charId}/>
                    </ErrorBoundary>
                    
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

CharInfo.propTypes = {
    onCharacterSelected: PropTypes.func,
}

export default App;