import { wapService } from '../../services/wap.service'
import { store } from '../store'
import { SET_CLICKED_CMP, SET_EL_CLICKED_NODE, SET_IS_EDITING, SET_SIDEBAR_CONTEXT, SET_WAP } from './wap.reducer'

export async function setClickedCmp(elem) {
    store.dispatch({ type: SET_CLICKED_CMP, elem })
}
export async function setElClickedNode(elNode) {
    store.dispatch({ type: SET_EL_CLICKED_NODE, elNode })
}
export async function saveWap(wap) {
    try {
        wapService.save(wap)
        store.dispatch({ type: SET_WAP, wap })
    } catch (err) {
        console.log('Cannot save wap in wap.action', err)
        throw err
    }
}

export async function saveCmp(newCmp) {
    try {
        const wap = store.getState().wapModule.wap
        await wapService.updateCmp(newCmp, wap)
        await wapService.save(wap)
        store.dispatch({ type: SET_WAP, wap })
    } catch (err) {
        console.log('Cannot save cmp in wap.action', err)
        throw err
    }
}

export async function setIsEditing(mode) {
    store.dispatch({ type: SET_IS_EDITING, mode })
}
