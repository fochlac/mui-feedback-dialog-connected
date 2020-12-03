import React from 'react'

import { FeedbackDialog as FeedbackDialogRaw } from 'mui-feedback-dialog'
import { getRequest, postRequest } from './utils/http'
import { encryptStrings } from './utils/encrypt'

interface Props {
    open?: boolean;
    useScreencapture?: boolean;
    noScreenshot?: boolean;
    onClose?: () => void;
    onSubmit?: (feedback: { screenshot?: string; description: string; email: string }) => unknown;
    tenantId: string;
    className?: string;
    text?: Record<string, string>;
}

export const FeedbackDialog: React.FunctionComponent<Props> = ({ onSubmit, tenantId, ...props }) => {
    const submitWithTenant = async ({ description, screenshot, email }) => {
        if (tenantId) {
            const key = await getRequest(`https://feedback.fochlac.com/api/tenants/${tenantId}/key`)

            const [encryptedDescription, encryptedSS, encryptedMail] = encryptStrings([description, screenshot, email], key)

            postRequest('https://feedback.fochlac.com/api/reports', {
                description: encryptedDescription,
                screenshot: encryptedSS,
                email: encryptedMail,
                tenantId
            })
            onSubmit && onSubmit({ description, screenshot, email })
        }
    }

    return <FeedbackDialogRaw {...props} onSubmit={submitWithTenant} />
}
