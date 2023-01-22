import { TextShadowSelectInput } from '../text-shadow-select'

export default function TextShadowSelect({ handleTextShadowChange, SelectItem }) {
    return (
        <div className='selector'>
            <p>Text Shadow </p>
            <TextShadowSelectInput handleTextShadowChange={handleTextShadowChange} SelectItem={SelectItem} />
        </div>
    )
}
