import { FC } from 'react';
import { CircleLoader } from 'react-spinners';
import { Wrapper } from './Loader.styled';

const Loader: FC = () => {
    return (
        <Wrapper>
            <CircleLoader size={45} color="#7ba38a" />
        </Wrapper>
    );
};

export default Loader;