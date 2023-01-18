import { useEffect, useState } from 'react'
import { AppHeader } from '../../cmps/app-header'
import { Sidebar } from './cmps/sidebar'
import { EditorPreview } from './cmps/editor-preview'
import { ToolsBar } from './cmps/tools-bar'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { getWap1Template } from '../../wap-templates/wap-template-1/wap-1-template'
import { getWap2Template } from '../../wap-templates/wap-template-2/wap-2-template'
import { wapService } from '../../services/wap.service'
import { useParams } from 'react-router-dom'

export function Editor() {
    const [isSidebarOpen, setSidebarOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [template, setTemplate] = useState(null)
    const { wapId } = useParams()
    console.log(template)
    useEffect(() => {
        loadWap()
    }, [])

    function loadEditedWap() {}

    function loadWap() {
        let template = wapService.getEditedWap()
        setTemplate(template)
    }

    function handleOnDragEnd(result) {
        if (result.source.droppableId !== 'editor-preview') {
            const newCmp = wapService.getCmpById(result.draggableId)
            template.cmps.splice(result.destination.index, 0, newCmp)
            setTemplate(prev => ({ ...prev, cmps: template.cmps }))
            wapService.save(template)
            return
        }
        const [reorderedItem] = template.cmps.splice(result.source.index, 1)
        template.cmps.splice(result.destination.index, 0, reorderedItem)
        setTemplate(prev => ({ ...prev, cmps: template.cmps }))
        wapService.save(template)
    }

    function handleOnDragStart() {
        // setSidebarOpen(false)
    }
    if (!template) return
    return (
        <>
            <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleOnDragStart}>
                <AppHeader />
                <ToolsBar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
                <EditorPreview templateOrder={template.cmps} />
                <Sidebar isEditing={isEditing} isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
            </DragDropContext>
        </>
    )
}
