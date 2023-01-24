import explorerSVG from '../../../../assets/imgs/dashboard-assets/explorer.svg'
import { BsThreeDotsVertical } from 'react-icons/bs'

export function SiteSelectDesktop({ user, currSite }) {
    return (
        <>
            <div className='info-box info-box-2'>
                <div className='text-wrapper'>
                    <h3>Currently viewing</h3>
                    <div className='flex align-center'>
                        <img src={explorerSVG} alt='explorerSVG' /> <h4>{currSite?.title}</h4>
                    </div>
                </div>
            </div>
            <div className='info-box info-box-rows my-sites'>
                <div className='list-item-preview header'>
                    <h4>My sites</h4>
                </div>
                {user?.sites?.map(site => (
                    <article key={site._id} className='list-item-preview'>
                        <div className='item'>
                            <img src={explorerSVG} alt='explorerSVG' />
                            <span>{site.title}</span>
                            <div className='actions flex'>
                                <button className='tab'>
                                    <BsThreeDotsVertical />
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
            <div className='last-messages info-box info-box-rows my-sites'>
                <div className='list-item-preview header'>
                    <h4>Last Messages</h4>
                </div>
                {user?.sites?.map((site, idx) => (
                    <article key={site._id} className='list-item-preview'>
                        <div className='item'>
                            <img className='user-avatar' src={user.imgUrl} alt='explorerSVG' />
                            <span className='user-name'>
                                {(idx === 0 && 'Kuki') || (idx === 1 && 'Muki') || (idx === 2 && 'Puki')}
                            </span>
                            <div className='message-body'>
                                <p>
                                    Lorem ipsum, commodi dolor sit amet consectetur adipisicing elit. Facilis ratione.
                                </p>
                            </div>
                            <div className='time-ago flex'>2 days ago</div>
                        </div>
                    </article>
                ))}
            </div>
        </>
    )
}
