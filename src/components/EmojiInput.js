import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import './EmojiInput.css';

function EmojiInput(props) {
    const [showPicker, setShowPicker] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
        props.onChange(props.inputValue + emojiObject.emoji);
        setShowPicker(false);
    };


    return (
        <div className="picker-container">
            <input
                className="input-style"
                placeholder='Add comment...'
                value={props.inputValue}
                onChange={e => props.onChange(e.target.value)} />
            <img
                className="emoji-icon"
                src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                onClick={() => setShowPicker(val => !val)} />
            {showPicker && <Picker
                pickerStyle={{ width: '100%' }}
                onEmojiClick={onEmojiClick} />}
        </div>
    );
}
export default EmojiInput;