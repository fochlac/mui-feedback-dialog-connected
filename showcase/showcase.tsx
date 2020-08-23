import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import { IconButton } from '@material-ui/core'

import FeedbackIcon from '@material-ui/icons/Feedback'
import { FeedbackDialog } from '../lib/FeedbackDialog'

function App () {
    const [dialogVisible, setDialogVisible] = useState(false)

    return (
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <h1>Feedback Dialog Showcase</h1>
            <h2>Click the Feedback Button below to open the dialog.</h2>
            <IconButton onClick={() => setDialogVisible(true)} size='medium'>
                <FeedbackIcon fontSize='large' />
            </IconButton>
            <FeedbackDialog
                open={dialogVisible}
                onClose={() => setDialogVisible(false)}
                onSubmit={console.log}
                tenantId='4' />
            <h1>
                Download the <a href='/keyfile-demo@demo.json' download>keyfile</a> and
                test it on <a href='https://feedback.fochlac.com/' rel="noreferrer" target="_blank">feedback.fochlac.com</a>.
            </h1>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
