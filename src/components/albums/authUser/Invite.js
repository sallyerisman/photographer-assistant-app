import { useState } from 'react';
import { Alert, Button } from 'react-bootstrap'

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
                <Alert variant="info">
                    <div className="invite-link-wrapper">
                        {invite}
                        <Button className="btn button__secondary button--small" onClick={() => handleCopyLink(invite)}>
                            Copy
                        </Button>
                    </div>
                </Alert>	
                : <Alert variant="info">											
                    <div className="invite-link-wrapper">
                        {copySuccess}											
                    </div>
                </Alert>	
            }
        </>			
    );
}
 
export default Invite;