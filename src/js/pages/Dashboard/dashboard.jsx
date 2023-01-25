import { useEffect, useRef, useState } from 'react'
import { AppHeader } from '../../cmps/app-header'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router'

import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'

import { BsPencil } from 'react-icons/bs'
import { IoAnalyticsOutline } from 'react-icons/io5'
import { GrAnalytics } from 'react-icons/gr'

import { DashboardMain } from './views/dashboard-main'
import { Forms } from './views/forms'

import { setCurrSite, setUser } from '../../store/user/user.actions'
import { MessagesDashboard } from './views/messages-dashboard'
import { SiteSelectDesktop } from './cmps/site-select-desktop'
import { useDispatch } from 'react-redux'
import { SET_CURR_SITE } from '../../store/user/user.reducer'
import DropdownMenuDemo from './cmps/site-actions-dropdown'
import { ScheduleDashboard } from './views/schedule-dashboard'

export function Dashboard() {
    const [currView, setCurrView] = useState('home')
    const user = useSelector(storeState => storeState.userModule.user)
    const currSite = useSelector(storeState => storeState.userModule.currSite)
    const navigate = useNavigate()
    const { userId } = useParams()
    const dispatch = useDispatch()

    const menuItems = ['Home', 'Messages', 'Forms', 'Schedule']

    useEffect(() => {
        if (!userId) navigate('/auth/login')
        loadUser()
    }, [])

    async function onSiteChange(siteId) {
        try {
            let currSite = user?.sites.find(site => site._id === siteId)

            await setCurrSite(currSite)
            showSuccessMsg(`Currently viewing site: ${currSite.title}`)
        } catch (err) {
            showErrorMsg('Failed selecting site')
        }
    }

    async function onEditSite(ev) {
        if (!currSite?._id) {
            showErrorMsg('Failed Editing site, try again later ')
            return
        }
        navigate(`/edit/${currSite._id}`)
    }

    function onChangeView(view) {
        if (view.toLowerCase() === currView) return
        setCurrView(view.toLowerCase())
    }

    async function loadUser() {
        if (!userId) return
        try {
            const user = await setUser(userId)
            if (!user.sites || !user.sites.length) navigate('/create')
            dispatch({ type: SET_CURR_SITE, currSite: user.sites[0] })
            showSuccessMsg(`Welcome back, ${user.fullname}`)
        } catch (err) {
            showErrorMsg(`Couldn't load user`)
        }
    }

    async function onChangeSite(siteId) {
        let currSite = user?.sites.find(site => site._id === siteId)
        await setCurrSite(currSite)
    }
    let sortedEvents
    if (currSite) {
        const subscribersTimestamps = currSite?.subscribers.reduce((acc, sub) => {
            acc.push(sub.date)
            return acc
        }, [])
        const leadTimestamps = currSite?.leads.reduce((acc, lead) => {
            acc.push(lead.data.date)
            return acc
        }, [])
        const msgsTimestamps = Object.keys(currSite?.msgs).reduce((acc, key) => {
            acc.push(currSite?.msgs[key].at(-1).date)
            return acc
        }, [])

        const allTimestamps = { subscribersTimestamps, leadTimestamps, msgsTimestamps }

        sortedEvents = Object.entries(allTimestamps)
            .flatMap(([key, values]) => values.map(timestamp => ({ key, timestamp })))
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, 5)
    }

    if (!user || !currSite) return <div>Loading...</div>
    return (
        <div className='dashboard full'>
            <AppHeader location={'dashboard'} onSiteChange={onSiteChange} />
            <aside className='dashboard-sidebar side-start'>
                <nav className='dashboard-nav'>
                    <ul className='menu-items'>
                        {menuItems.map(menuItem => (
                            <li
                                className={`menu-item ${currView === menuItem.toLocaleLowerCase() ? 'active' : ''}`}
                                onClick={() => onChangeView(menuItem)}
                                key={menuItem}
                            >
                                <span>{menuItem}</span>
                                <span>
                                    {/* {menuItem === 'Home' && <IoAnalyticsOutline size={'1.4rem'} />}
                                    {menuItem === 'Messages' && <GrAnalytics size={'1.4rem'} />}
                                    {menuItem === 'Forms' && <GrAnalytics size={'1.4rem'} />} */}
                                </span>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
            <main className='dashboard-main'>
                <div className='main-header layout-wrapper'>
                    <div className='titles'>
                        <h2>Hello, {user.fullname}</h2>
                        <h6>Welcome to your Dashboard</h6>
                    </div>
                    <div className='actions'>
                        <DropdownMenuDemo />
                        <button onClick={onEditSite} className='site-actions-edit flex align-center'>
                            <BsPencil /> <span>Edit Site</span>
                        </button>
                    </div>
                </div>
                <div className='layout-wrapper'>
                    <div className='col col-left'>
                        <SiteSelectDesktop
                            user={user}
                            currSite={currSite}
                            onChangeSite={onChangeSite}
                            sortedEvents={sortedEvents}
                        />
                    </div>
                    <div className='col col-right'>
                        {currView === 'home' && <DashboardMain user={user} currSite={currSite} />}
                        {currView === 'forms' && <Forms user={user} currSite={currSite} />}
                        {currView === 'messages' && <MessagesDashboard user={user} currSite={currSite} />}
                        {currView === 'schedule' && <ScheduleDashboard user={user} currSite={currSite} />}
                    </div>
                </div>
            </main>
        </div>
    )
}
