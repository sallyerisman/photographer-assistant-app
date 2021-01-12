import { useState } from 'react';
import { Alert, Button } from 'react-bootstrap'
import AlertEl from '../../../helpers/Alert'

const Invite = ({ invite }) => {
    const [copySuccess, setCopySuccess] = useState('')

    const handleCopyLink = async (link) => {
		// Try to copy the link text to clipboard
		try {
		  await navigator.clipboard.writeText(link)
		  setCopySuccess("Successfully copied!")
		} catch (err) {
		  setCopySuccess("Failed to copy.")
		}
	}

    return ( 
        <>
            {!copySuccess
                ?  
                <Alert>
                    <div className="invite-link-wrapper">
                        {invite}
                        <Button className="btn button__primary button--small" onClick={() => handleCopyLink(invite)}>
                            Copy
                        </Button>
                    </div>
                </Alert>	
                : <AlertEl status="danger" message={copySuccess}/>	
            }
        </>			
    );
}
 
export default Invite;