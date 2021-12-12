import { data } from './useWriteTextData';
import { useDispatch, useSelector } from 'react-redux';
import { checkPreviousNode, checkNextNode } from '../modules/PostLoopBtn';
import { RootReducerType } from '..';

function usePostLoopBtn(id: number) {
    const firstId = 1;
    const { posts } = data;
    const lastNodeId = posts.pop()?.id! as number;
    const { isPrevious, isNext } = useSelector((state: RootReducerType) => state.CheckPostLoopBtnReducer);
    const dispatch = useDispatch();
    if (id === firstId) {
        dispatch(checkPreviousNode());
    } else if (id === lastNodeId) {
        dispatch(checkNextNode());
    } else return;
    return { isPrevious, isNext };
}

export default usePostLoopBtn;
