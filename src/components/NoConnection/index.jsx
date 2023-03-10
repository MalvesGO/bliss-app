import { useContext } from 'react'
import Lottie from 'react-lottie-player'
import { MdSignalWifiConnectedNoInternet1 } from 'react-icons/md'
import internet from '../../assets/data.json'
import { ConnectionContext } from '../../contexts/ConnectionContext'

const NoConnection = () => {

    const { handleRetry } = useContext(ConnectionContext);

    return (
        <div className="serverDown">
            <div className='offlineMessage'>
                <MdSignalWifiConnectedNoInternet1 size={32} />
                <h1>
                    Server offline
                </h1>
            </div>
            <Lottie
                loop
                animationData={internet}
                play
                style={{ width: '50%', height: '50%' }}
            />
            <button className='buttonRetry' onClick={handleRetry}>
                Retry
            </button>
        </div>
    )
}

export default NoConnection