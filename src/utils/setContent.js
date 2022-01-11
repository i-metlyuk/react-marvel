import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Skeleton from '../components/skeleton/Skeleton';

const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting': 
            return <Skeleton></Skeleton>;
        case 'loading':
            return <Spinner></Spinner>;
        case 'error':
            return <ErrorMessage></ErrorMessage>;
        case 'confirmed':
            return <Component data={data}></Component>;
        default:
            throw new Error();
    }
}

export default setContent;