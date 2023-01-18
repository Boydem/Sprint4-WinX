import { useState } from 'react'
import { DynamicModule } from './dynamic-module'
import { AiOutlineClose } from 'react-icons/ai'

export function Sidebar({ setSidebarOpen, isSidebarOpen, context }) {
    console.log('context:', context)
    const [activeModule, setActiveModule] = useState('Quick add')
    const addModulesMenuItems = [
        ['Quick add', 'Assets'],
        [
            'Header',
            'Hero',
            'Section',
            'Card',
            'Footer',
            'Media',
            'Decorative',
            'Contact & Forms',
            'Embed & Social',
        ],
        ['Cards', 'Galleries', 'Members', 'Section'],
    ]

    return (
        <section className={`${isSidebarOpen ? 'open' : 'closed'} side-bar`}>
            <div className='modules'>
                {addModulesMenuItems.map((moduleGroup, idx) => (
                    <ul key={idx} className='modules-list'>
                        {moduleGroup.map((module, idx) => (
                            <li
                                className={activeModule === module ? 'active' : ''}
                                onClick={() => setActiveModule(module)}
                                key={idx}
                            >
                                {module}
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
            <div className='module-content'>
                <div className='module-header'>
                    <span className='module-name'>{activeModule}</span>
                    <div className='actions'>
                        <span
                            onClick={() => {
                                setSidebarOpen(prev => !prev)
                            }}
                            className='btn'
                        >
                            <AiOutlineClose />
                        </span>
                    </div>
                </div>
                <div className='module-options'>
                    <DynamicModule activeModule={activeModule} modulesMenuItems={modulesMenuItems}/>
                </div>
            </div>
        </section>
    )
}
