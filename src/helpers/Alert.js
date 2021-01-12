import { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { X } from 'react-bootstrap-icons'

const AlertEl = ({status, message}) => {
	const [clicked, setClicked] = useState(false)

	const handleClick = () => {
		setClicked(true)
	}

    return (
		<>
			{clicked
				? ""
				: <Alert className="alert__upload" variant={status}>
					{message}
					<X className="icon button-icon icon__exit" onClick={handleClick}/>		
				</Alert>
			}
		</>
    );
};

export default AlertEl

