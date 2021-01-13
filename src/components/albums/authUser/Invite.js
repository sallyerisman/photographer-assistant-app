import { useState } from 'react';
import { Alert, Button } from 'react-bootstrap'
import CustomAlert from '../../../helpers/CustomAlert'

const Invite = ({ invite }) => {
    const [copySuccess, setCopySuccess] = useState('')
    const [copyError, setCopyError] = useState('')

    const handleCopyLink = async (link) => {
		// Try to copy the link text to clipboard
		try {
		  await navigator.clipboard.writeText(link)
		  setCopySuccess("Successfully copied!")
		} catch (err) {
		  setCopyError("Failed to copy.")
		}
	}

    return ( 
        <>
            {!copySuccess && !copyError &&  
                <Alert variant="info">
                    <div className="invite-link-wrapper">
                        {invite}
                        <Button className="btn button__primary button--small button__copy" onClick={() => handleCopyLink(invite)}>
                            Copy
                        </Button>
                    </div>
                </Alert>	
            }

            {copySuccess && <CustomAlert status="success" message={copySuccess}/>}
            {copyError && <CustomAlert status="danger" message={copyError}/>}
        </>			
    );
}
 
export default Invite;