import React, {useState} from 'react';

const TextOutput = () => {

    const [value, setValue] = useState("Какой-то текст");

    return (
        <div>

            <h2>{value}</h2>
      
            <input
                type="text"
                value={value}
                onChange={event => setValue(event.target.value)}
            />
            
        </div>
    )
}

export default TextOutput;