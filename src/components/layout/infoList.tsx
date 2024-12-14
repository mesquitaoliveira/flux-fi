import { useEffect } from 'react'
import {
    useAppKitState,
    useAppKitEvents,
    useAppKitAccount,
     } from '@reown/appkit/react'

export const InfoList = () => {
    const state = useAppKitState();
    const {address, isConnected, status} = useAppKitAccount();
    const events = useAppKitEvents()


    useEffect(() => {
        console.log("Events: ", events);
    }, [events]);

  return (
    <div >
        <section>
            <pre>
                Address: {address}<br />
                Connected: {isConnected.toString()}<br />
                Status: {status}<br />
            </pre>
        </section>
        <section>
            <h2>State</h2>
            <pre>
                activeChain: {state.activeChain}<br />
                loading: {state.loading.toString()}<br />
                open: {state.open.toString()}<br />
                selectedNetworkId: {state.selectedNetworkId?.toString()}<br />
            </pre>
        </section>
    </div>
  )
}