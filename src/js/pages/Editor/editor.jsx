import { useState } from 'react'
import { AppHeader } from '../../cmps/app-header'
import { AddSidebar } from './cmps/add-side-bar'
import { EditorPreview } from './cmps/editor-preview'
import { ToolsBar } from './cmps/tools-bar'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { getWap1Template } from '../../wap-templates/wap-template-1/wap-1-template'
import { getWap2Template } from '../../wap-templates/wap-template-2/wap-template-2'
import { wapService } from '../../services/wap.service'

export function Editor() {
    const [isAdding, setIsAdding] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const template = getWap1Template()
    const [templateOrder, setTemplateOrder] = useState(template)

    function handleOnDragEnd(result) {
        const items = Array.from(templateOrder)
        console.log(result.source.droppableId)
        if (result.source.droppableId !== 'editor-preview') {
            const newCmp = wapService.getCmpById(result.draggableId)
            console.log(newCmp)
            items.splice(result.destination.index, 0, newCmp)
            setTemplateOrder(items)
            return
        }
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        setTemplateOrder(items)
    }

    return (
        <>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <AppHeader />
                <ToolsBar isAdding={isAdding} setIsAdding={setIsAdding} />
                <EditorPreview templateOrder={templateOrder} />
                {isAdding && <AddSidebar />}
            </DragDropContext>
        </>
    )
}
