import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { BiBell } from 'react-icons/bi'
import { SiteSelect } from './site-select'
import { InteractiveChat } from '../pages/Editor/cmps/ui-cmps/interactive-chat'
import { QuixLogo } from './quix-logo'
import { UserTooltip } from './user-tooltip'
import { SitesActionsDropdown } from '../pages/Editor/cmps/ui-cmps/sites-actions-dropdown'
import { PublishModal } from '../pages/Editor/cmps/ui-cmps/publish-modal'
import { GrUndo } from 'react-icons/gr'
import { GrRedo } from 'react-icons/gr'
import { TiBrush } from 'react-icons/ti'
import { redoChange, undoChange } from '../store/wap/wap.action'

export function AppHeader({ location = 'editor', theme = '', layout = 'full', onSiteChange }) {
    const [isMenuOpen, setIsMenuOpen] = useState()
    const [isPublishing, setIsPublishing] = useState(false)
    const { wapId } = useParams()
    const navigate = useNavigate()
    const wap = useSelector(storeState => storeState.wapModule.wap)
    const user = useSelector(storeState => storeState.userModule.user)

    function closeModal() {
        setIsPublishing(false)
    }

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }
    function onUndo() {
        undoChange()
    }

    function onRedo() {
        redoChange()
    }

    function onPreview() {
        if (wap.url) {
            navigate(`/${wap.url}`)
        } else {
            navigate(`/preview/${wap._id}`)
        }
    }
    return (
        <header
            data-location={location}
            className={`${theme} app-header full ${layout} ${location === 'auth' ? 'auth' : ''}`}
        >
            <div className='layout-wrapper'>
                <div className='logo-container'>
                    <Link to='/' className='logo'>
                        <QuixLogo />
                    </Link>
                </div>
                {location === 'dashboard' && (
                    <>
                        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
                            <ul className='flex align-center'></ul>
                        </nav>
                        <ul className='icons-group'>
                            <li className='icon-container'>
                                <InteractiveChat />
                            </li>
                            <li className='icon-container'>
                                <button
                                    data-tooltip='Notifications'
                                    data-tooltip-dir='bottom'
                                    className='btn-icon notifications'
                                >
                                    <BiBell />
                                </button>
                            </li>
                        </ul>
                    </>
                )}
                {location === 'index' && (
                    <div className='user-area'>
                        <UserTooltip wapId={wapId} />
                    </div>
                )}
                {location === 'editor' && (
                    <>
                        <div className='sites-actions'>
                            <div className='user-area'>
                                <UserTooltip user={user} />
                            </div>
                            <SitesActionsDropdown setIsPublishing={setIsPublishing} isPublishing={isPublishing} />
                        </div>
                        <nav className={`user-actions flex align-center justify-end ${isMenuOpen ? 'open' : ''}`}>
                            <ul className='flex align-center'>
                                <li>
                                    <Link className='nav-link' to='/edit'>
                                        <span>Invite</span>
                                    </Link>
                                </li>
                                <li>
                                    <button className='nav-link preview' onClick={onPreview}>
                                        <span>Preview</span>
                                    </button>
                                </li>
                                <li>
                                    <button className='nav-link publish' onClick={() => setIsPublishing(true)}>
                                        <span>Publish</span>
                                    </button>
                                    <PublishModal
                                        user={user}
                                        wap={wap}
                                        closeModal={closeModal}
                                        isPublishing={isPublishing}
                                    />
                                </li>
                            </ul>
                        </nav>
                        <ul className='icons-group mobile-only'>
                            <li className='icon-container b-l'>
                                <button
                                    className='btn-icon'
                                    data-tooltip='Undo'
                                    data-tooltip-dir='bottom'
                                    onClick={onUndo}
                                >
                                    <GrUndo />
                                </button>
                            </li>
                            <li className='icon-container b-r'>
                                <button
                                    className='btn-icon'
                                    data-tooltip='Redo'
                                    data-tooltip-dir='bottom'
                                    onClick={onRedo}
                                >
                                    <GrRedo />
                                </button>
                            </li>
                            <li className='icon-container b-r'>
                                <InteractiveChat />
                            </li>
                        </ul>
                    </>
                )}
            </div>
        </header>
    )
}
